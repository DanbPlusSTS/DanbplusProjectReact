import {useState, useEffect, useRef} from "react";
import {GET, PUT} from "../../utils/com";
import "bootstrap/dist/css/bootstrap.min.css";

function Admin() {
    const [userList, setUserList] = useState([]);
    const [menuList, setMenuList] = useState([]); // json -> { userNo, menuCd, useYN, modifyYN }
    const [groupList, setGroupList] = useState([])

    const [userNum, setUserNum] = useState(""); // userNo
    const [showList, setShowList] = useState(["show","","","","",""]);

    const userListRef = useRef([]);
    const menuListRef = useRef([]);
    const groupListRef = useRef([]);

    // 모든 사용자 목록 조회
    useEffect(() => {
        const getAllUserList = async () => {
            await GET(`/admin/loader`, (result) => {
                userListRef.current = result; // 즉시 갱신
                setUserList(userListRef.current); // 상태 업데이트
            });
        };
        getAllUserList();
    }, []);

    // 사용자 메뉴권한 리스트 조회
    const getUserMenuList = async (userNo) => {
        await GET(`/admin/perMenuList.act?userNo=${userNo}`, (result) => {
            menuListRef.current = result;
            setMenuList(menuListRef.current);
            setUserNum(userNo);
            formChangeList();
        });
    };

    function formChangeList() {
        const groupMenu = [];
        let menuCd = "";
        let mnuNm = "";

        menuListRef.current.forEach((menu) => {
            if (menu.mnuDepth === "1") {
                menuCd = menu.menuCd;
                mnuNm = menu.mnuNm;
            }

            if (menu.menuCd.startsWith(menuCd)) {
                if (!groupMenu[mnuNm]) {
                    groupMenu[mnuNm] = [];
                }
                groupMenu[mnuNm].push(menu);
            }

            groupListRef.current = groupMenu;

        });

    }
    // 메뉴 접기/펼치기
    const handleHeadButton = (index) => {
        setShowList(prevList => {
            const currentList = [...prevList];
            currentList[index] = currentList[index] === "show" ? "" : "show";
            return currentList;
        });
    };
    // 메뉴 권한 수정 (체크박스 클릭 시)
    const handleCheckbox = (menuCd) => {
        const updatedGroupList = { ...groupListRef.current };

        Object.keys(updatedGroupList).forEach((groupKey) => {
            updatedGroupList[groupKey] = updatedGroupList[groupKey].map((menu) => {
                // 메뉴 목록에서 해당 menuCd를 가진 항목의 useYN 값 반전
                if (menu.menuCd === menuCd) {
                    return { ...menu, useYN: menu.useYN === "Y" ? "N" : "Y" };
                }
                return menu;
            });
        });

        // 업데이트된 메뉴 리스트 상태로 설정
        groupListRef.current = updatedGroupList;
        setGroupList(groupListRef.current);
    };

    // 서버쪽 세션문제 때문에 수정 되지않음
    // 사용자 메뉴권한 수정 (노출여부)
    const userAuthModify = async () => {
        const filteredData = menuList.map(({ userNo, menuCd, useYN, modifyYN }) => ({
            userNo, menuCd, useYN, modifyYN
        }));

        await PUT(`/admin/perMenuModify.act`, filteredData, (result) => {
            console.log(result);
        })
    };

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">매뉴권한</h1>
            <ol className="breadcrumb mb-4">
                <li><a href="#">메뉴진입에 대한 권한을 부여할 수 있습니다.</a></li>
            </ol>

            <div className="d-inline-block mb-3">
                <form>
                    <div className="mb-3 row">
                        <label form="search_user" className="col-sm-4 col-form-label-lg">이름</label>
                        <div className="col-sm-8">
                            <select className="form-select-lg"
                                    onChange={e => getUserMenuList(e.target.value)} value={userNum}>
                                <option value="">사용자를 선택하세요</option>
                                {userListRef?.current?.map((user) => (
                                    <option key={user.userNo} value={user.userNo}>
                                        {user.userName} ({user.userNo})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <div className="accordion" id="accordionList">
                {Object.entries(groupListRef.current).map(([menuKey, menuArray], index) => (
                    <div className="accordion-item" key={`item_${index}`}>
                        <h2 className="accordion-header" id={`heading_${index}`}>
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse_${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse_${index}`}
                                onClick={() => {handleHeadButton(index)}}
                            >
                                {menuKey}
                            </button>
                        </h2>
                        <div
                            id={`collapse_${index}`}
                            className={`accordion-collapse collapse ${showList[index]}`}
                            aria-labelledby={`heading_${index}`}
                            data-bs-parent="#accordionList"
                        >
                            <div className="accordion-body">
                                {menuArray.map((menuItem, subIndex) => (
                                    <div key={menuItem.menuCd || subIndex} className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            data-user_no={menuItem.userNo}
                                            data-menu_cd={menuItem.menuCd}
                                            data-modify_yn={menuItem.modifyYN}
                                            checked={menuItem.useYN === "Y"}
                                            onChange={() => handleCheckbox(menuItem.menuCd)}
                                        />
                                        <label className="form-check-label ms-2">
                                            {menuItem.mnuNm} ({menuItem.menuCd})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={userAuthModify}>수정된 권한 저장</button>
        </div>
    );
}

export default Admin;