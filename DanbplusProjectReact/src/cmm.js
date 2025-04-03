/**
 * 비동기 콜백 함수
 * @param url
 * @param method
 * @param data
 * @param callback
 * @returns {Promise<void>}
 */
export const fetchAction = async (url, method, data, callback) => {

    await fetch(`http://localhost:8080/api/v1${url}`, {
        method: method,
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(result => {
            console.log("✅ API 응답 데이터:", result);
            if (!result.data || !Array.isArray(result.data)) throw new Error("data가 존재하지 않거나 배열이 아닙니다.");
            return callback(result.data);
        })
        .catch(error => {
            console.error("❌ 데이터 가져오기 오류:", error);
        });

}







