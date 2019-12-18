import React from "react";
import request from "request";

export default class TManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }


  MarkManage = () => {
    var options = {
      method: 'POST',
      url: 'http://localhost:8081/MarkManage',
      headers:
      {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Length': '0',
        'Accept-Encoding': 'gzip, deflate',
        Host: 'localhost:8081',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body:{

      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
  }

  handleChange = event => {
    this.setState({
      mark: event.target.value
    })

  }

  chooseMark = (val) => {
    switch (val) {
      case "Ngày": return (<div><p>Quản lí thời gian theo Ngày</p></div>);
      case "Tuần": return (<div><p>Quản lí thời gian theo Tuần</p></div>);
      case "Tháng": return (<div><p>Quản lí thời gian theo Tháng</p></div>);
      case "Kì": return (<div><p>Quản lí thời gian theo Kì</p></div>);
      default:
    }
  }

  chooseSelectMark = () => {
    var allterm = ["20141", "20142", "20151", "20152", "20161", "20162", "20171", "20172", "20181", "20182", "20191", "20192"];
    return (
      <div>
        <p>Chọn Kì học của bạn:</p>
        <select term={this.state.value} onChange={this.handleChange} >
          <option val="">Chọn Kì</option>
          {
            allterm.map((item, index) => {
              return (
                <option key={index} value={item}>{item}</option>
              )
            })
          }
        </select>
      </div>
    )
  }

  render() {
    return (
      <div >
        <h3>QUẢN LÍ ĐIỂM DỰ KIẾN SINH VIÊN - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
        {this.chooseSelectMark()}
      </div>
    );
  }
}
