const express = require('express'); //  express module 을 가져온다
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hbj:1915@boilerplate.1ncyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB conneted..')) // 잘 연결됐는지 확인
    .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~~~ 새로고침 테스트')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }); // 5000 포트로 접속하면 console.log가 뜬다