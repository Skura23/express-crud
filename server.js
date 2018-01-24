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
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 服务器内serve public文件夹
app.use(express.static('public'))

app.get("/", (req, res) => {
  // find方法返回所有quotes数据
  var cursor = db
    .collection("quotes")
    .find()
    .toArray(function(err, results) {
      console.log(results);
      // render index.ejs
      res.render("index.ejs", { quotes: results });
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

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete("/quotes", (req, res) => {
  // handle delete event here
  db.collection("quotes").findOneAndDelete(
    {name: req.body.name},
    (err, result) =>{
      if(err) return res.send(500, err)
      res.send({
        message: 'A darth vader quote got deleted'
      })
    }
  )
});
