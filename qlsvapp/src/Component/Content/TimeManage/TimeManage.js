import React from "react";
import TWeekManage from "./TWeekManage";
import TDayManage from "./TDayManage";
import SeTiMa from "./SeTiManage";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            term: "",
            week: "",
            selecttime: "select", 
            checktime: false,
        };
    }

    selectDay = () => {
        this.setState({
            selecttime: "day"
        })
    }

    selectWeek = () => {
        this.setState({
            selecttime: "week"
        })
    }

    selectChooseTime = () => {
        this.setState({
            selecttime: "select"
        })
    }

    handleTermChange = (e) => {
        this.setState({
            term: e.target.value
        })
    }

    handleWeekChange = (e) => {
      this.setState({
          week: e.target.value
      })
  }

    chooseTerm = () => {
        // var allterm = ["20141", "20142", "20151", "20152", "20161", "20162", "20171", "20172", "20181", "20182", "20191", "20192"];
        var allterm = ["20191"]
        return (
            <div>
                <p>Chọn Kì học của bạn:</p>
                <select term={this.state.value} onChange={this.handleTermChange} >
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

    
    selectWeekonDay = () => {
      var week = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5", "Tuần 6", "Tuần 7", "Tuần 8", "Tuần 9", "Tuần 10", "Tuần 11", "Tuần 12", "Tuần 13", "Tuần 14", "Tuần 15", "Tuần 16", "Tuần 17", "Tuần 18", "Tuần 19"];
      return (
          <div>
              < select selectweek={this.state.value} onChange={this.handleWeekChange} >
                  <option>Chọn Tuần</option>
                  {
                      week.map(item => {
                          return (
                              <option value={item}>{item}</option>
                          )
                      })
                  }
              </select>
          </div>
      )
  }


    timeManage = () => {
        switch (this.state.selecttime) {
            case "week": return (<div><TWeekManage termweek={this.state.term} backweek={this.selectChooseTime} /></div>);
            case "day": return (<div><TDayManage termday={this.state.term} backday={this.selectChooseTime} /></div>);
            case "select": return (<div><SeTiMa selectday={this.selectDay} selectweek={this.selectWeek} /></div>);
            default:
        }
    }


    render() {
        return (
            <div >
                <h3>QUẢN LÍ THỜI GIAN SINH VIÊN - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
                {this.chooseTerm()}
                {this.selectWeekonDay()}
                {this.timeManage()}
            </div>
        );
    }
}

