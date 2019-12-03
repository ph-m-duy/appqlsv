var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var cors = require("cors");

var checkLogin = false;
var checkRegister = false;
var changeProfile = false;
var changePass = false;
var nowUsername = "";
var nowPassword = "";

var Student = [];
var profile = fs.readFileSync("./database/Student.json");
if (profile) {
  Student = JSON.parse(profile);
}

// var MoneyManage = [];
// var money = fs.readFileSync("./database/TimeManage.json");
// if (money) {
//   MoneyManage = JSON.parse(money);
// }

app.use(cors());

var corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(bodyParser.json());

app.post("/Login", cors(corsOptions), function (req, res, next) {
  // console.log(req.body.username);
  // console.log(req.body.password);

  Student.forEach(item => {
    if (
      item.username == req.body.username &&
      item.password == req.body.password
    ) {
      res.send("1");
      nowUsername = req.body.username;
      nowPassword = req.body.password;
      checkLogin = true;
    }
  });
  if (checkLogin == false) {
    res.send("0");
  }
});

app.post("/Register", cors(corsOptions), function (req, res, next) {
  // console.log(req.body);
  if (req.body.check == "1") checkRegister = false;
  Student.forEach(item => {
    if (req.body.fullname == "" || req.body.MSSV == "" || req.body.username == "" || req.body.password == "" || req.body.startterm == "" || req.body.major == "") {
      res.send("0");
      checkRegister = true;
    }
    if (item.username == req.body.username) {
      res.send("1");
      checkRegister = true;
    }
  })
  if (!checkRegister) {
    res.send("2");
    var userData = req.body;
    Student.push(userData);
    nowUsername = req.body.username;
    var Regis = fs.writeFileSync("./database/Student.json", JSON.stringify(Student), function (err) {
      if (err) throw err;
      // console.log("Saved!");
    });
  }
});

app.post("/Dashboard", cors(corsOptions), function (req, res, next) {
  Student.forEach(item => {
    if (item.username === nowUsername) {
      res.send(item.fullname);
      // console.log(item.fullname);
    }
  })
  // console.log(req.body.checkLogout);
  if (req.body.checkLogout == "1") {
    checkLogin = true;
  }
});

app.post("/Information", cors(corsOptions), function (req, res, next) {
  Student.forEach(item => {
    if (item.username === nowUsername) {
      res.send(item);
      // console.log(item);
    }
  })
});

app.post("/ChangeInfor", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  if (req.body.check == "1") changeProfile = false;
  if (req.body.fullname == "" || req.body.MSSV == "" || req.body.username == "" || req.body.password == "" || req.body.startterm == "" || req.body.major == "") {
    res.send("0");
    changeProfile = true;
  }
  if (changeProfile) {
    res.send("1");
    Student.forEach(item => {
      if (item.username == nowUsername) {
        item.fullname = req.body.fullname;
        item.MSSV = req.body.MSSV;
        item.startterm = req.body.startterm;
        item.major = req.body.major;
        console.log(item.username);
      }
    })
  }

});

app.post("/ChangePassword", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
  if (req.body.oldpass == "") {

  }
});

app.post("/TermSub", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
});

app.post("/TimeManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var timereq = JSON.stringify(req.body)
  var timeMa = fs.appendFileSync("./database/TimeManage.json", timereq, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  res.send("1");
});

app.post("/MoneyManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var moneyreq = JSON.stringify(req.body)
  var moMa = fs.appendFileSync("./database/MoneyManage.json", moneyreq, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  res.send("1");
});

app.post("/MarkManage", cors(corsOptions), function (req, res, next) {
  res.send("Hello");
  console.log(req.body);
});

app.post("/MarkChart", cors(corsOptions), function (req, res, next) {
  res.send("Hello");
});

app.post("/MoneyChart", cors(corsOptions), function (req, res, next) {
  res.send("Hello");
});

app.post("/TimeChart", cors(corsOptions), function (req, res, next) {
  var timeCha = fs.readFileSync("./database/TimeManage.json");
  var tiCha = JSON.parse(timeCha);
  res.send(tiCha);
  console.log(tiCha);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(
    "Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s",
    host,
    port
  );
});
