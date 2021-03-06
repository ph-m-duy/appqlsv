import React from "react";
import request from "request";

export default class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fullname: "",
            username: "",
            password: "",
            MSSV: "",
            sex: "",
            major: ""
        };
    }

    register = (checkempty, checksame, callback, _fullname, _username, _password, _MSSV, _sex, _major) => {
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
                sex: _sex,
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
            case "password":
                this.setState({
                    password: _val
                })
                break;
            case "MSSV":
                this.setState({
                    MSSV: _val
                })
                break;
            case "sex":
                this.setState({
                    sex: _val
                })
                break;
            case "major":
                this.setState({
                    major: _val
                })
                break;
            default:
        }
    }

    FormRegister = () => {
        return (
            <div>
                <form className="Register">
                    <p className="RegisterHead">Điền thông tin của bạn</p>

                    <p className="rg">Họ và tên</p>
                    <input type="text" value={this.state.fullname} onChange={e => this.updateVal("fullname", e)}  ></input>

                    <p className="rg">Mã số Sinh viên</p>
                    <input type="text" value={this.state.MSSV} onChange={e => this.updateVal("MSSV", e)}   ></input>

                    <p className="rg">Giới tính</p>
                    <select sex={this.state.value} onChange={e => this.updateVal("sex", e)}>
                        <option value="">Chọn giới tính</option>
                        <option value="nam">nam</option>
                        <option value="nữ">nữ</option>
                    </select>

                    <p className="rg">Tên đăng nhập</p>
                    <input type="text" value={this.state.username} onChange={e => this.updateVal("username", e)}  ></input>

                    <p className="rg">Mật khẩu</p>
                    <input type="password" value={this.state.password} onChange={e => this.updateVal("password", e)}  ></input>

                    <p className="rg">Ngành học</p>
                    <input type="text" value={this.state.major} onChange={e => this.updateVal("major", e)} ></input>

                    <div className="Sign" >
                        <input type="button"
                            value="Đăng kí"
                            onClick={() => { this.register(this.checkempty, this.checksame, this.successRegister, this.state.fullname, this.state.username, this.state.password, this.state.MSSV, this.state.sex, this.state.major); }} />
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
                {this.FormRegister()}
            </div>
        )
    }
}
