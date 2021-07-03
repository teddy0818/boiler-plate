const express = require('express'); //  express module 을 가져온다
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User"); 
const config = require('./config/key');
const { auth } = require("./middleware/auth")

//application/x-www-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended : true}));

//application/json 를 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB conneted..')) // 잘 연결됐는지 확인
    .catch(err => console.log(err));

// index 에서 해당 문자열 출력
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~~~ 새로고침 테스트 노드몬~')
});

// Register route
app.post('/api/users/register', (req, res) => {

    //회원가입에 필요한 정보를 client 에서 받아와서 DB에 넣어준다

    // bodyParser가 있어서 이렇게 넣을 수 있음 
    // 모든 정보들을 모델에 넣어줌
    const user = new User(req.body); 

    user.save((err, userInfo) => { //req.body 정보들이 user 모델에 저장  
        if (err) return res.json({success : false, err})
        return res.status(200).json({ // status(200) : 회원가입 성공 했을 때
            success : true
        })
    }) 
})

//Login route
app.post('/api/users/login', (req, res) => {

    // 1. 요청된 email을 DB에서 있는지 찾는다
    User.findOne({email : req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess : false,
                message : "해당 되는 이메일을 찾을 수 없습니다"
            })
        }

        // 2. email 이 있다면, 비밀번호를 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({
                    loginSuccess : false,
                    message : "비밀번호가 틀렸습니다"
                })

            // 3. 비밀번호까지 맞다면 Token을 생성하기
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token) // x_auth 에 user.token 저장 
                .status(200) // 로그인 성공
                .json( {loginSuccess : true, userId : user._id})
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {

    //여기까지 미들웨어를 통과했다는 얘기는 Authentication 이 true 라는 말
    res.status(200).json({
        // auth에서 미리 req에 저장해놓음
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true, // 0이 아니면 관리자
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
      { token: "" }
      , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        })
      })
  })

app.get('/api/hello', (req, res) => res.send('axios 테스트!!!'))

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }); // 5000 포트로 접속하면 console.log가 뜬다