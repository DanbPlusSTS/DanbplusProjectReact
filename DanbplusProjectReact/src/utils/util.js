const format = () => {

    return {

        /**
         * 숫자 3자리 마다 컴마(,) 추가
         * @param target
         * @returns {string}
         */
        addComma: (target) => {
            let _target = target;
            if(typeof target == 'number') {
                _target = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return _target;
        },

        /**
         * 컴마(,) 제거
         * @param target
         * @returns {string}
         */
        removeComma: (target) => {
            return target.toString().replace(/(,)/g, "");
        },

        /**
         * target의 길이만큼 "0" 추가
         * @param target
         * @param len
         * @returns {string}
         */
        addZero: (target) => {
            return target.toString().padStart(target.length, "0");
        },

        /**
         * target의 길이 만큼 문자 추가
         * @param target
         * @returns {string}
         */
        addStr: (target, str) => {
            return target.toString().padStart(target.length, str);
        },

        /**
         * 영문 대/소문자 변환
         * @param target
         * @param gubun UP/DOWN
         * @returns {*|string}
         * @constructor
         */
        UpDownCase: (target, gubun) =>  {
            let _target = target;

            if(target === "") {
                return target;
            } else {
                switch (gubun) {
                    case "up": case "UP":
                        _target = target.toUpperCase(); // 대문자 변환
                        break;
                    case "down": case "DOWN":
                        _target = target.toLowerCase(); // 소문자 변환
                        break;
                    default:
                        _target = target.toUpperCase(); // 기본값 (대문자 변환)
                        break;
                }
            }

            return _target;
        },

        /**
         * XML -> JSON (npm install xml2js)
         * 라이브러리 -> node.js 환경에 적합
         * @param xml
         */
        xmlToJson1: (xml) => {
            const xml2js = require("xml2js");

            const parser = new xml2js.Parser({ explicitArray: false });

            parser.parseString(xml, (error, result) => {
                if (err) {
                    console.error(error);
                }

                JSON.parse(JSON.stringify(result));
            });
        },

        /**
         * XML -> JSON
         * 브라우저
         * DOMParser
         * @param xml
         */
        xmlToJson2: (xml) => {
            let obj = {};

            if (xml.nodeType === 1) { // ELEMENT_NODE
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (let attr of xml.attributes) {
                        obj["@attributes"][attr.nodeName] = attr.nodeValue;
                    }
                }
            }
            else if (xml.nodeType === 3) { TEXT_NODE
                return xml.nodeValue.trim();
            }

            // 자식 노드 처리
            let textNodes = [...xml.childNodes].filter(node => node.nodeType === 3);

            if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
                return [...xml.childNodes].reduce((text, node) => text + node.nodeValue, "").trim();
            }

            if (xml.hasChildNodes()) {
                for (let item of xml.childNodes) {
                    let nodeName = item.nodeName;

                    if (!obj[nodeName]) {
                        obj[nodeName] = this.xmlToJson2(item);
                    } else {
                        if (!Array.isArray(obj[nodeName])) {
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(this.xmlToJson2(item));
                    }
                }
            }

            return obj;
        }

    }
}