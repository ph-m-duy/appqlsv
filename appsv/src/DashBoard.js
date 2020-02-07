var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var cors = require("cors");
var user = require("./User");
var login = require("./Login");

app.use(cors());


var corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200
};


app.use(bodyParser.json());



var nowPassword = "";
var nowPosition = "";
var nowId = "";
var nowTerm = "";
var nowWeek = "";
var checkLogin = false;

class Dashboard {
  constructor() {

  }


  accessMainBoard(app, nowUsername, nowWeek, nowTerm) {
    app.post("/Dashboard", cors(corsOptions), function (req, res, next) {
      var termweek = { name: nowUsername, week: nowWeek, term: nowTerm };
      console.log(termweek);
      res.send(termweek);
      if (req.body.checkLogout == "1") {
        checkLogin = false;
      }
    });

  }

}

const dashboard = new Dashboard();

module.exports = dashboard;











