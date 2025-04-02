<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 
	메뉴 밝게:  <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
	메뉴 어둡게: <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
 -->
<nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
        <div class="nav">
        	<!-- Depth별 데모 -->
			<div class="sb-sidenav-menu-heading">DEMO</div>
            <!-- demo1 S -->
            <a class="nav-link" href="#">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
				 demo1
            </a>
            <!-- demo1 E -->
            <!-- demo2 S -->
            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#demo2" aria-expanded="false" aria-controls="demo2">
                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                demo2
                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
            </a>
            <div class="collapse" id="demo2" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <nav class="sb-sidenav-menu-nested nav">
                    <a class="nav-link" href="#">layout-static</a>
                    <a class="nav-link" href="#">layout-sidenav-light</a>
                </nav>
            </div>
            <!-- demo2 E -->
            <!-- demo3 S -->
            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#demo3" aria-expanded="false" aria-controls="demo3">
                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                demo3
                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
            </a>
            <div class="collapse" id="demo3" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                <nav class="sb-sidenav-menu-nested nav">
                    <a class="nav-link" href="#">layout-static</a>
                </nav>
                <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                        Authentication
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="#">Login</a>
                            <a class="nav-link" href="#">Register</a>
                            <a class="nav-link" href="#">Forgot Password</a>
                        </nav>
                    </div>
                    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                        Error
                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                    </a>
                    <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="#">401 Page</a>
                            <a class="nav-link" href="#">404 Page</a>
                            <a class="nav-link" href="#">500 Page</a>
                        </nav>
                    </div>
                </nav>
            </div>
            <!-- demo3 E -->
            
            <div class="sb-sidenav-menu-heading">Addons</div>
            <a class="nav-link" href="#">
                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                Charts
            </a>
            <a class="nav-link" href="#">
                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                Tables
            </a>
        </div>
    </div>
    <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        Start Danbplus
    </div>
</nav>