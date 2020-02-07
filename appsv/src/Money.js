var fs = require("fs");
var MonStuMan;
var MonPaMan;

class Money {
    constructor() {
        var moneystumanage = fs.readFileSync("./database/MoneyStuManage.json");
        var moneypamanage = fs.readFileSync("./database/MoneyPaManage.json");

        if (moneystumanage) {
            this.MoneyStuMa = JSON.parse(moneystumanage);
        }
        else {
            this.MoneyStuMa = [];
        }

        if (moneypamanage) {
            this.MoneyPaMa = JSON.parse(moneypamanage);
        }
        else {
            this.MoneyPaMa = [];
        }
    }

    spSaveStuDataWithJSON() {
        fs.writeFileSync("./database/MoneyStuManage.json", JSON.stringify(this.MoneyStuMa), function (err) {
            if (err) throw err;
            console.log("Complete!");
        });
    }

    spSavePaDataWithJSON() {
        fs.writeFileSync("./database/MoneyPaManage.json", JSON.stringify(this.MoneyPaMa), function (err) {
            if (err) throw err;
            console.log("Complete!");
        });
    }

    updatePaMoneyMa(money, username, id) {
        var allmoney = money.olaymoney + money.addlearnmoney;
        MonPaMan.username = username;
        MonPaMan.id = id;
        MonPaMan = money;
        MonPaMan.allmoney = allmoney;
        this.MoneyPaMa.push(MonPaMan);
        this.spSavePaDataWithJSON();
    }

    updateStumoneyMa(money, username, id) {
        var savemoney = money.allmoney - money.lostmoney;
        MonStuMan.username = username;
        MonStuMan.id = id;
        MonStuMan = money;
        MonStuMan.savemoney = savemoney;
        this.MoneyStuMa.push(MonStuMan);
        this.spSaveStuDataWithJSON();
    }

    checkPaStuMan(term, username) {
        var index = this.MoneyPaMa.findIndex(money => {
            return term === money.term && username === money.username;
        })
        return this.MoneyPaMa[index];
    }
}

const money = new Money();

module.exports = money;