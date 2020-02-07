import React from "react";
import MoMonth from "./MoMonthManage";
import MoTerm from "./NewMoTermManage";
import SeMoMa from "./SeMoManage";
import request from "request";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            term: "",
            selectmoney: "select",
            olaymoney: "",
            addmoney: "",
            allmoney: ""
        };
    }

    selectMoManage = (updateMoney) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/NewMoneyManage',
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
            var bod = JSON.parse(body);
            console.log(body);
        });
    }


    updateMoney = (_allmoney, _oplaymoney, _addlearnmoney) => {
        this.setState({
            allmoney: _allmoney,
            oplaymoney: _oplaymoney,
            addlearnmoney: _addlearnmoney
        })
    }

    sentMonthTerm = () => {
        return (
            <div>
                {this.selectMoManage(this.updateMoney, this.state.term)}
            </div>
        )
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

    handleChange = (e) => {
        this.setState({
            term: e.target.value
        })
    }

    chooseTerm = () => {
        return (
            <div>
                <p>Quản lý chi tiêu kì học {this.props.nowterm}</p>
            </div>
        )
    }

    moneyManage = () => {
        switch (this.state.selectmoney) {
            case "month": return (
                <div>
                    <MoMonth
                        termmonth={this.state.term}
                        backmonth={this.selectChooseMoney}
                        allmoney={this.state.allmoney}
                        oplaymoney={this.state.olaymoney}
                        addlearnmoney={this.state.addlearnmoney}
                    />
                </div>);
            case "term": return (<div><MoTerm termterm={this.state.term} backterm={this.selectChooseMoney} /></div>);
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
