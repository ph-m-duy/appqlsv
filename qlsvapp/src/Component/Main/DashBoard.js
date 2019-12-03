import React from "react";
import request from "request";
import Home from "../Content/Support/Home";
import InforStudent from "../Content/StudentInfor/InforStudent";
import ChangePassword from "../Content/StudentInfor/ChangePassword";
import TermSubject from "../Content/StudentInfor/TermSubject";
import TimeManage from "../Content/TimeManage/TimeManage";
import MoneyManage from "../Content/MoneyManage/MoneyManage";
import MarkManage from "../Content/MarkManage/MarkManage";
import TimeChart from "../Content/Chart/TimeChart";
import MoneyChart from "../Content/Chart/MoneyChart";
import MarkChart from "../Content/Chart/MarkChart";
import Contact from "../Content/Support/Contact";
import AboutUs from "../Content/Support/AboutUs";

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: 0,
      fullname: ""
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
      callname(body);
    });
  };

  callname = _name => {
    this.setState({
      fullname: _name
    });
  };

  updateContentState = state => {
    this.setState({ contentState: state });
  };

  renderContent = () => {
    switch (this.state.contentState) {
      case 1.1:
        return (
          <div className="ql">
            <InforStudent />
          </div>
        );
      case 1.2:
        return (
          <div className="ql">
            <ChangePassword />
          </div>
        );
      case 1.3:
        return (
          <div className="ql">
            <TermSubject />
          </div>
        );
      case 2.1:
        return (
          <div className="ql">
            <TimeManage />
          </div>
        );
      case 2.2:
        return (
          <div className="ql">
            <MoneyManage />
          </div>
        );
      case 2.3:
        return (
          <div className="ql">
            <MarkManage />
          </div>
        );
      case 3.1:
        return (
          <div className="ql">
            <TimeChart />
          </div>
        );
      case 3.2:
        return (
          <div className="ql">
            <MoneyChart />
          </div>
        );
      case 3.3:
        return (
          <div className="ql">
            <MarkChart />
          </div>
        );
      case 4:
        return (
          <div className="ql">
            <Contact />
          </div>
        );
      case 5:
        return (
          <div className="ql">
            <AboutUs />
          </div>
        );
      default:
        return (
          <div className="ql">
            <Home />
          </div>
        );
    }
  };

  checkLogout = () => {

  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            <h1>TRANG QUẢN LÍ THEO DÕI VÀ TÍNH KPI SINH VIÊN</h1>
          </div>
          <div className="s1">
            <p>Học kỳ 20191,tuần thứ 13,ngày 19 tháng 11 năm 2019</p>
          </div>
          <div className="body">
            <div className="Hello">Xin chào, {this.state.fullname}</div>
            <input className="logout" type="button" value="ĐĂNG XUẤT" onClick={() => { this.props.updateLogout(); }} />
            <div className="menu">
              <ul>
                <li>
                  <div className="SP">
                    <input type="button" value="TRANG CHỦ" onClick={() => { this.updateContentState(0); }} />
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="THÔNG TIN SV" ></input>
                    <div className="sp">
                      <input type="button" value="THÔNG TIN CÁ NHÂN" onClick={() => { this.updateContentState(1.1); }} />
                      <input type="button" value="THAY ĐỔI MẬT KHẨU" onClick={() => { this.updateContentState(1.2); }} />
                      <input type="button" value="DANH SÁCH MÔN HỌC" onClick={() => this.updateContentState(1.3)} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="QUẢN LÍ SV" ></input>
                    <div className="sp">
                      <input type="button" value="QUẢN LÍ THỜI GIAN" onClick={() => { this.updateContentState(2.1); }} />
                      <input type="button" value="QUẢN LÍ CHI TIÊU" onClick={() => { this.updateContentState(2.2); }} />
                      <input type="button" value="QUẢN LÍ ĐIỂM DỰ KIẾN" onClick={() => { this.updateContentState(2.3); }} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="SP">
                    <input type="button" value="BIỂU ĐỒ QUẢN LÍ" ></input>
                    <div className="sp">
                      <input type="button" value="BIỂU ĐỒ THỜI GIAN" onClick={() => { this.updateContentState(3.1); }} />
                      <input type="button" value="BIỂU ĐỒ CHI TIÊU" onClick={() => { this.updateContentState(3.2); }} />
                      <input type="button" value="BIỂU ĐỒ ĐIỂM SỐ" onClick={() => { this.updateContentState(3.3); }} />
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
      </div>
    );
  }
}
