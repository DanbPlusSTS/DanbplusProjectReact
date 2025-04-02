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
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
	<div>
		<div id="layoutSidenav_content">
			<tiles:insertAttribute name="body" ignore="true"/>
		</div>
	</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
<!--     <script src="/resource/assets/demo/chart-area-demo.js"></script> -->
<!--     <script src="/resource/assets/demo/chart-bar-demo.js"></script> -->
    <script src="/resource/js/scripts.js"></script>
    <script src="/resource/js/datatables-simple.js"></script>
</body>
</html>