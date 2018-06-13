const gamedbtier = require('../database/gamedbtier');

exports.get_inventory = function(req, res){
    //console.log(JSON.stringify(req.query));
    gamedbtier.getInventory(req.query,function(err, rows){
        if (err) res.status(400).json('Can\'t access the database right now!');
        return res.json(rows);
    })
}

exports.get_game = function(req, res){
    
    console.log(`get_game${req.query.id}`);
    gamedbtier.getGamebyId(req.query.id,function(err, rows){
        if (err) res.status(400).json('Can\'t access the database right now!');
        return res.json(rows);
    })
}

exports.delete_game = function(req, res){
    
    console.log(`delete_game${req.query.id}`);
    gamedbtier.deleteGamebyId(req.query.id,function(err, result){
        if (err) res.status(400).json('Can\'t access the database right now!');
        return res.json(result);
    })
}

exports.edit_game = function(req, res){
    
    console.log(`edit_game${JSON.stringify(req.body)}`);
    if(req.file)
        req.body.imagename = req.file.filename;
    gamedbtier.editGame(req.body,function(err, result){
        if (err) res.status(400).json('Can\'t access the database right now!');
        return res.json(result);
    })
}

exports.add_game = function(req, res){
    console.log(req.file);
    console.log(`add_game${JSON.stringify(req.body)}`);
    if(req.file)
        req.body.imagename = req.file.filename;
    gamedbtier.addGame(req.body,function(err, result){
        if (err) res.status(400).json('Can\'t access the database right now!');
        return res.json(result);
    })
}