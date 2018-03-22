const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

var db;
MongoClient.connect('mongodb://pajamacat:zxx25@ds111618.mlab.com:11618/pajamacat', (err, client)=>{
  if (err) {
    return console.log('err:',err);
  }
  db = client.db('pajamacat')
  app.listen(3001, function () {
    console.log('listening 3001');
  })
})

app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname+'/index.html')
})

app.get('/foo', function (req, res) {
  res.sendFile(__dirname+'/foo.html')
})

app.post('/quotes', function (req, res) {
  db.collection('quotes').save(req.body, (err, result)=>{
    if (err) {
      return console.log(err);
    }
    console.log('saved to `quotes`');
    res.redirect('/')
  })
})