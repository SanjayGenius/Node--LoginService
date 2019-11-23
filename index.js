var express = require("express");
const port = 8098
const path = require('path');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST,DELETE,PUT");
    next();
  });
  require("./routes/routes.js")(app);
  var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
})