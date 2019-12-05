import React from "react";
import request from "request";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";

export default class SubMa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: "",
            check: "",
            id: "",
            sublist: [],
            subject: ""
        }
    }


    subResList = (_term, _check, _id, _sublist) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/SubjectManage',
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'Content-Length': '0',
                'Accept-Encoding': 'gzip, deflate',
                Host: 'localhost:8081',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body:
            {
                term: _term,
                check: _check,
                id: _id,
                sublist: _sublist
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }

    handleChange = (event) => {
        this.setState({
            subject: event.target.value
        })
    }

    handleOnclick = () => {
        const newsubject = {
            subject: this.state.subject
        }
        this.setState({
            sublist: this.state.sublist.push(newsubject)
        })
    }

    searchSubject = () => {
        if (!this.state.id.length) {
            alert("Bạn chưa điền mã môn học!!!");
        }
        else {
            this.setState({
                check: "0"
            })
        }
    }

    confirmSubject = () => {
        window.confirm("Xác nhận đó là mã môn học của bạn trong kì này???");
        this.setState({
            check: "1"
        })
    }

    deleteSubject = () => {
        window.confirm("Bạn có chắc muốn xóa môn học này ra khỏi danh sách không??")
        this.setState({
            check: "2"
        })
    }


    subjectForm = () => {
        return (
            <div>
                <input type="text" placeholder="Nhập mã môn học" value={this.state.subject} onChange={this.state.handleChange}></input>
                <input type="button" value="Thêm vào" onClick={() => this.handleOnclick}></input>
            </div>
        )
    }

    subjectList = () => {
        return (
            <div>
                <ul>
                    {this.state.sublist.map((item, index) => (
                        <li key={index}>{item}</li>
                    )
                    )}
                </ul>
                <input type="button" value="Xác nhận" onClick={() => this.confirmSubject} />
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.subjectForm()}
                {this.subjectList()}
            </div>
        )
    }
}