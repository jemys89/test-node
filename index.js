var express = require('express'),
    fs = require('fs'),
    app = express();
 
var app = express();
 
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var colors = require('colors/safe');

var couchbase = require('couchbase');
const host = process.env.HOST_COUCHBASE_DEV;
var cluster = new couchbase.Cluster('couchbase://'+host+'/');
const bucketName = process.env.BUCKET_NAME_DEV;
const password = process.env.PASSWORD_COUCHBASE_DEV;
cluster.authenticate(bucketName, password);
var bucket = cluster.openBucket(bucketName, function(err){
  console.log(colors.green(err));
  if(err){
    console.log(colors.red('ERROR AL CONECTAR A couchbase', err));
    return;
  }

  console.log(colors.green('CONECTADO A COUCHBASE'));
});
var N1qlQuery = couchbase.N1qlQuery;

 const threats = [
  {
      id: 1,
      displayName: 'Honorio',
      necessaryPowers: ['JAVA'],
      img: 'tower.jpg',
      assignedHero: 0
  },
  {
      id: 2,
      displayName: 'Sergio',
      necessaryPowers: ['JAVA'],
      img: 'mess.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'Juan',
      necessaryPowers: ['JAVA'],
      img: 'joke.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'Jamal',
      necessaryPowers: ['JAVA'],
      img: 'joke.jpg',
      assignedHero: 0
  }
];



app.get('/', function(req, res) {
    return res.status(200).json({
                    ok: false,
                    team: threats,
                    request: req.url
                });
});

app.get('/couchbase/:id', function(req, res) {
    var response = [];
    var id = req.params.id;
    var query_string = "SELECT count(*) as count FROM` +" bucketName +" WHERE type = 'statHit' and objectType = 'hotel-vst' and  objectID = $1";
    console.log('id', id);
    bucket.query(couchbase.N1qlQuery.fromString(query_string), [id], (error, rows) => {

    if(error){
      return res.status(500).json({
        ok: false,
        error
      })
    }
     let count = rows[0].count;
     return res.status(200).json({
                    ok: true,
                    count,
                    request: req.url
               });
      

    });;

    
});

app.get('/:id', function(req, res) {
	var id = req.params.id;
	console.log('ID ha buscar ', id);
    res.send(threats.find(n => n.id == id));
});
 
 
app.listen(8080, ip);
 
module.exports = app;
