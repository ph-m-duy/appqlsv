import React from "react";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            selectmoney: false
        };
    }

    handleChange = () => {
        this.setState({
            selectmoney: true
        })
    }


    selectMoneyManage = () => {
        return (
            <div>
                <br></br>
                <p>Chọn cách thức quản lí chi phí của bạn:</p>
                <input type="button" value="Theo tháng" onClick={() => this.props.selectmonth()} />
                <input type="button" value="Theo kì" onClick={() => this.props.selectterm()} />
            </div>
        )
    }


    render() {
        return (
            <div >
                {this.selectMoneyManage()}
            </div>
        );
    }
}
