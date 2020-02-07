import React from "react";
import request from "request";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowterm: "",
            nowweek: ""
        };
    }

    supTerm = (_nowterm, _nowweek) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/UpdateTerm',
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
                nowterm: _nowterm,
                nowweek: _nowweek,
            })
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if (body === "1") alert("Đã cập nhật thành công!!!")
        });
    }

    updateTerm = (e) => {
        this.setState({
            nowterm: e.target.value
        })
    }

    updateWeek = (e) => {
        this.setState({
            nowweek: e.target.value
        })
    }

    chooseTerm = () => {
        var allterm = ["20191", "20192", "20201", "20202", "20211", "20212", "20221", "20222", "20231", "20232", "20241", "20242"];
        return (
            <div>
                <p>Cập nhật kì học hiện tại:</p>
                <select nowterm={this.state.value} onChange={this.updateTerm} >
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

    chooseWeek = () => {
        var allterm = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5", "Tuần 6", "Tuần 7", "Tuần 8", "Tuần 9", "Tuần 10", "Tuần 11", "Tuần 12", "Tuần 13", "Tuần 14", "Tuần 15", "Tuần 16", "Tuần 17", "Tuần 18", "Tuần 19","Kì học kết thúc"];
        return (
            <div>
                <p>Cập nhật tuần học hiện tại:</p>
                <select nowweek={this.state.value} onChange={this.updateWeek} >
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

    updateTermWeek = () => {
        return (
            <div>
                {this.chooseTerm()}
                {this.chooseWeek()}
                <input type="button" value="Xác nhận" onClick={() => this.confirmUpTerm()} />
            </div>
        )
    }

    confirmUpTerm = () => {
        if (window.confirm("Xác nhận cập nhật kì học và tuần học???")) {
            return (
                <div>
                    {this.supTerm(this.state.nowterm, this.state.nowweek)}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="updateTerm">
                    {this.updateTermWeek()}
                </div>
            </div>
        );
    }
}
