import React from "react";

export default class Information extends React.Component {
  constructor(props) {
    super(props);
  }

  showInfor = () => {
    return (
      <div className="profile">
        <div className="infor">
          <p>Họ và tên: {this.props._fullname}</p>
          <p>MSSV:{this.props._MSSV}</p>
          <p>Giới tính: {this.props._sex}</p>
          <p>Chuyên ngành: {this.props._major}</p>
        </div>
        <div className="changInfor">
          <input type="button" value="Thay đổi Thông tin" onClick={() => this.props.chaSe()} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.showInfor()}
      </div>
    );
  }
}
