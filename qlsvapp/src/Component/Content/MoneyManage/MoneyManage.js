import React from "react";
import MoMonth from "./MoMonthManage";
import MoTerm from "./NewMoTermManage";
import SeMoMa from "./SeMoManage";
import request from "request";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termmoney: 0,
            selectmoney: "",
            olaymoney: 0,
            addlearnmoney: 0,
            allmoney: 0
        };
    }

    selectMoManage = (callcall, updateMoney) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/MoneyManage',
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
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if (body == "0") {
                callcall()
            } else {
                var bod = JSON.parse(body);
                console.log(body);
                updateMoney(bod.termmoney, bod.olaymoney, bod.addlearnmoney, bod.allmoney);
            }
        });
    }

    callcall = () => {
        alert("Thông tin về học phí và chu cấp chi phí vẫn chưa được phụ huynh cập nhật!!!");
    }

    updateMoney = (_termmoney, _olaymoney, _addlearnmoney, _allmoney) => {
        alert("Thông tin về chu cấp chi phí đã được phụ huynh cập nhật!!!!.");
        this.setState({
            termmoney: _termmoney,
            olaymoney: _olaymoney,
            addlearnmoney: _addlearnmoney,
            allmoney: _allmoney,
            selectmoney: "select"
        })
        alert("Hãy chọn cách để quản lí theo dõi chi tiêu của bản thân theo tháng hoặc theo kì!!!");
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

    checksum = () => {
        if (window.confirm("Xác nhận kiểm tra thông tin từ phụ huynh???")) {
            this.selectMoManage(this.callcall, this.updateMoney);
        }
    }

    chooseTerm = () => {
        return (
            <div>
                <p>Quản lý chi tiêu kì học {this.props.nowterm}</p>
                <input type="button" value="Kiểm tra" onClick={() => this.checksum(this.updateMoney)} />
            </div>
        )
    }

    moneyManage = () => {
        switch (this.state.selectmoney) {
            case "": return (
                <div>
                    <p>Bạn chỉ có thể sử dụng tính năng này khi phụ huynh đã nhập số tiền chu cấp</p>
                    <p>Ấn vào nút kiểm tra để kiểm tra thông tin !!!!</p>
                </div>
            )
            case "month": return (
                <div>
                    <MoMonth
                        nowterm={this.props.nowterm}
                        backmonth={this.selectChooseMoney}
                        termmoney={this.state.termmoney}
                        olaymoney={this.state.olaymoney}
                        addlearnmoney={this.state.addlearnmoney}
                        allmoney={this.state.allmoney}
                    />
                </div>);
            case "term": return (<div><MoTerm backterm={this.selectChooseMoney} /></div>);
            case "select": return (<div><SeMoMa selectterm={this.selectTerm} selectmonth={this.selectMonth} sentMonthTerm={this.sentMonthTerm} /></div>);
            default:
        }
    }


    render() {
        return (
            <div >
                <h3>QUẢN LÍ CHI TIÊU SINH VIÊN - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
                {this.chooseTerm()}
                {this.moneyManage()}
            </div>
        );
    }
}
