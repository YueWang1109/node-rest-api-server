const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const db = require('./database/db');
const users = require('./controllers/users');
const games = require('./controllers/games');
const bodyParser = require("body-parser");
const CheckAuth = require('./middle-ware/check-auth');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({storage: storage})


const app = express();

//prevent a sophisticated attacker from determining that an app is running Express
app.disable('x-powered-by');

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

//set static asset folder
app.use('/public',express.static('public'))

//Setting SSL server
var sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

https.createServer(sslOptions, app).listen(8443);


//Endpoints
app.post("/register", users.user_register);
app.post('/login', users.user_login);

app.get('/api/inventory', CheckAuth.check_user, games.get_inventory);
app.get('/api/get_game', CheckAuth.check_user, games.get_game);
app.get('/api/delete_game', CheckAuth.check_admin, games.delete_game);
app.get('/api/my_info', CheckAuth.check_user);
app.post('/api/edit_game', CheckAuth.check_admin, upload.single('imagename'), games.edit_game);
app.post('/api/add_game', CheckAuth.check_admin, upload.single('imagename'), games.add_game);

db.connect(db.MODE_TEST, function(err) {
    if (err) {
      console.log('Unable to connect to MySQL.');
      process.exit(1);
    } else {
        //app.listen(8080, () => console.log('Example app listening on port 8080!'));
    }
  });

app.get('/api/test',(req, res) => {
    res.status(400).json('this is the test api');
});