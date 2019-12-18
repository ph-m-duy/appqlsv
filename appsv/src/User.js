var fs = require("fs");
var uId = require('uuid/v1');

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
        this.Student.push(user);
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

    readUser(user) {
        return "User";
    }

    deleteUser(user) {

    }
}

const user = new User();

module.exports = user;