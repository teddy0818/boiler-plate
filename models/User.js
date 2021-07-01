const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// saltRounds : salt 의 자릿수 
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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
    } else { 
        // next가 있어야 pre 함수에서 빠져나올 수 있다
        next();
    }
});

// comparePassword 이름은 마음대로 해도 됨~
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 암호된 비밀번호를 복호화 할순없고, 입력한 비밀번호를 복호화해서 비교해야한다
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch); // isMatch : 만약 비밀번호가 맞다면 true 반환
    })
};

userSchema.methods.generateToken = function(cb) {

    let user = this;
 
    //jsonwebtoken 을 이용해서 토큰을 생성하기
    //user._id 는 String이 아니기 때문에 toHexString()로 바꿔줘야 한다
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })

}

userSchema.statics.findbyToken = function(token, cb) {
    let user = this;

    //토큰을 decode (복호화) 한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // decode 된 id가 DB에 있는지 검색 !
        user.findeOne({"_id" : decoded, "token" : token}, function(err, user) {
            if(err) return cb(err)
            cb(null, user);
        })
      });
}

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema) 

// 다른 곳에서도 User 모델을 쓸 수 있게 함
module.exports = { User }