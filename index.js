const express = require('express'); //  express module 을 가져온다
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require("./models/User"); 
const config = require('./config/key');

//application/x-www-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended : true}));

//application/json 를 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB conneted..')) // 잘 연결됐는지 확인
    .catch(err => console.log(err));

// index 에서 해당 문자열 출력
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~~~ 새로고침 테스트 노드몬~')
});

app.post('/register', (req, res) => {

    //회원가입에 필요한 정보를 client 에서 받아와서 DB에 넣어준다

    const user = new User(req.body); // bodyParser가 있어서 이렇게 넣을 수 있음 

    user.save((err, userInfo) => { //req.body 정보들이 user 모델에 저장  
        if (err) return res.json({success : false, err})
        return res.status(200).json({ // status : 회원가입 성공 했을 때
            success : true
        })
    }) 
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }); // 5000 포트로 접속하면 console.log가 뜬다