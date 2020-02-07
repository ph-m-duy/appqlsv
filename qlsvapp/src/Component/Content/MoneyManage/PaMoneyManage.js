import React from "react";
import MoMonth from "./ParentCheckMoney";
import MoTerm from "./NewMoTermManage";
import SeMoMa from "./PaSeMoManage";
import request from "request";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termmoney: 0,
            selectmoney: "",
        };
    }

    selectTermMoManage = (_termmoney, callback, backcall) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/PaMoneyManage',
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
                termmoney: _termmoney
            })
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            if (body == "0") callback();
            if (body == "1") backcall();
        });
    }


    selectMonth = () => {
        this.setState({
            selectmoney: "month"
        })
    }

    selectTerm = () => {
        this.setState({
            selectmoney: "term"
        })
    }

    selectChooseMoney = () => {
        this.setState({
            selectmoney: "select"
        })
    }

    updateVal = (val, e) => {
        let _val = e.target.value ? e.target.value : 0
        switch (val) {
            case "termmoney":
                this.setState({
                    termmoney: _val
                })
                break;
            default:
        }
    }

    callback = () => {
        alert("Bạn chưa nhập học phí chu cấp kì này!!!!");
    }

    backcall = () => {
        alert("Cập nhật thông tin thành công!!!");
        this.setState({
            termmoney: this.state.termmoney,
            selectmoney: "select"
        })
        alert("Hãy chọn cách chu cấp kinh phí cho Sinh viên theo tháng hoặc theo kì!!!");
    }

    confirmTermMoney = () => {
        if (window.confirm("Xác định học phí chu cấp kì này???")) {
            this.selectTermMoManage(this.state.termmoney, this.callback, this.backcall);
        }
    }

    chooseTerm = () => {
        return (
            <div>
                <p>Quản lý chi tiêu kì học {this.props.nowterm}</p>
                <p>Học phí chu cấp cho Sinh viên kì này:</p>
                <p> <input type="text" value={parseInt(this.state.termmoney)} onChange={e => this.updateVal("termmoney", e)} /> đồng</p>
                <input type="button" value="Xác nhận" onClick={() => this.confirmTermMoney(this.state.termmoney)} />
            </div>
        )
    }

    moneyManage = () => {
        switch (this.state.selectmoney) {
            case "": return (
                <div>Cung cấp thông tin về số tiền chu cấp cho Sinh viên của bạn!!!</div>
            )
            case "month": return (
                <div>
                    <MoMonth termmoney={this.state.termmoney} nowterm={this.props.nowterm} backmonth={this.selectChooseMoney} />
                </div>);
            case "term": return (
                <div><MoTerm backterm={this.selectChooseMoney} /></div>
            );
            case "select": return (
                <div>
                    <SeMoMa selectterm={this.selectTerm} selectmonth={this.selectMonth} sentMonthTerm={this.sentMonthTerm} />
                </div>
            );
            default:
        }
    }

    render() {
        return (
            <div >
                <h3>QUẢN LÍ CHI TIÊU SINH VIÊN - PHỤ HUYNH THEO DÕI:</h3>
                {this.chooseTerm()}
                {this.moneyManage()}
            </div>
        );
    }
}
