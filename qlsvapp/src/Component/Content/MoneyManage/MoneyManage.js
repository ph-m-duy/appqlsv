import React from "react";
import MoMonth from "./MoMonthManage";
import MoTerm from "./MoTermManage";
import SeMoMa from "./SeMoManage";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            term: "",
            selectmoney: "select", 
            checkterm: false,
        };
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
        // var allterm = ["20141", "20142", "20151", "20152", "20161", "20162", "20171", "20172", "20181", "20182", "20191", "20192"];
        var allterm = ["20191"]
        return (
            <div>
                <p>Chọn Kì học của bạn:</p>
                <select term={this.state.value} onChange={this.handleChange} >
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

    moneyManage = () => {
        switch (this.state.selectmoney) {
            case "month": return (<div><MoMonth termmonth={this.state.term} backmonth={this.selectChooseMoney} /></div>);
            case "term": return (<div><MoTerm termterm={this.state.term} backterm={this.selectChooseMoney} /></div>);
            case "select": return (<div><SeMoMa selectterm={this.selectTerm} selectmonth={this.selectMonth} /></div>);
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
