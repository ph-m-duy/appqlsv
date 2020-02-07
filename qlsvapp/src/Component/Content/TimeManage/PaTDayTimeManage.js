import React from "react";
import moment from "moment";
import request from "request";

export default class TDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: "",
            starttime: "",
            endtime: "",
            currentday: "",
            currentmoment: "",
            scheduletimelist: []
        }
    }

    saveScheduleList = (_scheduletimelist) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/NewTDayManage',
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
                scheduletimelist: _scheduletimelist
            })
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }

    updateEvent = (e) => {
        this.setState({
            event: e.target.value
        })
    }

    updateStartTime = (e) => {
        this.setState({
            starttime: e.target.value
        })
    }

    updateEndTime = (e) => {
        this.setState({
            endtime: e.target.value
        })
    }

    updateTimeList = () => {
        const newevent = {
            event: this.state.event,
            starttime: this.state.starttime,
            endtime: this.state.endtime,
            currentday: moment().format('dddd'),
            currentmoment: moment().format('DD/MM/YYYY')
        }
        this.setState({
            scheduletimelist: this.state.scheduletimelist.push(newevent)
        })
    }


    scheduleList = () => {
        return (
            <div>
                <table border="1" className="subjectable">
                    <thead>
                        <tr>
                            <th width="50px" >Số thứ tự</th>
                            <th width="300px" >Sự kiện</th>
                            <th width="180px">Thời gian bắt đầu</th>
                            <th width="180px">Thời gian kết thúc</th>
                            <th width="300px">Ngày tháng năm</th>
                        </tr>
                    </thead>
                    <tbody className="BodySubTable">
                        {this.state.scheduletimelist.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.event}</td>
                                <td>{item.starttime}</td>
                                <td>{item.endtime}</td>
                                <td>{item.currentday},{item.currentmoment}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }


    chooseWeekonWeek = () => {
        return (
            <div>
                <input type="button" value="Quay lại" onClick={() => this.props.backday()} />
            </div>
        )
    }

    render() {
        console.log(this.state.scheduletimelist)
        this.state.scheduletimelist = this.props.ScheduleTiList;
        return (
            <div>
                <p>Quản lí thời gian biểu của Sinh viên {moment().format('dddd')} ngày {moment().format('DD/MM/YYYY')}.</p>
                {this.scheduleList()}
                {this.chooseWeekonWeek()}
            </div>
        )
    }
}