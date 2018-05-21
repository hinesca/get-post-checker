/******************************************************************************
* File: get-post-checker.js
* Description: The JS implementation for single page web application that will
* receive incoming POST and GET requests.
* Author(s): Casey Hines, CS 390 course material, and handlebars documentation 
* handlebarsjs.com (https://handlebarsjs.com/)
******************************************************************************/
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 17032);

app.get('/', function(req, res){
  var paramArry = [];
  for (var p in req.query){
    paramArry.push({'name' :p, 'value':req.query[p]});
  }
  var context = {};
  context.dataList = paramArry;
  res.render('get-loopback', context);
});

app.post('/', function(req, res){
  var paramArry = [];
  for (var p in req.body){
    paramArry.push({'name':p, 'value':req.body[p]})
  }
  var context = {};
  context.dataList = paramArry;
  res.render('post-loopback', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});