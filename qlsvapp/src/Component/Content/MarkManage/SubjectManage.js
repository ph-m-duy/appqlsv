import React from "react";
import request from "request";


export default class SubMa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: "",
            id: "",
            sublist: [],
            submarklist: [],
            subjectname: "",
            semimark: 0,
            finalmark: 0,
            checksubject: false,
            checksamesub: false,
            checkdelete: false,
            responsecheck: false,
            checkmark: false
        }
    }


    subResList = (_term, _deletecheck, _statuscheck, _submarklist) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/SubjectMarkManage',
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
            body: JSON.stringify({
                term: _term,
                submarklist: _submarklist
            })
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
        });
    }

    handleChange = (event) => {
        this.setState({
            id: event.target.value
        })
    }

    handleSemiChange = (event) => {
        let val = event.target.value ? event.target.value : 0
        this.setState({
            semimark: val
        })
    }

    handleFinalChange = (event) => {
        let val = event.target.value ? event.target.value : 0
        this.setState({
            finalmark: val
        })
    }

    addAllSubject = () => {
        var allsub = require("./AllSubject.json");
        //eslint-disable-next-line react/no-direct-mutation-state
        this.state.checksubject = false;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.checksamesub = false;
        console.log(this.state.id);
        allsub.forEach(item => {
            if (item.id === this.state.id) {
                this.state.sublist.forEach(idem => {
                    if (idem.id === this.state.id) {
                        //eslint-disable-next-line react/no-direct-mutation-state
                        this.state.checksamesub = true;
                    }
                })
                if (this.state.checksamesub === false) {
                    //eslint-disable-next-line react/no-direct-mutation-state
                    this.state.subjectname = item.subjectname;
                    //eslint-disable-next-line react/no-direct-mutation-state
                    this.state.checksubject = true;
                }
                if (this.state.checksamesub === true) {
                    alert("Bạn đã thêm môn học này!!!");
                }
            }
        });
        if (this.state.checksubject === false && this.state.checksamesub === false) {
            alert("Mã môn học mà bạn nhập không đúng!!!");
        }
        if (this.state.checksubject === true) {
            const newsubject = {
                id: this.state.id,
                subjectname: this.state.subjectname,
            }
            this.setState({
                sublist: this.state.sublist.concat(newsubject)
            })
        }
    }

    confirmSubject = () => {
        if (!this.state.id.length) {
            alert("Bạn chưa điền mã môn học!!!");
        }
        if (window.confirm("Xác nhận Danh sách môn học của bạn trong kì này???")) {
            // if (this.state.responsecheck === false) {
            this.subResList(this.props.thisterm, this.state.deletecheck, this.state.statuscheck, this.state.submarklist)
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.responsecheck = true;
        }
        // if (this.state.responsecheck === true) {
        alert("Bạn đã gửi xác nhận danh sách rồi!!!")
    }

    deleteSubject = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa môn học này ra khỏi danh sách không??")) {
            this.state.sublist.forEach((item, index) => {
                if (item.id === id) {
                    this.state.sublist.splice(index, 1);
                }
            })
        }
        this.setState({
            sublist: this.state.sublist
        })
    }

    confirmExmark = (id) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.checkmark = false;
        console.log(this.state.semimark);
        console.log(this.state.finalmark);
        console.log(this.state.sublist);
        this.state.sublist.forEach(item => {
            if (item.id === id) {
                if (this.state.semimark === 0 || this.state.finalmark === 0) {
                    alert("Bạn chưa điền điểm dự kiến đạt được!!!");
                }
                else if ((3 >= parseFloat(this.state.semimark) || parseFloat(this.state.semimark) > 10) || (3 >= parseFloat(this.state.semimark) || parseFloat(this.state.semimark) > 10)) {
                    alert("Điểm dự kiến của môn học đạt được phải lớn hơn 3 và nhỏ hơn bằng 10 ");
                }
                else {
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.checkmark = true;
                }
            }
        })

        if (this.state.checkmark === true) {
            const newmarksubject = {
                id: this.state.id,
                subjectname: this.state.subjectname,
                semimark: this.state.semimark,
                finalmark: this.state.finalmark
            }
            this.setState({
                submarklist: this.state.submarklist.concat(newmarksubject)
            })
            console.log(this.state.submarklist);
        }
        this.setState({
            semimark: 0,
            finalmark: 0
        })
        console.log(this.state.submarklist);
    }

    subjectForm = () => {
        return (
            <div>
                <input type="text" placeholder="Nhập mã môn học" value={this.state.id} onChange={this.handleChange} />
                <input type="button" value="Thêm vào" onClick={() => this.addAllSubject()} />
            </div>
        )
    }

    subjectList = () => {
        return (
            <div>
                <table border="1" className="subjectable">
                    <thead>
                        <tr>
                            <th width="80px" >Số thứ tự</th>
                            <th width="150px">Mã môn học</th>
                            <th width="400px">Tên môn học</th>
                            <th width="120px">Điểm dự kiến giữa kì</th>
                            <th width="100px">Điểm dự kiến cuối kì</th>
                            <th width="50px">Chức năng</th>
                            <th width="80px">Xác nhận</th>
                        </tr>
                    </thead>
                    <tbody className="BodySubTable">
                        {this.state.sublist.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.subjectname}</td>
                                <td><input type="text" value={this.state.semiterm} onChange={this.handleSemiChange} /></td>
                                <td><input type="text" value={this.state.finalterm} onChange={this.handleFinalChange} /></td>
                                <td><input type="button" value="Xóa" onClick={() => this.deleteSubject(item.id)} /></td>
                                <td><input type="button" value="Xác nhận" onClick={() => this.confirmExmark(item.id)} /></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <input className="SubListSend" type="button" value="Gửi" onClick={() => this.confirmSubject()} />
            </div>
        )
    }

    setNowTerm = () => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.term = this.props.thisterm
        if (this.state.term !== "") {
            return (
                <div>
                    <p>Nhập mã môn học của Kì học {this.state.term}</p>
                    {this.subjectForm()}
                    {this.subjectList()}
                </div>
            )
        }
    }


    render() {
        console.log(this.state.resetcheck);
        console.log(this.state.submarklist);
        return (

            < div className="SubjectList" >
                {this.setNowTerm()}
            </div >
        )
    }
}