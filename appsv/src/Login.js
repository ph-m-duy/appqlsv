var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var cors = require("cors");
var user = require("./User");

app.use(cors());


var corsOptions = {
    body: "*",
    origin: "*",
    optionsSuccessStatus: 200
};


app.use(bodyParser.json());



// var nowUsername = "";
// var nowPassword = "";
// var nowPosition = "";
// var nowId = "";
// var nowWeek = "";
// var nowTerm = "";
// var checkLogin = false;

class Login {
    constructor() {
           
    }


    beginLogin(app) {
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
            // this.Student.forEach(item => {
            //     if (item.username == nowUsername) {
            //         nowId = item.id;
            //     }
            // })
        });       
        // return nowUsername;
    }



    // getNowUser(_nowUsername) {
    //     var nowUsername = "trà bồn";
    //     _nowUsername = nowUsername;
    //     // _nowUsername = "abcd";
    //     return _nowUsername;
    // }


    // getTry(_nUsername, nWeek, nTerm){
    //     nUsername = "duy";
    //     nWeek = "Tuần 1";
    //     nTerm = "20192"
    // }

}

const login = new Login();

module.exports = login;