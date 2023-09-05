const jwt = require('jsonwebtoken');

module.exports = function (req ,res , next  ){;
    const token = req.cookies.jwt;
    
    if(!token) return res.status(401).render('user/login' , {error : "you should login first"});
    try{
        const verify = jwt.verify(token , 'privateKey');
        res.cookie('user' , verify);
        next();
    }catch(ex){
        res.status(400).render('user/login' , {error : "you should login first"});
    }
}