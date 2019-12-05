import React from "react";
import SubMa from "./SubjectManage";

export default class MarkSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
    }

    handleChange = event => {
        this.setState({
            term: event.target.value
        })

    }

    chooseTerm = (val) => {
        switch (val) {
            case "20141": return (<div><p>Kì học 20141 :</p> <SubMa /></div>);
            case "20142": return (<div><p>Kì học 20142 :</p> </div>);
            case "20151": return (<div><p>Kì học 20151 :</p> </div>);
            case "20152": return (<div><p>Kì học 20152 :</p> </div>);
            case "20161": return (<div><p>Kì học 20161 :</p> </div>);
            case "20162": return (<div><p>Kì học 20162 :</p> </div>);
            case "20171": return (<div><p>Kì học 20171 :</p> </div>);
            case "20172": return (<div><p>Kì học 20172 :</p> </div>);
            case "20181": return (<div><p>Kì học 20181 :</p> </div>);
            case "20182": return (<div><p>Kì học 20182 :</p> </div>);
            case "20191": return (<div><p>Kì học 20191 :</p> </div>);
            case "20192": return (<div><p>Kì học 20192 :</p> </div>);
            default:
        }
    }

    selectTerm = () => {
        var allterm = ["20141", "20142", "20151", "20152", "20161", "20162", "20171", "20172", "20181", "20182", "20191", "20192"];
        return (
            <div>
                <p>Chọn kì học của bạn:</p>
                <select term={this.state.value} onChange={this.handleChange} >
                    <option>Chọn Kì</option>
                    {
                        allterm.map(item => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })
                    }
                </select>
            </div >
        )
    }

    render() {
        return (
            <div>
                <h5>DANH SÁCH MÔN HỌC TRONG KÌ</h5>
                {this.selectTerm()}
                {this.chooseTerm(this.state.term)}
            </div>
        )
    }
}