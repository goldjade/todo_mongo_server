/** @format */
//express 서버
const express = require('express');
//서버 경로 모듈
const path = require('path');

//mongoos 모듈
const mongoose = require('mongoose');
const { Todo } = require('./model/TodoModel.js');
//개발 인증 관련
const config = require('./config/key.js');
//express 인스턴스 생성
const app = express();
//포트 번호
const port = 5000;
//고정된(Static) Path 경로를 설정 한다.
app.use(express.static(path.join(__dirname, '../client/build/')));
//서버가 요청을 받아들이기 위해서 대기중

//요청이 들어오면 Json 사용 및 url 인코딩을 해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGODB관련
app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log('DB연결성공');
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB연결실패${err}`);
    });
});
// 요청req : request 응답res : response
app.get('/', (req, res) => {
  //파일을 보여줌
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// 요청req : Request 응답res : response

app.get('*', (req, res) => {
  //파일을 보여줌
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// 테스트 요청이 들어왔다. 요청req : Request 응답res : response

//할일등록
app.post('/api/post/submit', (req, res) => {
  // console.log(요청.body);
  let temp = req.body;
  const todoPost = new Todo(temp);
  todoPost
    .save()
    .then(() => {
      //데이터 저장이 성공한 경우
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      //데이터 저장이 실패한 경우
      console.log(err);
      res.status(400).json({ success: false });
    });
});

//목록 읽어오기
app.post('/api/post/list', (req, res) => {
  // console.log('전체목록 호출');
  Todo.find({})
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, initTodo: doc });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false });
    });
});