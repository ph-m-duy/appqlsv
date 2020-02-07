import React from "react";
import request from "request";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addSubject: [],
      fullSubject: [],
      subjectname: "",
      id: ""
    };
  }

  upList = (_addSubject) => {
    // subResList = (setSubject, addSubject, _id) => {
    var options = {
      method: 'POST',
      url: 'http://localhost:8081/AddSubject',
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
      body: JSON.stringify({
        addSubject: _addSubject,
        upListflag: 1
      })
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    });
  }


  updateVal = (e, val) => {
    switch (val) {
      case "id":
        this.setState({
          id: e.target.value
        })
        break;
      case "subject":
        this.setState({
          subjectname: e.target.value
        })
        break;
      default:
    }
  }


  addSub = () => {
    return (
      <div className="addSub">
        <p>Nhập mã môn học muốn thêm: &nbsp;
        <input type="text" value={this.state.id} onChange={e => this.updateVal(e, "id")} /></p>
        <p>Nhập tên môn học muốn thêm: &nbsp;
        <input type="text" value={this.state.subjectname} onChange={e => this.updateVal(e, "subject")} /></p>
        <input type="button" value="Thêm" onClick={() => this.confirmUpSubject()} />
      </div>
    )
  }


  confirmUpSubject = () => {
    if (window.confirm("Xác nhận thêm môn học ???")) {
      const newsubject = {
        id: this.state.id,
        subjectname: this.state.subjectname
      }
      this.setState({
        addSubject: this.state.addSubject.push(newsubject)
      })
      alert("Môn học đã được thêm vào cuối danh sách.")
    }
  }

  deleteSubject = (id) => {

    if (window.confirm("Bạn có chắc muốn xóa môn học này ra khỏi danh sách không??")) {
      this.state.addSubject.forEach((item, index) => {
        if (item.id === id) {
          this.state.addSubject.splice(index, 1);
        }
      })
      this.setState({
        addSubject: this.state.addSubject
      })
      alert("Môn học đã được xóa khỏi danh sách");
    }
  }

  listSubject = () => {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Mã môn học</th>
              <th>Tên môn học</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {this.state.addSubject.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.subjectname}</td>
                <td><input type="button" value="Xóa" onClick={() => this.deleteSubject(item.id)} /></td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    )
  }

  updateList = () => {
    if (window.confirm("Xác nhận cập nhật danh sách các môn học??")) {
      this.upList(this.state.addSubject);
      alert("Danh sách đã được update thành công!!!");
    }
  }

  render() {
    var allsub = this.props.sublist;
    this.state.addSubject = allsub;
    return (
      <div>
        <div className="addSubject">
          {this.addSub()}
          <input type="button" value="Cập nhật danh sách" onClick={() => this.updateList()} />
          <p>Danh sách tất cả các môn học</p>
          {this.listSubject()}
        </div>
      </div>
    );
  }
}
