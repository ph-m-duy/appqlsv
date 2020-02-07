import React from "react";
import request from "request";
import moment from "moment";

export default class MoMonth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termmoney: 0,
            olaymoney: 0,
            addlearnmoney: 0,
            allmoney: 0,
            addmoney: 0,
            learnmoney: 0,
            lostmoney: 0,
            recentmoney: 0,
            checksavemoney: false
        }
    }

    selectMoMonth = (setSaveMoney, _termmoney, _olaymoney, _addlearnmoney, _allmoney, _addmoney, _learnmoney, _lostmoney) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/MoneyMonthManage',
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
                termmoney: _termmoney,
                olaymoney: _olaymoney,
                addlearnmoney: _addlearnmoney,
                allmoney: _allmoney,
                addmoney: _addmoney,
                learnmoney: _learnmoney,
                lostmoney: _lostmoney,
            })
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            else {
                var bod = JSON.parse(body);
                console.log(body);
                if (bod) {
                    setSaveMoney(bod.recentmoney);
                }
            }
        });
    }


    setSaveMoney = (_recentmoney) => {
        this.setState({
            recentmoney: _recentmoney
        })
    }

    updateVal = (val, e) => {
        let _val = e.target.value ? e.target.value : 0
        switch (val) {
            case "addmoney":
                this.setState({
                    addmoney: _val
                })
                break;
            case "learnmoney":
                this.setState({
                    learnmoney: _val
                })
                break;
            case "lostmoney":
                this.setState({
                    lostmoney: _val
                })
                break;
            default:
        }
    }

    confirmSelectMoMonth = () => {
        if (window.confirm("Xác nhận thông tin của bạn là đúng???")) {
            this.selectMoMonth(this.setSaveMoney, this.props.termmoney, this.props.olaymoney, this.props.addlearnmoney, this.props.allmoney, this.state.addmoney, this.state.learnmoney, this.state.lostmoney);
            this.saveMoney();
            this.checkChuMo();
            alert("Thông tin về chi phí của bạn đã được lưu");
        }
    }

    checkChuMo = () => {
        this.setState({
            checksavemoney: true
        })
    }

    saveMoney = () => {
        if (this.state.checksavemoney === true) {
            return (
                <div>
                    <p>=> Số tiền còn lại của bạn trong tháng này là: {this.state.recentmoney} đồng</p>
                </div>
            )
        }
    }


    receivePaMoney = () => {
        return (
            <div className="receiveMo">
                <p>Số tiền bạn được chu cấp trong kì {this.props.nowterm}, tháng {moment().format('MM/YYYY')}:</p>
                <p>Học phí trong trường bạn được chu cấp kì này: {this.props.termmoney} đồng</p>
                <p>Số tiền bạn được chu cấp cho việc chơi và sinh hoạt: {this.props.olaymoney} đồng</p>
                <p>Số tiền bạn được chu cấp cho việc học thêm: {this.props.addlearnmoney} đồng</p>
                <p>Tổng số tiền bạn được chu cấp hàng tháng: {this.props.allmoney} đồng</p>
            </div>
        )
    }

    inputMoney = () => {
        return (
            <div className="saveMo">
                <p>Quản lí chi tiêu của bạn kì {this.props.nowterm}, tháng {moment().format('MM/YYYY')}:</p>
                <p>Số tiền bạn kiếm được khi làm thêm (nếu có):</p>
                <p><input type="text" value={parseInt(this.state.addmoney)} onChange={e => this.updateVal("addmoney", e)} /> đồng</p>
                <p>Số tiền bạn dành cho việc học thêm (nếu có):</p>
                <p><input type="text" value={parseInt(this.state.learnmoney)} onChange={e => this.updateVal("learnmoney", e)} /> đồng</p>
                <p>Số tiền bạn chi tiêu cho việc sinh hoạt và chơi:</p>
                <p><input type="text" value={parseInt(this.state.lostmoney)} onChange={e => this.updateVal("lostmoney", e)} /> đồng</p>
                <input type="button" value="Xác nhận" onClick={() => this.confirmSelectMoMonth()} />
                <input type="button" value="Quay lại" onClick={() => this.props.backmonth()} />
            </div >
        )
    }

    render() {
        return (
            <div>
                {this.receivePaMoney()}
                {this.inputMoney()}
                {this.saveMoney()}
            </div>
        )
    }
}