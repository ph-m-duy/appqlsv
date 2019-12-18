var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var cors = require("cors");
//----------------------------------------------------------------------------------------------------
var checkLogin = false;
var checkRegister = false;
var changeProfile = false;
var changePass = false;
var nowUsername = "";
var nowPassword = "";
//----------------------------------------------------------------------------------------------------
var Student = [];
var profile = fs.readFileSync("./database/Student.json");
if (profile) {
  Student = JSON.parse(profile);
}
studenttemp = {
  fullname: "",
  username: "",
  password: "",
  MSSV: "",
  startterm: "",
  major: ""
}
//----------------------------------------------------------------------------------------------------
var SubjectTerm = []
var subject = fs.readFileSync("./database/SubjectTerm.json");
if (subject) {
  SubjectTerm = JSON.parse(subject);
}
subjecttemp = {
  username: nowUsername,
  term: "",
  subjectall: []
}
//----------------------------------------------------------------------------------------------------
var MoneyManage = [];
var money = fs.readFileSync("./database/TimeManage.json");
if (money) {
  MoneyManage = JSON.parse(money);
}
//----------------------------------------------------------------------------------------------------

app.use(cors());

//----------------------------------------------------------------------------------------------------
var corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200
};
//----------------------------------------------------------------------------------------------------

app.use(bodyParser.json());


//-----------------------------------Login-----------------------------------------------------------------
app.post("/Login", cors(corsOptions), function (req, res, next) {
  // console.log(req.body.username);
  // console.log(req.body.password);
  Student.forEach(item => {
    if (item.username == req.body.username && item.password == req.body.password) {
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


//----------------------------------Register------------------------------------------------------------------
app.post("/Register", cors(corsOptions), function (req, res, next) {
  // console.log(req.body);
  if (req.body.check == "1") checkRegister = false;
  Student.forEach(item => {
    if (Object.keys(req.body.fullname).length == 0 || Object.keys(req.body.MSSV).length == 0 || Object.keys(req.body.username).length == 0 || Object.keys(req.body.password).length == 0 || Object.keys(req.body.startterm).length == 0 || Object.keys(req.body.major).length == 0) {
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
    // nowUsername = req.body.username;
    var Regis = fs.writeFileSync("./database/Student.json", JSON.stringify(Student), function (err) {
      if (err) throw err;
      // console.log(Student)
    });
  }
});


//------------------------------------Dashboard----------------------------------------------------------------
app.post("/Dashboard", cors(corsOptions), function (req, res, next) {
  // console.log("tên đăng nhập:" + nowUsername);

  Student.forEach(item => {
    if (item.username === nowUsername) {
      res.send(item.fullname);
      // console.log(item.fullname);
    }
  })
  // console.log(req.body.checkLogout);
  if (req.body.checkLogout == "1") {
    checkLogin = false;
  }
});


//--------------------------------------Information--------------------------------------------------------------
app.post("/Information", cors(corsOptions), function (req, res, next) {
  Student.forEach(item => {
    if (item.username === nowUsername) {
      res.send(item);
      // console.log(item);
    }
  })
});


//-----------------------------------------ChangeInfor-----------------------------------------------------------
app.post("/ChangeInfor", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  if (req.body.check == "1") changeProfile = false;
  if (Object.keys(req.body.fullname).length == 0 || Object.keys(req.body.MSSV).length == 0 || Object.keys(req.body.startterm).length == 0 || Object.keys(req.body.major).length == 0) {
    res.send("0");
    changeProfile = true;
  }
  if (!changeProfile) {
    res.send("1");
    Student.forEach((item, index) => {
      if (item.username == nowUsername) {
        studenttemp.username = nowUsername;
        studenttemp.fullname = req.body.fullname;
        studenttemp.password = nowPassword;
        studenttemp.MSSV = req.body.MSSV;
        studenttemp.startterm = req.body.startterm;
        studenttemp.major = req.body.major;
        Student.splice(index, 1);
        console.log(item.username);
      }
    })
    Student.push(studenttemp);
    var Regis = fs.writeFileSync("./database/Student.json", JSON.stringify(Student), function (err) {
      if (err) throw err;
      console.log(Student);
    });
  }
});


//----------------------------------------ChangePassword------------------------------------------------------------
app.post("/ChangePassword", cors(corsOptions), function (req, res, next) {
  if (req.body.check == "1") changePass = false;
  console.log(req.body);
  if (Object.keys(req.body.oldpass).length == 0 || Object.keys(req.body.newpass).length == 0 || Object.keys(req.body.confirmpass).length == 0) {
    // if (Object.keys(req.body.oldpass).length == 0 || Object.keys(req.body.newpass).length == 0 || Object.keys(req.body.confirmpass).length == 0) {
    res.send("0");
    changePass = true;
  }
  if (req.body.oldpass != nowPassword) {
    res.send("1");
    changePass = true;
  }
  if (req.body.newpass != req.body.confirmpass) {
    res.send("2")
    changePass = true;
  }
  if (!changePass) {
    res.send("3");
    Student.forEach((item, index) => {
      if (item.username == nowUsername) {
        studenttemp.username = nowUsername;
        studenttemp.fullname = item.fullname;
        studenttemp.password = req.body.confirmpass;
        studenttemp.MSSV = item.MSSV;
        studenttemp.startterm = item.startterm;
        studenttemp.major = item.major;
        console.log(item.password);
        Student.splice(index, 1);
        nowPassword = studenttemp.password;
      }
    })
    Student.push(studenttemp);
    var Regis = fs.writeFileSync("./database/Student.json", JSON.stringify(Student), function (err) {
      if (err) throw err;
      console.log(Student);
    });
  }
});


//---------------------------------------SubjectMarkManage-------------------------------------------------------------
app.post("/SubjectMarkManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var Sub = req.body;
  SubjectTerm.push(Sub);
  res.send("1");
  var SubList = fs.writeFileSync("./database/SubjectMarkTerm.json", JSON.stringify(SubjectTerm), function (err) {
    if (err) throw err;
    console.log(SubjectTerm);
  })
  // switch (req.body.check) {
  //   case "0":
  //     AllSubject.forEach(item => {
  //       if (req.body.id != item.id) {
  //         res.send("0");
  //       }
  //       else {
  // AllSubject.forEach(item => {
  //   if (item.id == req.body.id) {
  //     res.send(item);
  //     console.log(item)
  //   }
  // })
  //       }
  //     })
  //     break;
  //   case "1":
  //     subjecttemp.term = req.body.term;
  //     subjecttemp.subject.push(req.body.subject);
  //     SubjectTerm.push(subjecttemp);
  //     var sub = fs.writeFileSync("./database/SubjectTerm.json", JSON.stringify(SubjectTerm), function (err) {
  //       if (err) throw err;
  //       console.log(SubjectTerm);
  //     })
  //     res.send(subjecttemp.subject);
  //   case "2":
  //     SubjectTerm.forEach((item, index) => {
  //       if (item.subjectall.subjectname == req.body.subjectlist.subjectname){

  //       }
  //     })
  // }
});


//-------------------------------------------TimeManage---------------------------------------------------------
app.post("/TimeManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var timereq = JSON.stringify(req.body)
  var timeMa = fs.appendFileSync("./database/TimeManage.json", timereq, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  res.send("1");
});


//--------------------------------------------MoneyManage--------------------------------------------------------

//--------------------------------------------MoneyTermManage--------------------------------------------------------
app.post("/MoneyTermManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  // var MoTerm = []
  // var motermreq = fs.readFileSync("./database/MoneyManage.json")
  // var moTermMa = fs.writeFileSync("./database/MoneyManage.json", moneyreq, function (err) {
  //   if (err) throw err;
  //   console.log("Saved!");
  // });
  res.send("1");
});
//--------------------------------------------MoneyMonthManage--------------------------------------------------------
app.post("/MoneyMonthManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  // var momonthreq = JSON.stringify(req.body)
  // var moMonthMa = fs.writeFileSync("./database/MoneyManage.json", moneyreq, function (err) {
  //   if (err) throw err;
  //   console.log("Saved!");
  // });
  res.send("1");
});


//----------------------------------------------------------------------------------------------------
app.post("/MarkManage", cors(corsOptions), function (req, res, next) {
  res.send("Hello");
  console.log(req.body);
});


//----------------------------------------------------------------------------------------------------
app.post("/MarkChart", cors(corsOptions), function (req, res, next) {
  res.send("Hello");
});


//----------------------------------------------------------------------------------------------------
app.post("/MoneyChart", cors(corsOptions), function (req, res, next) {
  res.send("Hello");
});


//----------------------------------------------------------------------------------------------------
app.post("/TimeChart", cors(corsOptions), function (req, res, next) {
  var timeCha = fs.readFileSync("./database/TimeManage.json");
  var tiCha = JSON.parse(timeCha);
  res.send(tiCha);
  console.log(tiCha);
});


//----------------------------------------------------------------------------------------------------


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(
    "Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s",
    host,
    port
  );
});
