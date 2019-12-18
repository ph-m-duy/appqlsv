import React from "react";

export default class SeTiMa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "",
            selecttime: false
        };
    }

    handleChange = () => {
        this.setState({
            selecttime: true
        })
    }

    selectTimeManageOnly = () => {
        if (this.state.selectmoney === true) {
            return (
                <div></div>
            )
        }
    }


    selectTimeManage = () => {
        return (
            <div>
                <p>Chọn cách quản lí thời gian của bạn:</p>
                <input type="button" value="Theo Tuần" onClick={() => this.props.selectweek()} />
                <input type="button" value="Theo Ngày" onClick={() => this.props.selectday()} />
            </div>
        )
    }


    render() {
        return (
            <div >
                {this.selectTimeManage()}
            </div>
        );
    }
}
