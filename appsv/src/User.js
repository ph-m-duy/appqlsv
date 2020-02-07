var fs = require("fs");
var uId = require('uuid/v1');
var userparent;
var recentinfor;

class User {
    constructor() {
        var profile = fs.readFileSync("./database/Student.json");
        if (profile) {
            this.Student = JSON.parse(profile);
        } else
            this.Student = [];
    }

    spSaveDataWithJSON() {
        fs.writeFileSync("./database/Student.json", JSON.stringify(this.Student), function (err) {
            if (err) throw err;
            console.log("Complete!");
        });
    }

    spSaveDataWithMySQL() {

    }

    createNewUser(user) {
        user.id = uId();
        user.position = "Student";
        this.Student.push(user);
        this.spSaveDataWithJSON();
    }

    createPaNewUser(user) {
        userparent = JSON.parse(JSON.stringify(user));
        userparent.password = "123";
        userparent.position = "Parent";
        this.Student.push(userparent);
        this.spSaveDataWithJSON();
    }

    updateUser(userName, newData) {
        var index = this.Student.findIndex(user => {
            return userName === user.username;
        })

        if (index >= 0) {
            this.Student[index] = newData;
            this.spSaveDataWithJSON();
        }
    }

    changeUser(user, newData) {
        recentinfor = user;
        user = JSON.parse(JSON.stringify(newData));
        user.id = recentinfor.id;
        user.position = recentinfor.position;
        user.username = recentinfor.username;
        user.password = recentinfor.password;
        return user;
    }

    changePassWord(userName, newData) {
        var index = this.Student.findIndex(user => {
            return userName === user.username;
        })

        if (index >= 0) {
            this.Student[index].passWord = newData;
            this.spSaveDataWithJSON();
        }
    }

    positionLogin(userName, passWord, position) {
        var index = this.Student.findIndex(user => {
            return userName === user.username && passWord === user.password && position === user.position;
        })
        return index;
    }

    readUser(userName) {
        var index = this.Student.findIndex(user => {
            return userName === user.username;
        })

        return this.Student[index];
    }

    deleteUser(user) {

    }

    countUser(){
        
    }
}

const user = new User();

module.exports = user;