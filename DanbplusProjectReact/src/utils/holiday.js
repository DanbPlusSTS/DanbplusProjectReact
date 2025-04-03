import {fetchAction, GET} from "./com";

const holiday = (year, month, callback) => {

    const baseUrl = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
    const serviceKey = '4XY72sFnuZ0QBOeDGr4jdYPNW6MoSMue%2FY6aTsry%2BU%2FG5DUIcRI5ZGYsEcMn7hv40bGpy1IsbfPm11bq9DGVSA%3D%3D';

    let queryParam = "?";
    queryParam += 		encodeURIComponent('serviceKey') + '=' + serviceKey;
    queryParam += '&' + encodeURIComponent('solYear')	 + '=' + encodeURIComponent(year);
    queryParam += '&' + encodeURIComponent('solMonth')	 + '=' + encodeURIComponent(month);

    let url = baseUrl + queryParam;

    GET(url, () => {
        if (this.readyState === 4) {
            let res = format.xmlToJson2(this.responseXML);
            let items = res.response.body.items.item; // 공휴일
            callback(items);
        }
    });
}