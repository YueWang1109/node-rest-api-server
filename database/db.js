var mysql = require('mysql');
var pool; //database handler

var PRODUCTION_DB = 'app_prod_database'
  , TEST_DB = 'sampledb'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

exports.connect = function(mode,done) {
  pool = mysql.createPool({
    host: 'localhost',
    user: 'sampleadmin',
    password: '992955',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    //insecureAuth: true
  });
  if (!pool) return done(new Error('Missing database connection.'))
  done();
};
exports.get = function() {
  return pool;
};