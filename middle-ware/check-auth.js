const jwt = require('jsonwebtoken');
const userdbtier = require('../database/userdbtier');

exports.check_user = (req, res, next) => {
    
    try{
    const decode = jwt.verify(req.headers.authorization.split(' ')[1],"JustaTest");
    userdbtier.getUserById(decode.id,function(err,result){
        if(err) throw err;
        if(!result.length) //Can't find this user by the given token
            return res.status(401).json({
                massage: 'Auth failed'
            })
        if(req.query.user_info === "999"){
            delete result[0].Password;
            delete result[0].iduser;
            return res.json(result[0]);
        }
        else
            next();
    })
    }catch(err){
        return res.status(401).json({
            massage: 'Auth failed'
        })
    }
}
exports.check_admin = (req, res, next) => {
    
    try{
    const decode = jwt.verify(req.headers.authorization.split(' ')[1],"JustaTest");    
    userdbtier.getUserById(decode.id,function(err,result){
        if(err) throw err;
        console.log(`checking admin ${result}`);
        if(!result.length||result[0].Type != 2) //Can't find this user by the given token
            return res.status(401).json({
                massage: 'Auth failed'
            })
        next();
    })
    }catch(err){
        return res.status(401).json({
            massage: 'Auth failed'
        })
    }
}
