<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- ============================== 세션연장 팝업 ============================== -->
<div class="modal fade" id="sessionExpireModal" tabindex="-1" role="dialog" aria-labelledby="sessionExpireModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="sessionExpireModalLabel">세션만료 알림</h5>
            </div>
            <div class="modal-body text-center">
            	곧 세션이 만료될 것 같아요! 연장할까요?
            	<div id="sessionTime" class="fs-3 fw-bold text-danger">0</div>
            </div>
            <div class="modal-footer d-flex justify-content-between" style="width: 100%">
                <button type="button" class="btn btn-primary flex-fill me-2" onclick="extendSession();" style="width: flex: 0 0 70%">연장하기</button>
                <button type="button" class="btn btn-secondary" onclick="JUtilLogin.goLogout();" style="width: flex: 0 0 30%">로그아웃</button>
           	</div>
        </div>
    </div>
</div>
<!-- ============================== 세션연장 팝업 ============================== -->
<script type="text/javascript">
	var seconds = 60;		// 1분

	// 시간
	var serverSessionTime;	// 세션시간 (서버)
	var warningTime;		// 경고팝업 노출시간
	var remainingTime; 		// 남은 시간 (팝업 화면에 표시/초 단위)
	
	// setTimeout
	var sessionTimer;		// 세션 타이머
	var warningTimer;		// 1분전 경고팝업 타이머
	
	// setInterval
	var intervalId;			// 1분전 경고팝업 타이머 (실시간)
	
	documentReady("#layoutAuthentication" , function(dom){
		// 세션 생성시간 세팅
		JUtilSession.creationSessionTime(function(sessionTime) {
			serverSessionTime	= sessionTime; // 세션시간 (서버기준/초 단위)
			warningTime			= (serverSessionTime - seconds); // 세션만료 1분전 (경고팝업 노출을 위함) (초 단위)
			remainingTime		= (serverSessionTime - warningTime); // 세션시간 - 경고시간 = 남은시간
			
			// 타이머 시작 (세션, 경고팝업)
			startSessionTimers();

			/*
			console.log("--------------------------");
			console.log(" - 서버    세션시간: " + serverSessionTime + "초");
			console.log(" - 경고팝업 노출시간: " + warningTime       + "초");
			console.log(" - 경고팝업 남은시간: " + remainingTime     + "초");
			console.log("--------------------------");
			*/
		});
	});
	
	// 타이머 시작 (세션, 경고)
	function startSessionTimers() {
		// 세션 만료 타이머 설정 (밀리초 단위로 변환)
		// 시간 완료시 로그아웃 처리
		sessionTimer = setTimeout(JUtilLogin.goLogout, serverSessionTime * 1000);
		
		// 1분전 경고 팝업 표시 타이머 설정 (밀리초 단위로 변환)
		warningTimer = setTimeout(function() {
			// 세션 갱신 팝업 노출
			$('#sessionExpireModal').modal('show');
			
			// 1초마다 남은시간 팝업 화면에 표시
			sessionInterval();
			
		}, warningTime * 1000);
	}
	
	// 남은 시간 팝업화면에 표시
	function sessionInterval() {
		intervalId = setInterval(function() {
	    	if(remainingTime > 0) {
	    		remainingTime--;
	    		updateSessionTimeText();
		    	// console.log("남은 세션시간: " + remainingTime);
	    		
	    	} else {
	    		remainingTime = seconds;
	    		clearTimeEvent();
	    	}
	    }, 1000); // 1초마다 실행
	}
	
	// 남은시간 텍스트 갱신
	function updateSessionTimeText() {
		$("#sessionTime").text(remainingTime);
	}
	
	// 세션 연장
	function extendSession() {
		JUtilSession.extendSession(function(sessionTime) {
			clearTimeEvent();		 // 타이머 및 인터벌 clear
		    startSessionTimers();	 // 세션 타이머 시작
		    remainingTime = seconds; // 데이터 초기화
		    
			$('#sessionExpireModal').modal('hide'); // 연장 완료 후 처리 (세션팝업 닫기)
		});
	}
	
	// 타이머 및 인터벌 clear
	function clearTimeEvent() {
		clearTimeout(sessionTimer);
	    clearTimeout(warningTimer);
	    clearInterval(intervalId);
	}
</script>