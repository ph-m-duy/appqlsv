import React from "react";
import TWeekTable from "./TWeekTable";

export default class TDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            term: ""
        })
    }

    chooseWeekonDay = () => {
        return (
            <div>
                <input type="button" value="Xác nhận" />
                <input type="button" value="Quay lại" onClick={() => this.props.backweek()} />
            </div>
        )
    }

    imWeekTime = () => {
        return (
            <TWeekTable />
        )
    }



    render() {
        return (
            <div>
                <p>Nhập phần trăm thời gian sử dụng trong tuần</p>
                {this.imWeekTime()}
                {this.chooseWeekonDay()}
            </div>
        )
    }
}