import React from "react";
import request from "request";


export default class SubMa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            term: "",
            id: "",
            sublist: [],
            subjectname: "",
            checksubject: false,
            checksamesub: false,
            checkdelete: false,
            responsecheck: false,
            checkmark: false,
            listflag: "0"
        }
    }


    subResList = (_sublist) => {
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
                sublist: _sublist,
            })
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
        });
    }

    updateListFlag = (_listflag) => {
        this.setState({
            listflag: _listflag
        })
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
        var allsub = this.props.AllSubList;
        console.log(this.props.OwnerList);
        this.state.checksubject = false;
        this.state.checksamesub = false;
        console.log(this.state.id);
        allsub.forEach(item => {
            if (item.id === this.state.id) {
                this.state.sublist.forEach(idem => {
                    if (idem.id === this.state.id) {
                        this.state.checksamesub = true;
                    }
                })
                if (this.state.checksamesub === false) {
                    this.state.subjectname = item.subjectname;
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
                sublist: this.state.sublist.push(newsubject)
            })
        }
    }

    confirmSubject = () => {
        if (!this.state.id.length) {
            alert("Bạn chưa điền mã môn học!!!");
        }
        if (window.confirm("Xác nhận Danh sách môn học của bạn trong kì này???")) {
            this.subResList(this.state.sublist)
            this.state.responsecheck = true;
            alert("Bạn đã gửi xác nhận danh sách rồi!!!")
        }

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
                            <th width="50px">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody className="BodySubTable">
                        {this.state.sublist.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.subjectname}</td>
                                <td><input type="button" value="Xóa" onClick={() => this.deleteSubject(item.id)} /></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <input className="SubListSend" type="button" value="Gửi" onClick={() => this.confirmSubject()} />
                <input className="SubListSend" type="button" value="Quay lại" onClick={() => this.props.backlist()} />
            </div>
        )
    }

    trueSubjectList = () => {
        return (
            <div>
                <table border="1" className="subjectable">
                    <thead>
                        <tr>
                            <th width="80px" >Số thứ tự</th>
                            <th width="150px">Mã môn học</th>
                            <th width="400px">Tên môn học</th>
                            <th width="50px">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody className="BodySubTable">
                        {this.state.sublist.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.subjectname}</td>
                                <td><input type="button" value="Xóa" onClick={() => this.deleteSubject(item.id)} /></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    showSubList = () => {
        if (this.state.listflag === "0") {
            return (
                <div>{this.subjectList()}</div>
            )
        } else if (this.state.listflag === "1") {
            return (
                <div>{this.trueSubjectList()}</div>
            )
        }
    }

    setNowTerm = () => {
        return (
            <div>
                <p>Nhập mã môn học của Kì học {this.props.thisterm}</p>
                {this.subjectForm()}
                {this.showSubList()}
            </div>
        )
    }


    render() {
        console.log(this.state.resetcheck);
        console.log(this.state.submarklist);
        this.state.sublist = this.props.OwnerList;
        return (

            < div className="SubjectList" >
                {this.setNowTerm()}
            </div >
        )
    }
}