/**
 * GET - API 통신
 * @param {*} url
 * @param {*} callback 
 */
export const GET = async (url, callback) => {
    await fetchAction(url, "GET", null, callback);
}
/**
 * POST - API 통신
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 */
export const POST = async (url, data, callback) => {
    await fetchAction(url, "POST", data, callback);
}
/**
 * PUT - API 통신
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 */
export const PUT = async (url, data, callback) => {
    await fetchAction(url, "PUT", data, callback);
}
/**
 * DELETE - API 통신
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 */
export const DELETE = async (url, data, callback) => {
    await fetchAction(url, "DELETE", data, callback);
}

/**
 *
 * POST - API 통신 (파일 업로드용)
 * @param {*} url
 * @param {*} data
 * @param {*} callback
 */
export const POST_FILE = async (url, data, callback) => {
    await fetchAction(url, "POST", data, callback, true);
}

/**
 * 비동기 콜백 함수
 * @param url
 * @param method
 * @param data
 * @param callback
 * @param isFileUpload
 * @returns {Promise<void>}
 */
export const fetchAction = (url, method, data, callback, isFileUpload = false) => {
    let baseUrl = 'http://localhost:8080/api/v1';

    // api 통신 옵션
    const options = {
        method: method,
        headers: {},
    }

    // 파일 업로드시 FormData 사용
    if (isFileUpload) {
        const formData = new FormData();
        formData.append('file', data);
        options.body = formData;
    } else {
        options.headers = { "Content-Type": "application/json" };
        options.body = (method === "GET") ? undefined : JSON.stringify(data); // GET은 body 없음
    }

     fetch(`${baseUrl}${url}`, options)
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