import React from "react";
import MoMonth from "./MoMonthManage";
import MoTerm from "./MoTermManage";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: ''
        };
    }

    handleChange = event => {
        this.setState({
            money: event.target.value
        })

    }

    chooseMoney = (val) => {
        switch (val) {
            case "Tháng": return (<div><p>Quản lí Chi tiêu theo Tháng</p></div>);
            case "Kì": return (<div><p>Quản lí Chi tiêu theo Kì</p></div>);
            default:
        }
    }

    chooseSelectMoney = () => {
        return (
            <div>
                <p>Chọn quản lí chi tiêu theo tháng, kì:</p>
                <select time={this.state.value} onChange={this.handleChange} >
                    <option>Chọn</option>
                    <option value="Tháng">Quản lí theo tháng</option>
                    <option value="Kì">Quản lí theo kì</option>
                </select>
            </div>
        )
    }

    render() {
        return (
            <div >
                <h3>QUẢN LÍ CHI TIÊU SINH VIÊN - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
                {this.chooseSelectMoney()}
                {this.chooseMoney(this.state.money)}
            </div>
        );
    }
}
