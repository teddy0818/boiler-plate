const User = require('../models/User');

let auth = (req, res, next) => {

    // 인증처리 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookie.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다
    User.findbyToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})
        req.token = token;
        req.user = user;
        next(); // 미들웨어기 때문에 넘겨줘야함  
    });

    // 유저가 있으면 인증 Okay !!

    // 유저가 없으면 인증 No !!

}

module.exports = { auth };