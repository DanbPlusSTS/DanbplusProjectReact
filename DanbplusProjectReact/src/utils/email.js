// email

import { POST } from "../utils/com";
import { JUtilValid, MessageAlert } from "../utils/util";
import emailjs from 'emailjs-com';

let rEmail = (function() {
	
	return {
		/**
		 * 이메일 발송
		 * 
		 * @param param		이메일 발송을 위한 데이터
		 * @param callback	이메일 발송 후 로직
		 * @returns			성공여부 (success, error)
		 */
		sendToEmail: function(param, callback) {
			// 이메일 전송을 위한 사용자의 이메일 서비스 ID 초기화
			emailjs.init("sb5UAoScGXMwnHsb2"); 
			
			if(JUtilValid.isEmpty(param)){
				MessageAlert("발송내용이 없습니다.", function() {
					return false;
				});
			}
			
			if(JUtilValid.isEmpty(param.emailKey)){
				MessageAlert("발송요청할 key가 없습니다.", function() {
					return false;
				});
			}
			
			var EMAIL_KEY = param.emailKey;

			var info = {
			    vac			: { key: "default_service", val: "template_xbrin9i" } // 사용자의 휴가신청
			    , vac_aprv	: { key: "default_service", val: "template_k6loa6q" } // 승인자의 휴가결재
			};
			
			var template_data_vac		= ["toMail", "name", "reason", "vacGb", "chkVal", "startDt", "endDt"];
			var template_data_vac_aprv	= ["toMail", "result", "reason", "vacGb", "startDt", "endDt", "result", "refuseReason"];
			
			/*
			var param = { 
				toMail : sendEmail
				, vacGb : vacGb
			    , name: vacNm
			    , reason: reason
			    , startDt : vacStartDt
			    , endDt : vacEndDt
			    , result : "승인"
			    , refuseReason : $("#refuseReason").val()
			};
			*/
			
			emailjs.send(info[EMAIL_KEY].key, info[EMAIL_KEY].val, param)
		    .then(function(response) {
				console.log("email success...", response.status, response.text);
				if(typeof callback == 'function') {
					eval(callback("success"));
				}
				
		    }, function(error) {
				console.log("email error...", error);
				if(typeof callback == 'function') {
					eval(callback("error"));
				}
		    });
		},
		
		/**
		 * 이메일 발송 (Gmail SMTP 통신)
		 * 
		 * @param data		이메일 발송을 위한 데이터
		 * @param callback	이메일 발송 후 로직
		 */
		sendToEmail2: function (data, callback) {
			return POST("/email/sendToEmail", data, callback);
		}
	}
})();

let JUtilEmail = rEmail;		// 이메일 발송

export { JUtilEmail }