import React from "react";
import request from "request";
import moment from "moment";

export default class MoTerm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: 0,
            // termmoney: 0,
            allmoney: 0,
            olaymoney: 0,
            addlearnmoney: 0,
            checkallmoney: false
        }
    }

    selectMoMonth = (setAllMoney, _termmoney, _olaymoney, _addlearnmoney) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/ParentMoneyMonthManage',
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
                addlearnmoney: _addlearnmoney
            })
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if (body == "0") {
                alert("Bạn không được để trống các ô!!!");
            } else {
                var bod = JSON.parse(body);
                console.log(bod);
                setAllMoney(bod.allmoney);
            }
        });
    }

    setAllMoney = (_allmoney) => {
        this.setState({
            allmoney: _allmoney
        })
    }


    confirmSelectMoMonth = () => {
        if (window.confirm("Xác nhận số tiền đã chu cấp cho Sinh viên???")) {
            this.selectMoMonth(this.setAllMoney, this.props.termmoney, this.state.olaymoney, this.state.addlearnmoney);
            this.suySumMoney();
            alert("Thông tin về tiền chu cấp đã được lưu");
        }
    }

    suySumMoney = () => {
        this.setState({
            checkallmoney: true
        })
    }

    sumMoney = () => {
        if (this.state.checkallmoney === true) {
            return (
                <div>
                    <p>=> Số tiền tháng này bạn chu cấp cho Sinh viên là: {this.state.allmoney} đồng</p>
                </div>
            )
        }
    }


    updateVal = (val, e) => {
        let _val = e.target.value ? e.target.value : 0
        switch (val) {
            case "olaymoney":
                this.setState({
                    olaymoney: _val
                })
                break;
            case "addlearnmoney":
                this.setState({
                    addlearnmoney: _val
                })
                break;
            default:
        }
    }


    inputMoney = () => {
        return (
            <div className="paMoney">
                <p>Số tiền chu cấp cho Sinh viên trong kì {this.props.nowterm}, tháng {moment().format('MM/YYYY')}:</p>
                <p>Số tiền chu cấp cho việc chơi và sinh hoạt:</p>
                <p><input type="text" value={parseInt(this.state.olaymoney)} onChange={e => this.updateVal("olaymoney", e)} /> đồng</p>
                <p>Số tiền chu cấp cho việc học thêm:</p>
                <p><input type="text" value={parseInt(this.state.addlearnmoney)} onChange={e => this.updateVal("addlearnmoney", e)} /> đồng</p>
                <input type="button" value="Xác nhận" onClick={() => this.confirmSelectMoMonth()} />
                <input type="button" value="Quay lại" onClick={() => this.props.backmonth()} />
            </div >
        )
    }

    render() {
        return (
            <div>
                <p>Học phí chu cấp kì này, kì {this.props.nowterm} là: {this.props.termmoney} đồng</p>
                {this.inputMoney()}
                {this.sumMoney()}
            </div>
        )
    }
}