const {User} = require('../models/User');

let auth = function(req,res,next) {

    //인증 처리 
    //클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.X_auth;

    // 토큰을 복호화 한 후 user를 찾는다
    User.findByToken(token,(err,user) => {
        if(err){
            throw err;
        }
        if(!user){
            return res.json({isAuth:false,error:true});
        } 
        

        //index.js 에서 req에서 user와 token 정보를 사용할수 있게 넣어준것
        req.token = token;
        req.user = user;
        next();
    });


    //user가 있으면 인증 완료


    //user가 없으면 인증 불가
};

module.exports= {auth};