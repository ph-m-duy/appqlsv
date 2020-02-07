var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var cors = require("cors");
var user = require("./src/User");
var money = require("./src/Money");
var login = require("./src/Login");
var dashboard = require("./src/DashBoard");
//----------------------------------------------------------------------------------------------------
var checkLogin = false;
var checkRegister = false;
var changeProfile = false;
var changePass = false;
var nowUsername = "";
var nowPassword = "";
var nowPosition = "";
var nowId = "";
var nowTerm = "";
var nowWeek = "";
var OwnList;
var timecheck = false;
var markcheck = false;
var checkterm = false;
//----------------------------------------------------------------------------------------------------
var Student = [];
var profile = fs.readFileSync("./database/Student.json");
if (profile) {
  Student = JSON.parse(profile);
}
var studenttemp = {
  fullname: "",
  username: "",
  password: "",
  MSSV: "",
  sex: "",
  major: ""
}
// var studenttemp = Student[0];
console.log(studenttemp);
//----------------------------------------------------------------------------------------------------
var SubjectMarkTerm = [];
var subject = fs.readFileSync("./database/SubjectMarkTerm.json");
if (subject) {
  SubjectMarkTerm = JSON.parse(subject);
}
//----------------------------------------------------------------------------------------------------
var UpTerm = [];
var updateterm = fs.readFileSync("./database/UpdateTerm.json");
if (updateterm) {
  UpTerm = JSON.parse(updateterm);
}
// nowTerm = UpTerm.nowTerm;
// nowWeek = UpTerm.nowWeek;
//----------------------------------------------------------------------------------------------------
var TimeSche = [];
var timeMa = fs.readFileSync("./database/TimeScheduleManage.json");
if (timeMa) {
  TimeSche = JSON.parse(timeMa);
}
//----------------------------------------------------------------------------------------------------
var MoneyPaMa = [];
var PaMoney = fs.readFileSync("./database/MoneyPaManage.json");
if (PaMoney) {
  MoneyPaMa = JSON.parse(PaMoney);
}
//----------------------------------------------------------------------------------------------------
var MoneyStuMa = [];
var StuMoney = fs.readFileSync("./database/MoneyStuManage.json");
if (StuMoney) {
  MoneyStuMa = JSON.parse(StuMoney);
}
//----------------------------------------------------------------------------------------------------
var SubjectAllList = [];
var AllSubList = fs.readFileSync("./database/AllSubject.json")
if (AllSubList) {
  SubjectAllList = JSON.parse(AllSubList);
}
// console.log(SubjectAllList);
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
// nowUsername = login.beginLogin(app);
app.post("/Login", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var reqlog = req.body;
  var index = user.positionLogin(reqlog.username, reqlog.password, reqlog.position);
  console.log(index);
  if (index >= 0) {
      nowUsername = req.body.username;
      nowPassword = req.body.password;
      nowPosition = req.body.position;
      switch (reqlog.position) {
          case "": res.send("-1"); break;
          case "Student": res.send("1"); break;
          case "Parent": res.send("2"); break;
          case "Admin": res.send("3"); break;
          default: res.send("0"); break;
      }
  } else {
      if (reqlog.position === "") {
          res.send("-1");
      } else {
          res.send("0");
      }
  }
  Student.forEach(item => {
      if (item.username == nowUsername) {
          nowId = item.id;
      }
  })
});

//----------------------------------Register------------------------------------------------------------------
app.post("/Register", cors(corsOptions), function (req, res, next) {
  if (req.body.check == "1") {
    checkRegister = false;
  }
  if (Object.keys(req.body.fullname).length == 0 || Object.keys(req.body.MSSV).length == 0 || Object.keys(req.body.username).length == 0 || Object.keys(req.body.password).length == 0 || Object.keys(req.body.sex).length == 0 || Object.keys(req.body.major).length == 0) {
    res.send("0");
    checkRegister = true;
  }
  Student.forEach(item => {
    if (item.username == req.body.username) {
      res.send("1");
      checkRegister = true;
    }
  })
  if (checkRegister === false) {
    res.send("2");
    var userData = req.body;
    user.createNewUser(userData);
    user.createPaNewUser(userData);
  }
});


//------------------------------------Dashboard----------------------------------------------------------------
// dashboard.accessMainBoard(app, nowUsername, nowWeek, nowTerm);
app.post("/Dashboard", cors(corsOptions), function (req, res, next) {
  var termweek = { name: nowUsername, week: nowWeek, term: nowTerm };
  console.log(termweek);
  res.send(termweek);
  if (req.body.checkLogout == "1") {
    checkLogin = false;
  }
});


//------------------------------------AdminDashboard----------------------------------------------------------------
app.post("/AdminDashboard", cors(corsOptions), function (req, res, next) {
  // Student.forEach(item => {
  //   if (item.username === nowUsername) {
  //     res.send(item.fullname);
  //   }
  // })
  var list = { name: nowUsername, week: nowWeek, term: nowTerm, sublist: SubjectAllList, userslist: Student };
  console.log(list);
  res.send(list);
  if (req.body.checkLogout == "1") {
    checkLogin = false;
  }
});


//--------------------------------------Information--------------------------------------------------------------
app.post("/Information", cors(corsOptions), function (req, res, next) {
  // var info;
  if (req.body.check == "1") {
    Student.forEach(item => {
      if (item.username === nowUsername) {
        res.send(item);
        console.log(item);
      }
    })
  }
});


//-----------------------------------------ChangeInfor-----------------------------------------------------------
app.post("/ChangeInfor", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  if (req.body.check == "1") changeProfile = false;
  if (Object.keys(req.body.fullname).length == 0 || Object.keys(req.body.MSSV).length == 0 || Object.keys(req.body.sex).length == 0 || Object.keys(req.body.major).length == 0) {
    res.send("0");
    changeProfile = true;
  }
  if (changeProfile == false) {
    var changeuser = user.readUser(nowUsername);
    changeuser = user.changeUser(changeuser, req.body);
    console.log(changeuser);
    user.updateUser(nowUsername, changeuser);
    res.send("1");
  }
});


//----------------------------------------ChangePassword------------------------------------------------------------
app.post("/ChangePassword", cors(corsOptions), function (req, res, next) {
  if (req.body.check == "1") changePass = false;
  console.log(req.body);
  if (Object.keys(req.body.oldpass).length == 0 || Object.keys(req.body.newpass).length == 0 || Object.keys(req.body.confirmpass).length == 0) {
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
  }
  if (changePass == false) {
    Student.forEach((item, index) => {
      if (item.username == nowUsername && item.position == nowPosition) {
        studenttemp = item;
        studenttemp.password = req.body.confirmpass;
        Student.splice(index, 1);
      }
    })
    Student.push(studenttemp);
    var stutemp = fs.writeFileSync("./database/Student.json", JSON.stringify(Student), function (err) {
      if (err) throw err;
      console.log(stutemp);
    })
  }
});


//---------------------------------------SubjectMarkManage-------------------------------------------------------------
app.post("/SubjectMarkManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var ownSub = req.body.sublist;
  subjecttemp = {
    username: nowUsername,
    ownerlist: ownSub
  }
  SubjectMarkTerm.forEach((item, index) => {
    if (item.username == nowUsername) {
      SubjectMarkTerm.splice(index, 1);
    }
  })
  SubjectMarkTerm.push(subjecttemp);
  res.send("1");
  var OwnSubList = fs.writeFileSync("./database/SubjectMarkTerm.json", JSON.stringify(SubjectMarkTerm), function (err) {
    if (err) throw err;
    console.log(SubjectMarkTerm);
  })
});


//---------------------------------------AllSubjectManage-------------------------------------------------------------
app.post("/AllSubjectManage", cors(corsOptions), function (req, res, next) {
  markcheck = false;
  SubjectMarkTerm.forEach(item => {
    if (item.username == nowUsername) {
      OwnList = item.ownerlist;
      markcheck = true;
    }
  })
  if (markcheck == false) { OwnList = []; }
  var AllSub = { AllSubject: SubjectAllList, SubjectOwnList: OwnList }
  res.send(AllSub);
  console.log(AllSub);
});


//-------------------------------------------TimeManage---------------------------------------------------------
app.post("/TimeManage", cors(corsOptions), function (req, res, next) {
  timecheck = false;
  TimeSche.forEach(item => {
    if (item.username == nowUsername) {
      MyScheList = item.schetilist;
      timecheck = true;
    }
  })
  if (timecheck == false) { MyScheList = []; }

  var ScheTi = { MySchedule: MyScheList }
  res.send(ScheTi);
  console.log(ScheTi);
});


//-------------------------------------------NewTDayManage---------------------------------------------------------
app.post("/NewTDayManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  var tischet = req.body.scheduletimelist
  var timeschetemp = {
    username: nowUsername,
    schetilist: tischet
  }
  TimeSche.forEach((item, index) => {
    if (item.username == nowUsername) {
      TimeSche.splice(index, 1);
    }
  })
  TimeSche.push(timeschetemp);
  res.send("1");
  var TiScheList = fs.writeFileSync("./database/TimeScheduleManage.json", JSON.stringify(TimeSche), function (err) {
    if (err) throw err;
    console.log(TiScheList);
  })
});


//--------------------------------------------MoMonthManage--------------------------------------------------------
app.post("/MoneyMonthManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  if (parseInt(req.body.olaymoney) == 0 || parseInt(req.body.addlearnmoney) == 0) {
    res.send("0");
  } else {
    var saver = parseInt(req.body.allmoney) + parseInt(req.body.addmoney) - parseInt(req.body.learnmoney) - parseInt(req.body.lostmoney);
    var savermoney = { recentmoney: saver };
    res.send(savermoney);
    console.log(savermoney);
    var StuMoMa = {
      username: nowUsername,
      termmoney: req.body.termmoney,
      olaymoney: req.body.olaymoney,
      addlearnmoney: req.body.addlearnmoney,
      allmoney: req.body.allmoney,
      addmoney: req.body.addmoney,
      learnmoney: req.body.learnmoney,
      lostmoney: req.body.lostmoney,
      recentmoney: saver
    }
    MoneyStuMa.push(StuMoMa);
    var StuMa = fs.writeFileSync("./database/MoneyStuManage.json", JSON.stringify(MoneyStuMa), function (err) {
      if (err) throw err;
      console.log(StuMa);
    })
  }
})


//--------------------------------------------MoneyManage--------------------------------------------------------
app.post("/MoneyManage", cors(corsOptions), function (req, res, next) {
  MoneyPaMa.forEach(item => {
    if (item.username == nowUsername) {
      res.send(item);
    }
  })
  res.send("0");
})


//--------------------------------------------PaMoneyManage--------------------------------------------------------
app.post("/PaMoneyManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  if (parseInt(req.body.termmoney) == 0) {
    res.send("0");
  } else {
    res.send("1");
  }
})


//--------------------------------------------ParentCheckManage--------------------------------------------------------
app.post("/ParentMoneyMonthManage", cors(corsOptions), function (req, res, next) {
  console.log(req.body);
  // console.log(typeof (allmoney));
  // var x = 10 - 2;
  // console.log(typeof (req.body.olaymoney));
  // console.log(parseInt(req.body.olaymoney));
  // console.log(x);
  // console.log(req.body.olaymoney);
  if (parseInt(req.body.olaymoney) == 0 || parseInt(req.body.addlearnmoney) == 0) {
    res.send("0");
  }
  else {
    var sum = parseInt(req.body.olaymoney) + parseInt(req.body.addlearnmoney);
    var summoney = { allmoney: sum };
    res.send(summoney);
    console.log(summoney);
    var PaMoMa = {
      username: nowUsername,
      termmoney: req.body.termmoney,
      olaymoney: req.body.olaymoney,
      addlearnmoney: req.body.addlearnmoney,
      allmoney: sum
    }
    MoneyPaMa.push(PaMoMa);
    var PaMa = fs.writeFileSync("./database/MoneyPaManage.json", JSON.stringify(MoneyPaMa), function (err) {
      if (err) throw err;
      console.log(PaMa);
    })
  }
});


//------------------------------------------UpdateTerm----------------------------------------------------------
app.post("/UpdateTerm", cors(corsOptions), function (req, res, next) {
  _nowTerm = req.body.nowterm;
  _nowWeek = req.body.nowweek;
  nowTerm = req.body.nowterm;
  nowWeek = req.body.nowweek;
  res.send("1");
  console.log(req.body);
  var upTermWeek = [{
    nowTerm: _nowTerm,
    nowWeek: _nowWeek
  }]
  var UpUp = fs.writeFileSync("./database/UpdateTerm.json", JSON.stringify(upTermWeek), function (err) {
    if (err) throw err;
    console.log(UpUp);
  })
});


//-----------------------------------------------ManageAccount-----------------------------------------------------
app.post("/ManageAccount", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
});


//-----------------------------------------------AddSubject-----------------------------------------------------
app.post("/AddSubject", cors(corsOptions), function (req, res, next) {
  res.send("1");
  // console.log(req.body);
  updateList = req.body.addSubject;
  var upList = fs.writeFileSync("./database/AllSubject.json", JSON.stringify(updateList), function (err) {
    if (err) throw err;
    console.log(upList);
  })
});


//-------------------------------------------------AccessCount---------------------------------------------------
app.post("/AccessCount", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
});


//----------------------------------------------------MoneyKPI------------------------------------------------
app.post("/MoneyKPI", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
});


//---------------------------------------------------MarkKPI-------------------------------------------------
app.post("/MarkKPI", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
});


//---------------------------------------------------TimeKPI-------------------------------------------------
app.post("/TimeKPI", cors(corsOptions), function (req, res, next) {
  res.send("1");
  console.log(req.body);
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
