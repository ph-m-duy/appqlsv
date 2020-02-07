import React from "react";
import request from "request";
import Home from "../Content/Support/Home";
import InforStudent from "../Content/StudentInfor/InforStudent";
import ChangePassword from "../Content/StudentInfor/ChangePassword";
import TimeManage from "../Content/TimeManage/TimeManage";
import MoneyManage from "../Content/MoneyManage/MoneyManage";
import MarkSubManage from "../Content/MarkManage/MarkSubManage";
import TimeKPI from "../Content/TimeKPI/TimeKPI";
import MoneyKPI from "../Content/MoneyKPI/MoneyKPI";
import MarkKPI from "../Content/MarkKPI/MarkKPI";
import Contact from "../Content/Support/Contact";
import AboutUs from "../Content/Support/AboutUs";
import moment from "moment";

export default class StudentDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: 0,
      fullname: "",
      week: "",
      term: ""
    };
  }

  UNSAFE_componentWillMount = () => {
    this.Hello(this.callname);
  };

  Hello = callname => {
    var options = {
      method: "POST",
      url: "http://localhost:8081/DashBoard",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Content-Length": "0",
        "Accept-Encoding": "gzip, deflate",
        Host: "localhost:8081",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkLogout: "1"
      }),
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var bod = JSON.parse(body);
      console.log(bod);
      console.log(bod.name);
      callname(bod.name, bod.week, bod.term);
    });
  };

  callname = (_name, _week, _term) => {
    this.setState({
      fullname: _name,
      week: _week,
      term: _term
    });
  };

  updateContentState = state => {
    this.setState({ contentState: state });
  };

  renderContent = () => {
    switch (this.state.contentState) {
      case 1.1: return (<div className="ql"><InforStudent nowterm={this.state.term} /></div>);
      case 1.2: return (<div className="ql"><ChangePassword nowterm={this.state.term} /></div>);
      case 2.1: return (<div className="ql"><TimeManage nowterm={this.state.term} nowweek={this.state.week} /></div>);
      case 2.2: return (<div className="ql"><MoneyManage nowterm={this.state.term} /></div>);
      case 2.3: return (<div className="ql"><MarkSubManage nowterm={this.state.term} /></div>);
      case 3.1: return (<div className="ql"><TimeKPI nowterm={this.state.term} /></div>);
      case 3.2: return (<div className="ql"><MoneyKPI nowterm={this.state.term} /></div>);
      case 3.3: return (<div className="ql"><MarkKPI nowterm={this.state.term} /></div>);
      case 4: return (<div className="ql"><Contact /></div>);
      case 5: return (<div className="ql"><AboutUs /></div>);
      default: return (<div className="ql"><Home /></div>);
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            <h1>TRANG QUẢN LÍ THEO DÕI VÀ TÍNH KPI SINH VIÊN</h1>
          </div>
          <div className="s1">
            <p>Học kỳ {this.state.term},{this.state.week}, {moment().format('dddd')} ngày {moment().format('DD/MM/YYYY')}</p>
          </div>
          <div className="body">
            <div className="Hello">Xin chào, {this.state.fullname}</div>
            <input className="logout" type="button" value="ĐĂNG XUẤT" onClick={() => { this.props.updateLogout(); }} />
            <input className="changepass" type="button" value="ĐỔI MẬT KHẨU" onClick={() => { this.updateContentState(1.2) }} />
            <div className="menu">
              <ul>
                <li>
                  <div className="SP">
                    <input type="button" value="TRANG CHỦ" onClick={() => { this.updateContentState(0); }} />
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="THÔNG TIN SV" onClick={() => { this.updateContentState(1.1) }} />
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="QUẢN LÍ SV" ></input>
                    <div className="sp">
                      <input type="button" value="QUẢN LÍ THỜI GIAN" onClick={() => { this.updateContentState(2.1); }} />
                      <input type="button" value="QUẢN LÍ CHI TIÊU" onClick={() => { this.updateContentState(2.2); }} />
                      <input type="button" value="QUẢN LÍ MÔN HỌC" onClick={() => { this.updateContentState(2.3); }} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="TÍNH KPI SV" ></input>
                    <div className="sp">
                      <input type="button" value="KPI THỜI GIAN" onClick={() => { this.updateContentState(3.1); }} />
                      <input type="button" value="KPI CHI TIÊU" onClick={() => { this.updateContentState(3.2); }} />
                      <input type="button" value="KPI ĐIỂM SỐ" onClick={() => { this.updateContentState(3.3); }} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="LIÊN HỆ" onClick={() => { this.updateContentState(4); }} />
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="GIỚI THIỆU" onClick={() => { this.updateContentState(5); }} />
                  </div>
                </li>
              </ul>
            </div>
            {this.renderContent()}
          </div>
          <div className="s2"></div>

          <div className="footer">
            <p>Trang theo dõi quản lí và tính KPI Sinh Viên ver 1.0</p>
            <p>Design by Project 1-<a href="https://www.facebook.com/thoiloanhhung">Phạm Duy</a>- Đại học Bách khoa Hà Nội</p>
            <p>
              Hanoi University of Science and Technology - No. 1, Dai Co Viet
              Str., Hanoi, Vietnam
            </p>
          </div>
        </div>
      </div >
    );
  }
}
