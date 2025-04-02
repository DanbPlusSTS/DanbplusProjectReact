<%@ include file="/WEB-INF/views/cmm/inc_header.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	    <meta name="description" content="" />
	    <meta name="author" content="" />
		<title><tiles:getAsString name="title" ignore="true"/></title>
	    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
	    <link href="/resource/css/styles.css" rel="stylesheet" />
	    
	    <!-- html source preview css -->
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.1/codemirror.min.css">
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.1/theme/dracula.min.css">
	    
	    <!-- 부트스트랩 아이콘 -->
	    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
	    
	    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
	</head>
	
	<!--
		메뉴 스크롤 X: <body>
		메뉴 스크롤 O: <body class="sb-nav-fixed">
	-->
	<body>
		<!-- tiles 영역 -->
		<tiles:insertAttribute name="header" ignore="true"/>
		<div id="layoutSidenav">
			<div id="layoutSidenav_nav">
				<tiles:insertAttribute name="menu" ignore="true"/>
			</div>
			<div id="layoutSidenav_content">
				<tiles:insertAttribute name="body" ignore="true"/>
				<tiles:insertAttribute name="footer" ignore="true"/>
			</div>
			<div id="layoutSessionExpiryModal">
				<tiles:insertAttribute name="sessionExpiry" ignore="true" />
			</div>
		</div>
		<!-- 로딩바 영역 -->
		<div id="loadingBar" class="wrap-loading" style = "display:none; z-index: 9999;"> <!-- 최상단에서 로딩바 노출할 수 있도록 수정 (2024.11.20) -->
		    <div>
		    	<div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
			  		<span class="visually-hidden">Loading...</span>
				</div>
		    </div>
		</div> 
	
	    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
	    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
	<!--     <script src="/resource/assets/demo/chart-area-demo.js"></script> -->
	<!--     <script src="/resource/assets/demo/chart-bar-demo.js"></script> -->
	    <script src="/resource/js/scripts.js"></script>
	    <script src="/resource/js/datatables-simple.js"></script>
	    <script type="text/javascript">
	    	// 입력값 filter
			JUtilFilter.filter();
			
			// 부트스트랩 툴팁 사용시 필수선언
			const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
			const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
	    	
	    </script>
	</body>
</html>