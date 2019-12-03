import React from "react";

export default class MarkSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    handleChange = event => {
        this.setState({
            term: event.target.value
        })

    }

    chooseTime = (val) => {
        switch (val) {
            case "20141": return (<div><p>Quản lí thời gian theo Ngày</p><TDay /></div>);
            case "20142": return (<div><p>Quản lí thời gian theo Tuần</p><TWeek /></div>);
            case "Tháng": return (<div><p>Quản lí thời gian theo Tháng</p><TMonth /></div>);
            case "Kì": return (<div><p>Quản lí thời gian theo Kì</p><TTerm /></div>);
            default:
        }
    }

    chooseSelectTime = () => {
        var allterm = ["20141", "20142", "20151", "20152", "20161", "20162", "20171", "20172", "20181", "20182", "20191", "20192"];
        return (
            <div>
                <p>Chọn kì học của bạn:</p>
                <select time={this.state.value} onChange={this.handleChange} >
                    <option>Chọn Kì</option>
                    {
                        allterm.map(item => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h5>DANH SÁCH MÔN HỌC TRONG KÌ</h5>
                {this.selectTerm()}
            </div>
        )
    }
}