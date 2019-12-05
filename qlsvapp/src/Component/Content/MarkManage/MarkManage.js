import React from "react";


export default class TManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marksub: ''
    };
  }

  handleChange = event => {
    this.setState({
      time: event.target.value
    })

  }

  chooseTime = (val) => {
    switch (val) {
      case "Ngày": return (<div><p>Quản lí thời gian theo Ngày</p></div>);
      case "Tuần": return (<div><p>Quản lí thời gian theo Tuần</p></div>);
      case "Tháng": return (<div><p>Quản lí thời gian theo Tháng</p></div>);
      case "Kì": return (<div><p>Quản lí thời gian theo Kì</p></div>);
      default:
    }
  }

  chooseSelectTime = () => {
    return (
      <div>
        <p>Chọn quản lí thời gian theo ngày,tuần,tháng,kì:</p>
        <select time={this.state.value} onChange={this.handleChange} >
          <option> Chọn</option>
          <option value="Ngày">Quản lí theo ngày</option>
          <option value="Tuần">Quản lí theo tuần</option>
          <option value="Tháng">Quản lí theo tháng</option>
          <option value="Kì">Quản lí theo kì</option>
        </select>
      </div>
    )
  }

  render() {
    return (
      <div >
        <h3>QUẢN LÍ THỜI GIAN SINH VIÊN - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
        {this.chooseSelectTime()}
        {this.chooseTime(this.state.time)}
      </div>
    );
  }
}
