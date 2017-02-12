var pg = require('pg');

var config = {
  user: 'direttore', //env var: PGUSER
  database: 'mikwork', //env var: PGDATABASE
  password: 'roboval', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

//TODO una gara su più tavoli?
exports.startRace = function(race, tavolo, callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //grand update privileges to cronometro user on table gara
    query='grant update on '+race+' to cronometro';
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null,result);
    });

    //set race on current table
    //TODO inserire il primo team della lista gara
    query='INSERT INTO current (race,tavolo,team) values (\''+race+'\',\''+tavolo+'\',\'mark1\')';
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null, query);
    });
  });
}

exports.stopRace = function(race,callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //revoke update on all tables to cronometro
    query='revoke update on all tables in schema public from cronometro';
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
    });

    //delete race from current table
    var query ="delete from current where race='"+race+"'";
    client.query(query, function(err, res) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null,res);
    });
  });
}

exports.startRegistrazioneRace = function(race,callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //grant insert to registrazione on race tables
    query='grant insert on '+race+' to registrazione';
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null,result);
    });
  });
}

exports.stopRegistrazioneRace = function(race,callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    //revoke update on all tables to cronometro
    query='revoke insert on all tables in schema public from registrazione';
    client.query(query, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
    });
  });
}

exports.select = function(table,callback){
  pool.connect(function(err, client, done) {
    if(err) callback(err, null);

    client.query("select * from "+table , function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) return callback(err, null);
      else return callback(null, res.rows[]);
    });
  });
}
