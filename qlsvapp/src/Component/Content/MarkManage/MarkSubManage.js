import React from "react";
import SubMa from "./NewSubManage";
import MarkHope from "./MarkHopeMa";
import MManage from "./MManage";
import request from "request";

export default class MarkSub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sublist: [],
            subOwnlist: [],
            selectmark: "select"
        };
    }

    AllSubjectList = (updateSubList) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/AllSubjectManage',
            headers:
            {
                'cache-control': 'no-cache'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var bod = JSON.parse(body);
            updateSubList(bod.AllSubject, bod.SubjectOwnList)
        });

    }

    UNSAFE_componentWillMount = () => {
        this.AllSubjectList(this.updateSubList);
    }

    updateSubList = (_sublist, _subOwnlist) => {
        this.setState({
            sublist: _sublist,
            subOwnlist: _subOwnlist
        })
    }

    selectSubject = () => {
        this.setState({
            selectmark: "subject"
        })
    }

    selectMarkSub = () => {
        this.setState({
            selectmark: "mark"
        })
    }

    selectChooseSub = () => {
        this.setState({
            selectmark: "select"
        })
    }

    markSubManage = () => {
        switch (this.state.selectmark) {
            case "subject": return (<div><SubMa AllSubList={this.state.sublist} OwnerList={this.state.subOwnlist} termweek={this.props.nowterm} backlist={this.selectChooseSub} /></div>);
            case "mark": return (<div><MarkHope termday={this.props.nowterm} backmark={this.selectChooseSub} /></div>);
            case "select": return (<div><MManage selectsubject={this.selectSubject} selectmark={this.selectMarkSub} /></div>);
            default:
        }
    }

    chooseTerm = () => {
        let term = this.props.nowterm;
        return (
            <SubMa thisterm={term} thisreset={true} />
        )
    }


    render() {
        return (
            <div>
                <h3>QUẢN LÍ MÔN HỌC SINH VIÊN TRONG KÌ - YÊU CẦU SINH VIÊN NHẬP ĐÚNG:</h3>
                {this.markSubManage()}
            </div>
        )
    }
}