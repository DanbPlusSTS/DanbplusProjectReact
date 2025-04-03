import {useEffect, useState} from "react";
import {GET} from "../../utils/com";

function Admin() {
    const [userList, setUserList] = useState([]);
    const [userNum, setUserNum] = useState(""); // userNo
    const [menuList, setMenuList] = useState([]); // json -> { userNo, menuCd, useYN, modifyYN }

    // 모든 사용자 목록 조회

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/admin/loader")
            .then(res => res.json())
            .then(data => setUserList(data))
            .catch(err => console.error("사용자 목록 조회 실패", err))
    }, []);

    // 사용자 메뉴권한 리스트 조회
    const retrieveMenuList = async (userNo) => {
        setUserNum(userNo);
        await fetch("http://localhost:8080/api/v1/admin/perMenuList.act?userNo=" + userNo)
            .then(res => res.json())
            .then(data => setMenuList(data))
            .catch(err => console.error("사용자 메뉴권한 리스트 조회 실패", err))
    };

    // 메뉴 권한 수정 (체크박스 클릭 시)
    const handleCheckboxChange = (menuCd) => {
        // 메뉴 목록에서 해당 menuCd를 가진 항목의 useYN 값 반전
        const updatedMenuList = menuList.data.map(menu => {
            if (menu.menuCd === menuCd) {
                return { ...menu, useYN: menu.useYN === "Y" ? "N" : "Y" };
            }
            return menu;
        });

        // 업데이트된 메뉴 리스트 상태로 설정
        setMenuList({ data: updatedMenuList });
    };

    // 사용자 메뉴권한 수정 (노출여부)
    const modifiedMenuAuth = async () => {
        const filteredData = menuList.data.map(({ userNo, menuCd, useYN, modifyYN }) => ({
            userNo, menuCd, useYN, modifyYN
        }));

        await fetch("http://localhost:8080/api/v1/admin//perMenuModify.act", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filteredData),
        })
            .then(res => res.json())
            .then(result => {
                if (result.isErr) alert(result.isErrMsg);
                else console.log(result);
            })
            .catch(err => console.error("사용자 메뉴권한 수정 실패:", err));

    };

    return (
        <div>
            <h1>매뉴권한</h1>
            <ol>
                <li><a href="#">메뉴진입에 대한 권한을 부여할 수 있습니다.</a></li>
            </ol>
            <div>
                <form>
                    <label>이름</label>
                    <select
                        onChange={e => retrieveMenuList(e.target.value)} value={userNum}>
                        <option value="">사용자를 선택하세요</option>
                        {userList?.data?.map((user) => (
                            <option key={user.userNo} value={user.userNo}>
                                {user.userName} ({user.userNo})
                            </option>
                        ))}
                    </select>
                </form>
            </div>

            {Array.isArray(menuList.data) && menuList.data.length > 0 && (
                <div>
                    {menuList.data.map((menu) => (
                        <div key={menu.menuCd}>
                            <input
                                type="checkbox"
                                checked={menu.useYN === "Y"}
                                onChange={() => handleCheckboxChange(menu.menuCd)}  // 체크박스 클릭 시 상태 변경
                            />
                            {menu.mnuNm}
                        </div>
                    ))}
                </div>
            )}

            <button onClick={modifiedMenuAuth}>수정된 권한 저장</button>
        </div>
    );
}

export default Admin;