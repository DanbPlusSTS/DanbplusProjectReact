import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar"; // 사이드바 추가
import "../css/style.css"; // 스타일 적용

const Layout = () => {
  return (
    <div className="layout">
      {/* Header 영역 */}
      <header className="header">
        <Header />
      </header>

      <div id="layoutSidenav">
        {/* Sidebar (메뉴 영역) */}
        <div id="layoutSidenav_nav">
          {/* 테스트를 위한 하드코딩 - 사용자 정보에 맞게 수정할 것! (2025.04.03) */}
          <Sidebar userNo={"1"} gradeCd={"GRADE00001"} /> {/* 여기에 사이드바 추가 */}
        </div>

        {/* Body & Footer 영역 */}
        <div id="layoutSidenav_content">
          <main className="main">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      {/* 로딩바 영역 */}
      <div id="loadingBar" className="wrap-loading" style={{ display: "none", zIndex: 9999 }}>
        <div>
          <div className="spinner-border text-primary" style={{ width: "6rem", height: "6rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
