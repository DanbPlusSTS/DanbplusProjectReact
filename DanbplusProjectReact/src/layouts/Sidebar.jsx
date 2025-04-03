import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBookOpen, FaAngleDown } from "react-icons/fa";
import {fetchAction} from "../cmm";

const Sidebar = ({ userNo, gradeCd }) => {
  const [menuData, setMenuData] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  useEffect( () => {
    fetchAction(
        "/menu/layoutMenuList.act?userNo=1&gradeCd=GRADE00001",
        "GET",
        null,
        (result) => {
          setMenuData(buildMenuHierarchy(result))
        }
    );
  }, [userNo, gradeCd]);

  function buildMenuHierarchy(list) {
    if (!list || !Array.isArray(list)) return [];

    const menuMap = {};
    list.forEach((item) => {
      menuMap[item.mainMnu] = { ...item, children: [] };
    });

    return list.reduce((acc, item) => {
      if (item.mnuDepth === 1) {
        acc.push(menuMap[item.mainMnu]);
      } else {
        const parent = menuMap[item.targetMnu];
        if (parent) parent.children.push(menuMap[item.mainMnu]);
      }
      return acc;
    }, []).sort((a, b) => a.mnuOrder - b.mnuOrder);
  }

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  return (
    <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          {menuData.map((menu) => (
            <React.Fragment key={menu.mainMnu}>
              {menu.children.length > 0 ? (
                <>
                  <a className="nav-link collapsed" href="#" onClick={() => toggleMenu(menu.mainMnu)}>
                    <div className="sb-nav-link-icon"><FaBookOpen /></div>
                    {menu.mnuNm}
                    <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                  </a>
                  <div className={`collapse ${openMenus[menu.mainMnu] ? "show" : ""}`}>
                    <nav className="sb-sidenav-menu-nested nav">
                      {menu.children.sort((a, b) => a.mnuOrder - b.mnuOrder).map((subMenu) => (
                        <React.Fragment key={subMenu.mainMnu}>
                          {subMenu.children.length > 0 ? (
                            <>
                              <a className="nav-link collapsed" href="#" onClick={() => toggleMenu(subMenu.mainMnu)}>
                                {subMenu.mnuNm}
                                <div className="sb-sidenav-collapse-arrow"><FaAngleDown /></div>
                              </a>
                              <div className={`collapse ${openMenus[subMenu.mainMnu] ? "show" : ""}`}>
                                <nav className="sb-sidenav-menu-nested nav">
                                  {subMenu.children.sort((a, b) => a.mnuOrder - b.mnuOrder).map((subSubMenu) => (
                                    <Link className="nav-link" to={subSubMenu.mnuUrl} key={subSubMenu.mainMnu}>
                                      {subSubMenu.mnuNm}
                                    </Link>
                                  ))}
                                </nav>
                              </div>
                            </>
                          ) : (
                            <Link className="nav-link" to={subMenu.mnuUrl}>{subMenu.mnuNm}</Link>
                          )}
                        </React.Fragment>
                      ))}
                    </nav>
                  </div>
                </>
              ) : (
                <Link className="nav-link" to={menu.mnuUrl}>
                  <div className="sb-nav-link-icon"><FaTachometerAlt /></div>
                  {menu.mnuNm}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Start Danbplus
      </div>
    </nav>
  );
};

export default Sidebar;
