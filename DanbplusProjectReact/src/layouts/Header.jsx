import React from "react";
import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { BiBug, BiUser } from "react-icons/bi";

const NavigationBar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    console.log("로그아웃 실행"); // 실제 로그아웃 함수로 대체하세요.
    setShowLogout(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="/">단비플러스STS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={<BiBug />} id="bug-report-dropdown">
              <NavDropdown.Item href="/cmm/feedbackForm">오류/건의사항</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<BiUser />} id="user-dropdown">
              <NavDropdown.Item href="/users/updateUserInfoForm">회원정보 수정</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => setShowLogout(true)}>로그아웃</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* 로그아웃 모달 */}
      <Modal show={showLogout} onHide={() => setShowLogout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>로그아웃</Modal.Title>
        </Modal.Header>
        <Modal.Body>로그아웃을 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogout(false)}>취소</Button>
          <Button variant="primary" onClick={handleLogout}>로그아웃</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
