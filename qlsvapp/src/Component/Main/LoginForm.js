import React from "react";
import request from "request";


export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      wLogin: false,
      position: "",
      username: "",
      password: ""
    };
  }

  login = (callback, callbackError, _position, _username, _password) => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/Login",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        Host: "localhost:8081",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        position: _position,
        username: _username,
        password: _password
      })
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
      if (body === "0") callbackError();
      else callback(body);
    });
  };

  positionLogin = (pos) => {
    switch (pos) {
      case "1": return (<div>{this.props.upStuLogin()}</div>);
      case "2": return (<div>{this.props.upPaLogin()}</div>);
      case "3": return (<div>{this.props.upAdLogin()}</div>);
      case "-1": return (alert("Bạn chưa chọn chức năng đăng nhập !!!"));
      default:
    }
  }

  wReset = () => {
    this.setState({
      wLogin: true
    });
  };

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handlePosChange = (e) => {
    this.setState({
      position: e.target.value
    })
  }

  selectUser = () => {
    return (
      <div>
        <select position={this.state.value} onChange={this.handlePosChange}>
          <option value="">Chọn chức năng</option>
          <option value="Student">Sinh viên</option>
          <option value="Parent">Phụ huynh</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    )
  }

  Wrong = () => {
    if (this.state.wLogin) {
      return (
        <div>
          <p>Mã số đăng nhập hoặc mật khẩu không đúng!</p>
        </div>
      );
    }
  };

  FormLogin = () => {
    return (
      <div>
        <form className="Login">
          <p className="lg">TÊN ĐĂNG NHẬP</p>
          <input type="text" onChange={this.handleUsernameChange} value={this.state.username} placeholder="Nhập MSSV" />
          <p className="lg">MẬT KHẨU</p>
          <input type="password" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Nhập CMND/Thẻ căn cước" />
          <br />
          {this.selectUser()}
          {/* <input type="button" value="Đăng nhập" onClick={() => { this.login(() => this.props.upLogin(), this.wReset, this.state.username, this.state.password); }} /> */}
          <input type="button" value="Đăng nhập" onClick={() => { this.login(this.positionLogin, this.wReset, this.state.position, this.state.username, this.state.password); }} />
          {this.Wrong()}
          <input type="button" value="Quên mật khẩu?" onClick={() => this.props.upforget()} />
          <p>Bạn chưa có tài khoản?</p>
          <input type="button" value="Đăng kí" onClick={() => this.props.upSignup()} />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h5>TRANG THEO DÕI QUẢN LÍ VÀ TÍNH KPI SINH VIÊN</h5>
        {this.FormLogin()}
      </div>
    )
  }
}
