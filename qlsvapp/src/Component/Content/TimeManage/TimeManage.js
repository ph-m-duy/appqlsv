import React from "react";
import TDay from "./TDayManage";
import TWeek from "./TWeekManage";
import TMonth from "./TMonthManage";
import TTerm from "./TTermManage";

export default class TManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  handleChange = event => {
    this.setState({
      time: event.target.value
    })

  }

  chooseTime = (val) => {
    switch (val) {
      case "Ngày": return (<div><p>Quản lí Thời gian theo Ngày</p><TDay /></div>);
      case "Tuần": return (<div><p>Quản lí Thời gian theo Tuần</p><TWeek /></div>);
      case "Tháng": return (<div><p>Quản lí Thời gian theo Tháng</p><TMonth /></div>);
      case "Kì": return (<div><p>Quản lí Thời gian theo Kì</p><TTerm /></div>);
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
