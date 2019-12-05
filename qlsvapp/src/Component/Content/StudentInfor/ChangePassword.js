import React from "react";
import request from "request";

export default class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            oldpass: "",
            newpass: "",
            confirmpass: ""
        };
    }

    changePassWord = (checkEmpty, checkOld, checkSame, successRegister, _oldpass, _newpass, _confirmpass) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/ChangePassword",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                Host: "localhost:8081",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                check: "1",
                oldpass: _oldpass,
                newpass: _newpass,
                confirmpass: _confirmpass
            }),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            if (body === "0") checkEmpty();
            else if (body === "1") checkOld();
            else if (body === "2") checkSame();
            else if (body === "3") successRegister();
        });
    };

    checkEmpty = () => {
        alert("Bạn không được để trống các ô!!!");
    }

    checkOld = () => {
        alert("Mật khẩu hiện tại chưa đúng!!!");
    }

    checkSame = () => {
        alert("Mật khẩu xác nhận không khớp!!!");
    }

    successRegister = () => {
        alert("Bạn đã cập nhật mật khẩu thành công!!!");
    }

    updateVal = (val, e) => {
        let _val = e.target.value
        switch (val) {
            case "oldpass":
                this.setState({
                    oldpass: _val
                })
                break;
            case "newpass":
                this.setState({
                    newpass: _val
                })
                break;
            case "confirmpass":
                this.setState({
                    confirmpass: _val
                })
                break;
            default:
        }
    }

    formChangePass = () => {
        return (
            <div>
                <form className="changePass">

                    <p className="Cp">Mật khẩu hiện tại</p>
                    <input type="password" value={this.state.oldpass} onChange={e => this.updateVal("oldpass", e)}  ></input>

                    <p className="Cp">Mật khẩu mới</p>
                    <input type="password" value={this.state.newpass} onChange={e => this.updateVal("newpass", e)}   ></input>

                    <p className="Cp">Xác nhận lại mật khẩu mới</p>
                    <input type="password" value={this.state.confirmpass} onChange={e => this.updateVal("confirmpass", e)}  ></input>

                    <div className="SignPass" >
                        <input type="button"
                            value="Xác nhận"
                            onClick={() => { this.changePassWord(this.checkEmpty, this.checkOld, this.checkSame, this.successRegister, this.state.oldpass, this.state.newpass, this.state.confirmpass); }} />
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h5>THAY ĐỔI MẬT KHẨU</h5>
                {this.formChangePass()}
            </div>
        )
    }
}
