// 환경변수 - 개발환경이 로컬일때랑 배포중일때랑 다름
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod'); // 배포
} else {
    module.exports = require('./dev'); //로컬
} 