import React from "react";
import request from "request";

export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      MSSV: "",
      startterm: "",
      major: ""
    };
  }

  Infor = Profile => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/Information",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Content-Length": "15",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8081",
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({}),
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var bod =JSON.parse(body);
      if (bod) Profile(bod.fullname, bod.MSSV, bod.startterm, bod.major);
    });
  };

  UNSAFE_componentWillMount = () => {
    this.Infor(this.Profile);
  };

  Profile = (_fullname, _MSSV, _startterm, _major) => {
    this.setState({
      fullname: _fullname,
      MSSV: _MSSV,
      startterm: _startterm,
      major: _major
    });
  };

  render() {
    return (
      <div className="profile">
        <div className="infor">
          {this.Infor(this.Profile)}
          <p>Họ và tên: {this.state.fullname}</p>
          <p>MSSV:{this.state.MSSV}</p>
          <p>Kỳ học bắt đầu: {this.state.startterm}</p>
          <p>Chuyên ngành: {this.state.major}</p>
        </div>
        <div className="changInfor">
          <input type="button" value="Thay đổi Thông tin" onClick={() => this.props.chaSe()} />
        </div>
      </div>
    );
  }
}
