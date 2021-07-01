const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// saltRounds : salt 의 자릿수 
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, // 공백 제거
        unique : 1 // 중복값 x
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type: String
    },
    tokenExp : {
        type: Number
    }
})

//암호화
// pre : save (저장) 하기전에 callback 함수를 실행
// pre 에서는 화살표 함수 쓰지말자!! -> 화살표 함수는 this 바인딩이 다르기 때문!
userSchema.pre('save', function (next) {
    let user = this; //  this는 userSchema를 가르킴

    // password 가 생성 되거나 변경 될 때만 비밀번호를 암호화 시켜주자!
    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash; // hash : 암호화된 비밀번호
                next();  // next가 save route 에 들어감
            });

        });
    }

});


// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema) 

// 다른 곳에서도 User 모델을 쓸 수 있게 함
module.exports = { User }