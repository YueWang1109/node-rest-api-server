const db = require('./db');
var bcrypt = require('bcrypt');

exports.AddNewUser = function(body,done){
    body.password = bcrypt.hashSync(body.password, 10);
    body.Type = 1; //default: regular user

    let query = 'INSERT INTO user SET ?';
    db.get().query(query, body, function(err,result){
        //if(err) throw err;
        console.log('AddNewUser success!');
        done(err,result);
    })
};

exports.getUserById = function(id,done){

    let query = 'SELECT * FROM user WHERE iduser=?';
    db.get().query(query, id, function(err,users){
        //if(err) throw err;
        console.log('getUserById success!');
        //console.log(users);
        done(err,users);
    });
};
exports.getUserByEmail = function(email,done){
    
    let query = 'SELECT * FROM user WHERE Email=?'
    db.get().query(query, email, function(err,rows){
        //if(err) throw err;
        console.log('getUserByEmail success!');
        //console.log(rows);
        done(err,rows);
    });
};
exports.getGamebyId = function(id,done){

    let query = 'SELECT * FROM inventory WHERE idinventory=?';
    db.get().query(query, id, function(err,rows){
        //if(err) throw err;
        console.log('getGamebyId success!');
        //console.log(rows);
        done(err,rows);
    });
};

exports.deleteGamebyId = function(id,done){

    let query = 'DELETE FROM inventory WHERE idinventory=?';
    db.get().query(query, id, function(err,result){
        //if(err) throw err;
        console.log('deleteGamebyId success!');
        //console.log(result);
        done(err,result);
    });
};
exports.editGame = function(body,done){
    
    let clonebody = {
        ProductName: body.ProductName,
        Quantity: body.Quantity,
        Category: body.Category,
        Description: body.Description,
        Price: body.Price,
    }
    if(body.imagename)
        clonebody.imagename = body.imagename

    let query = 'UPDATE inventory SET ? where idinventory= ? ';
    db.get().query(query, [clonebody, body.idinventory], function(err,result){
        //if(err) throw err;
        console.log('editGame success!');
        //console.log(result);
        done(err,result);
    });
};
exports.addGame = function(body,done){

    console.log(`The addGame body is ${JSON.stringify(body)}`);
    let query = `INSERT INTO inventory SET ?`;
    db.get().query(query, body, function(err,result){
        //if(err) throw err;
        console.log('addgame success!');
        //console.log(result);
        done(err,result);
    });
};
exports.getInventory = function(query,done){
    let condition = "";
    
    if(query&&(query.sortby != null)){
        condition = " ORDER BY "
        if(query.sortby == 0){ //name A-Z
            condition += "ProductName"
        }else if(query.sortby == 1){   //name Z-A
            condition += "ProductName DESC"
        }else if(query.sortby == 2){   //price low->high
            condition += "Price"
        }else if(query.sortby == 3){   //price high->low
            condition += "Price DESC"
        }else{
            condition = "";
        }
    }
    console.log(`SELECT * FROM inventory${condition}`);
    db.get().query(`SELECT * FROM inventory${condition}`, function(err,rows){
        //if(err) throw err;
        console.log('select inventory success!');
        //console.log(rows);
        done(err,rows);
    });
};