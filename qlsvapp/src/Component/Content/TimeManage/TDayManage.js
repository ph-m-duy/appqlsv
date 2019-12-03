import React from "react";
import TDayMa from "./TDayMa";

export default class TDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectweek: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            selectweek: event.target.value
        })
    }

    selectWeekonDay = () => {
        var week = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5", "Tuần 6", "Tuần 7", "Tuần 8", "Tuần 9", "Tuần 10", "Tuần 11", "Tuần 12", "Tuần 13", "Tuần 14", "Tuần 15", "Tuần 16", "Tuần 17", "Tuần 18", "Tuần 19"];
        return (
            <div>
                < select selectweek={this.state.value} onChange={this.handleChange} >
                    <option>Chọn Tuần</option>
                    {
                        week.map(item => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }

    chooseWeekonDay = (val) => {
        switch (val) {


        }
    }

    render() {
        return (
            <div>
                {this.selectWeekonDay()}
                {this.chooseWeekonDay(this.state.selectweek)}
                <TDayMa />
            </div>
        )
    }
}