const userdbtier = require('../database/userdbtier');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_register = function (req, res) {
    //console.log(`registering`);
    userdbtier.AddNewUser(req.body,function(err, result){
        if (err) res.status(400).json(result);
        console.log(`register result: ${result}`);
        res.json(result);
    })
}

exports.user_login = function(req, res){
    if(!(req.body.email && req.body.password)){
        return res.json({loggedin: false, message:"Missing username or password"});
      }
    var email = req.body.email;
    var password = req.body.password;
    userdbtier.getUserByEmail(email,function(err, rows){

        if (err) return res.json({loggedin: false, message:"no such user found"});
        
        if(!rows.length) return res.json({loggedin: false, message:"no such user found"});
        else{
            //console.log(rows);
            if(bcrypt.compareSync(password, rows[0].Password)){
            //if(password === rows[0].Password){
                // from now on we'll identify the user by the id and 
                // the id is the only personalized value that goes into our token
                var payload = {
                    id: rows[0].iduser,
                    role: rows[0].Type    
                };
                var token = jwt.sign(payload, 'JustaTest', { expiresIn: '30m' });
                delete rows[0].Password;
                delete rows[0].iduser;
                return res.json({loggedin: true, message: "Login success", email: rows[0].Email, type: rows[0].Type, token: `Bearer ${token}`});
            }
            else return res.json({loggedin: false, message:"Wrong password!"});
        }
    })
}