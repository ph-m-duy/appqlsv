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

    register = (checkEmpty, checkOld, checkSame, successRegister, _oldpass, _newpass, _confirmpass) => {
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
        return (
            <div>
                {this.props.upRegister()}
            </div>
        )
    }

    updateVal = (val, e) => {
        let _val = e.target.value
        switch (val) {
            case "fullname":
                this.setState({
                    fullname: _val
                })
                break;
            case "username":
                this.setState({
                    username: _val
                })
                break;
        }
    }

    formChangePass = () => {
        return (
            <div>
                <form className="changePass">

                    <p className="Cp">Mật khẩu hiện tại</p>
                    <input type="text" value={this.state.oldpass} onChange={e => this.updateVal("fullname", e)}  ></input>

                    <p className="Cp">Mật khẩu mới</p>
                    <input type="text" value={this.state.newpass} onChange={e => this.updateVal("MSSV", e)}   ></input>

                    <p className="Cp">Xác nhận lại mật khẩu mới</p>
                    <input type="text" value={this.state.confirmpass} onChange={e => this.updateVal("username", e)}  ></input>

                    <div className="SignPass" >
                        <input type="button"
                            value="Xác nhận"
                            onClick={() => { this.register(this.checkempty, this.checksame, this.successRegister, this.state.fullname, this.state.username, this.state.password, this.state.MSSV, this.state.startterm, this.state.major); }} />
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
