import React from "react";
import request from "request";

export default class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            code: ""
        };
    }

    register = (checkempty, checksame, callback, _fullname, _username, _password, _MSSV, _statterm, _major) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/Register",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                Host: "localhost:8081",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                check: "1",
                fullname: _fullname,
                username: _username,
                password: _password,
                MSSV: _MSSV,
                startterm: _statterm,
                major: _major
            }),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            if (body === "0") checkempty();
            else if (body === "1") checksame();
            else if (body === "2") callback();
        });
    };

    checkempty = () => {
        alert("Bạn không được để trống các ô!!!");
    }

    checksame = () => {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn một tên đăng nhập khác!!!!");
    }

    successRegister = () => {
        alert("Bạn đã đăng kí thành công!!!");
        return (
            <div>
                {this.props.upRegister()}
            </div>
        )
    }

    handleMailChange = () => {
        this.setState({
            email: this.state.email
        })
    }

    handleCodeChange = () => {
        this.setState({
            code: this.state.code
        })
    }

    sentMail = () => {
        return (
            <div>
                <p>Đã gửi mã xác nhận đến Email của Bạn</p>
                <input type="text" placeholder="Nhập Email" value={this.state.code} onChange={this.handleCodeChange} />
                <input type="button" value="Xác nhận" />
            </div>
        )
    }

    formForgetPass = () => {
        return (
            <div>
                <form className="ForgetPass">
                    <p className="RegisterHead">Quên mật khẩu của bạn</p>

                    <p className="rg">Nhập Email của bạn</p>
                    <input type="text" value={this.state.email} placeholder="Nhập Email" onChange={this.handleMailChange} />
                    <div className="Sign" >
                        <input type="button" value="Xác nhận" onClick={() => this.sentMail()} />
                    </div>
                    <div className="ReturnLogin" >
                        <input type="button" value="Trở lại trang Đăng nhập" onClick={() => this.props.upReturn()} />
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h5>TRANG THEO DÕI QUẢN LÍ VÀ TÍNH KPI SINH VIÊN</h5>
                {this.formForgetPass()}
            </div>
        )
    }
}
