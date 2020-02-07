import React from "react";
import TWeekManage from "./NewTWeekManage";
import TDayManage from "./PaTDayTimeManage";
import SeTiMa from "./SeTiManage";
import request from "request";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selecttime: "select",
            scheduletime: []
        };
    }

    TimeSchedule = (loadSchedule) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/TimeManage',
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
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var bod = JSON.parse(body);
            console.log(body);
            loadSchedule(bod.MySchedule);
        });
    }

    UNSAFE_componentWillMount = () => {
        this.TimeSchedule(this.loadSchedule);
    }

    loadSchedule = (_scheduletime) => {
        this.setState({
            scheduletime: _scheduletime
        })
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


    timeManage = () => {
        switch (this.state.selecttime) {
            case "week": return (<div><TWeekManage termweek={this.props.nowterm} backweek={this.selectChooseTime} /></div>);
            case "day": return (<div><TDayManage ScheduleTiList={this.state.scheduletime} termday={this.props.nowterm} backday={this.selectChooseTime} /></div>);
            case "select": return (<div><SeTiMa selectday={this.selectDay} selectweek={this.selectWeek} /></div>);
            default:
        }
    }


    render() {
        return (
            <div >
                <h3>QUẢN LÍ THỜI GIAN SINH VIÊN - PHỤ HUYNH THEO DÕI:</h3>
                {this.timeManage()}
            </div>
        );
    }
}

