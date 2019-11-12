var express = require('express'),
    fs = require('fs'),
    app = express();
 
var app = express();
 
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
 
 const threats = [
  {
      id: 1,
      displayName: 'Honorio, tu tines tu vida y yo la mia',
      necessaryPowers: ['ligon'],
      img: 'tower.jpg',
      assignedHero: 0
  },
  {
      id: 2,
      displayName: 'Sergio, Pues ya hemos comido!!',
      necessaryPowers: ['Listo'],
      img: 'mess.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'Juan, ninja developer',
      necessaryPowers: ['ninja garden'],
      img: 'joke.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'Jamal, negado',
      necessaryPowers: ['Valeee....'],
      img: 'joke.jpg',
      assignedHero: 0
  }
];
app.get('/', function(req, res) {
	console.log('buscando JAVA WEB');
    res.send(threats);
});

app.get('/:id', function(req, res) {
	var id = req.params.id;
	console.log('ID ha buscar ', id);
    res.send(threats.find(n => n.id == id));
});
 
 
app.listen(8080, ip);
 
module.exports = app;
