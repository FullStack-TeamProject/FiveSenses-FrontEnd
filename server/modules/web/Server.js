/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : Express 라이브러리 활용 HTTP Web Server 모듈입니다.
 */
const { BASE_DIR, PORT, API_SERVER_HOST } = require('../../../Global');
const Logger = require('../log/Logger');//Logger(필수)

const express = require('express');
const webServer = express();
var expressProxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const replace = require('replace');

const axios = require('axios');

// 저장할 디렉토리 설정
const uploadDir = path.join(__dirname, '/uploads/dashboard/');
// Multer 설정
const upload = multer({ dest: uploadDir });


webServer.use(bodyParser.urlencoded({ extended: false }));
webServer.use(bodyParser.json());
webServer.use(express.json());

//파일 시스템 관련 라이브러리
const FS = require('fs');
//stream: 특정 자원을 Streaming 하기 위한 라이브러리 => Transform: Streaming 중인 자원의 Data에 Data 수정 및 추가를 지원해주는 객체
const Transform = require('stream').Transform;
//Streaming 중인 자원에 새로운 데이터를 stream 공간에 추가하기 위한 라이브러리
const newLineStream = require('new-line');

webServer.use(express.json());


// 저장할 디렉토리가 없으면 생성
if (!FS.existsSync(uploadDir)){
    FS.mkdirSync(uploadDir, { recursive: true });
}


webServer.use(express.json());





// 이미지 업로드 라우터 추가
webServer.post('/upload', upload.single('image'), (req, res) => {
    // Access the uploaded image using req.file
    const uploadedImage = req.file;

    // 파일의 이름 변경 (multer 라이브러리가 임의로 설정한 파일 이름 대신 원래 파일 이름 사용)
    FS.rename(path.join(uploadDir, uploadedImage.filename), path.join(uploadDir, uploadedImage.originalname), function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('File rename error');
        } else {
            console.log('File saved successfully');
            res.status(200).send('Image upload successful');
        }
    });
});
  
/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : HTTP Server start
 */
webServer.listen(PORT, function () {
    Logger.logging(`★★★ Node.js를 활용한 Web Server 구동(Port:${PORT}) ★★★`);
})

//엑셀 파일받기
webServer.post('/dataset/datasetInsertOnly.json',(req,res) => {
    // console.log(req.body.fileOrigin);
    // console.log(req.body.fileSaveName);
    // console.log(req.body.fileSize);
    // console.log(req.body.fileType);
    // console.log(req.body.tableName);
    // //console.log(req.body.columnDatas);
    //console.log(req.body.rowData);
    // console.log(req.body.fileSaveDirection);
  
  
    // const extractedData = req.body.columnDatas.map(item => {
    //   return {
    //     originColumnName: item.originColumnName,
    //     // displayColumnName: item.displayColumnName,
    //     // size: item.size,
    //     // dataType: item.dataType,
    //     // dbDataType: item.dbDataType
    //   };
    // });
  
    //console.log(extractedData);
  
    console.log(req.body);
  
    axios({
      url: "http://localhost:8080/xmlArray2",
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      data: req.body
    }).then(function (response) {
      console.log("http://localhost:8080/xmlArray2 - response : ", response.data);
    }).catch(function (error) {
      console.log("http://localhost:8080/xmlArray2 - error : ", error);
    });
  })

/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : Intercepter 역할을 하는 미들웨어 기능
 */
webServer.use(function (request, response, next) {
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    Logger.logging(`[HTTP] ${request.url} (Method: ${request.method}, IP: ${ip})`);
    next();
});



/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : ROOT URL -> index.html
 */
webServer.get('/', function (request, response) {
    //response.sendFile을 통한 HTTP html reponse (html내용 Streaming)
    response.sendFile(`${BASE_DIR}/client/views/index.html`);
})

/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : 화면요청 URL 처리
 */
webServer.get('*.page', function (request, response, next) {
    //index.html 내용을 직접 Streaming하여 Response, Streaming 중간에 내용 수정
    //수정 내용 : URL 요청이 아닌, 브라우저에 표시된 URL만 변경하여, 해당하는 URL PATH의 Vue Component를 routing하기 위함
    const StreamTransform = new Transform();
    StreamTransform._transform = function (data, encoding, done) {
        let fileContent = data.toString();
        let replaceBeforeContent = `<script id="app-start-vue-page">const APP_USER_HTTP_REQUEST_URL = '/';</script>`;
        let replaceAfterContent = `<script id="app-start-vue-page">const APP_USER_HTTP_REQUEST_URL = '${request.params['0']}.page';</script>`;
        fileContent.replace(replaceBeforeContent, replaceAfterContent);
        this.push(fileContent);
        done();
    }
    //Streaming 진행
    FS.createReadStream(`${BASE_DIR}/client/views/index.html`).pipe(newLineStream()).pipe(StreamTransform).pipe(response);
})

/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : REST API 서버에 데이터 요청 보내기(Proxy)
 */
webServer.use('*.json', expressProxy(API_SERVER_HOST, {
    proxyReqPathResolver: function (request) {
        //console.log('request : ', request.url, request.params[0]);
        return `${request.params['0']}.json`;
    }
}));

/**
 * @author : 최정우
 * @since : 2022.09.20
 * @dscription : ROOT URL, Router's, 화면요청 URL 등.. 이 외 나머지 정적 자원에 대한 처리 기능
 */
webServer.get('*.*', function (request, response, next) {
    response.sendFile(`${BASE_DIR}${request.params['0']}.${request.params['1']}`);
})

/**
 * @author : 최정우
 * @since : 2022.09.21
 * @dscription : Global Error Handler (*맨 마지막에 적용해야됨)
 */
webServer.use(function (error, request, response, next) {
    const errorCode = !error.statusCode ? 500 : error.statusCode;
    response.status(errorCode).send('에러가 발생하였습니다. 관리자에게 문의바랍니다.');
    let message = `[Error:${errorCode}] ${request.url}/n ${error.stack}/n`;
    Logger.logging(message);
    //next();
})

