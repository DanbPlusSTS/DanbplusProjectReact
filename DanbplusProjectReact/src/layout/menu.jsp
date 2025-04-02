<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 
	메뉴 밝게:  <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
	메뉴 어둡게: <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
 -->
<nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
        <div class="nav">
            <div id="layoutMenu"></div>
            <%-- 
			<c:if test="${ sessionScope.loginGrade eq 'GRADE00003'}">
				<div id="admin">
					<div class="sb-sidenav-menu-heading">관리자</div>
					<a class="nav-link" href="/users/insertUserForm">
						<div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
						 회원등록
					</a>
					<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#permission" aria-expanded="false" aria-controls="permission">
						<div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
						권한부여
						<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
					</a>
					<div class="collapse" id="permission" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
						<nav class="sb-sidenav-menu-nested nav">
							<a class="nav-link" href="/admin/perMenuForm">메뉴 권한</a>
						</nav>
					</div>
					<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#codeMgt" aria-expanded="false" aria-controls="codeMgt">
						<div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
						공통
						<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
					</a>
					<div class="collapse" id="codeMgt" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
						<nav class="sb-sidenav-menu-nested nav">
							<a class="nav-link" href="/cmm/codeForm">코드관리</a>
							<a class="nav-link" href="/cmm/menuForm">메뉴관리</a>
						</nav>
					</div>
				</div>
			</c:if>
			 --%>
        </div>
    </div>
    <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        Start Danbplus
    </div>
</nav>

<script type="text/javascript">
	documentReady("#sidenavAccordion" , function(dom){
		
		// depth별 화면
		function drawDepth(list) {
			var vHtml			= "";
			vHtml += '<div class="sb-sidenav-menu-heading">Core</div>';
			 $.each(list, function(i, v) {
				 var item = list[i]; // depth1
				 var depth2 = item.depth2; // depth2
				 
				 if(JUtilValid.isEmpty(depth2)) {
					// depth (단건)
					vHtml += '<a class="nav-link" href=' + item.mnuUrl + '>';
					vHtml += '	<div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>';
					vHtml += 		item.mnuNm;
					vHtml += '</a>';
				 } else {
					// depth (다건)
					vHtml += '<a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#depth_' + item.mainMnu + '" aria-expanded="false" aria-controls="depth_' + item.mainMnu + '">';
					vHtml += '	<div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>';
					vHtml += 		item.mnuNm;
					vHtml += '	<div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>';
					vHtml += '</a>';
					
					vHtml += '<div class="collapse" id="depth_' + item.mainMnu + '" aria-labelledby="depth2" data-bs-parent="#sidenavAccordion">';
					$.each(depth2, function(i2, v2) {
						var item2 = depth2[i2];
						var depth3 = item2.depth3;
						if(JUtilValid.isEmpty(depth3)) {
							// depth2
							vHtml += '	<nav class="sb-sidenav-menu-nested nav">';
							vHtml += '	    <a class="nav-link" href="'+ item2.mnuUrl +'">'+ item2.mnuNm +'</a>';
							vHtml += '	</nav>';
							
						} else {
							// depth3
							vHtml += '	<nav class="sb-sidenav-menu-nested nav accordion" id="depthSub_' + item2.mainMnu + '">';
							vHtml += '	    <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#depthSubTarget_' + item2.mainMnu + '" aria-expanded="false" aria-controls="depthSubTarget_' + item2.mainMnu + '">';
							vHtml += 			item2.mnuNm;
							vHtml += '	        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>';
							vHtml += '	    </a>';
							vHtml += '	    <div class="collapse" id="depthSubTarget_' + item2.mainMnu + '" aria-labelledby="depth3" data-bs-parent="#depthSub_' + item2.mainMnu + '">';
							vHtml += '	        <nav class="sb-sidenav-menu-nested nav">';
							vHtml += '	            <a class="nav-link" href="' + item2.mnuUrl + '">' + item2.mnuNm + '</a>';
							
							$.each(depth3, function(i3, v3) {
								vHtml += '	            <a class="nav-link" href="' + depth3[i3].mnuUrl + '">' + depth3[i3].mnuNm + '</a>';
								
							});
							
							vHtml += '	        </nav>';
							vHtml += '	    </div>';
							vHtml += '	</nav>';
						}
					});
					vHtml += '</div>';
			 	}
			 });
			return vHtml;
		}
		
		function depthChagne(list) {
			var result = [];
			
			$.each(list, function(idx, item) {
				if(item.mnuDepth === 1) { // // depth 1
					var depth2 = $.grep(list, function(subItem) {
						return subItem.targetMnu === item.mainMnu && subItem.mnuDepth > 1;
					});
					
					// depth 2 이상
					if(depth2.length > 0) { // depth 2 이상
						item.depth2 = $.map(depth2, function(subItem) {
							var depth3 = $.grep(list, function(subItem2) {
								return subItem2.targetMnu === item.mainMnu && subItem2.mnuDepth > 2;
							});
							
							if(depth3.length > 0) {
								subItem.depth3 = depth3
							}
							return subItem;
						});
					}
					result.push(item);
				}
			});
			return result;
		}

		function layoutMenuList() {
			var vHtml = "";
			var json = {};
			json.userNo = SESSION_LOGIN_NO; // 로그인한 사용자 번호
			json.gradeCd = SESSION_LOGIN_GRADE; // 로그인한 사용자 등급
			ajaxAction(json, "json", "/cmm/layoutMenuList.act", function(result) {
				var list = result.layoutMenuList;
				var depthList = depthChagne(list);
				
				// 테이블 그리기
				vHtml += drawDepth(depthList);
				$("#layoutMenu").empty().append(vHtml);
			});
		}
		
		layoutMenuList();
	});
</script>

