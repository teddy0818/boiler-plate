const mongoose = require('mongoose');

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

// 스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema) 

// 다른 곳에서도 User 모델을 쓸 수 있게 함
module.exports = { User }