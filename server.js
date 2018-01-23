const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();

var db;
MongoClient.connect(
  "mongodb://pajamacat:zxx25@ds111618.mlab.com:11618/pajamacat",
  (err, database) => {
    if (err) {
      return console.log(err);
    }
    db = database;
    app.listen(3001, function() {
      console.log("server listening on 3001");
    });
  }
);
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // find方法返回所有quotes数据
  var cursor = db
    .collection("quotes")
    .find()
    .toArray(function(err, results) {
      console.log(results);
      // render index.ejs
      res.render('index.ejs', {quotes: results})
    });
  console.log(__dirname);
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("saved to database");
    res.redirect("/");
  });
});
