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

    chooseTerm = () => {
        let nowterm = this.state.term;
        return (
            <SubMa thisterm={nowterm} thisreset={true} />
        )
    }


    selectTerm = () => {
        // var allterm = ["20141", "20142", "20151", "20152", "20161", "20162", "20171", "20172", "20181", "20182", "20191", "20192"];
        var allterm = ["20191"]
        return (
            <div>
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
            </div >
        )
    }

    render() {
        return (
            <div>
                <h3>QUẢN LÍ ĐIỂM DỰ KIẾN SINH VIÊN - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
                {this.selectTerm()}
                {this.chooseTerm()}
            </div>
        )
    }
}