import React from "react";
import request from "request";

export default class ChangeInfor extends React.Component {
    constructor() {
        super();
        this.state = {
            fullname: "",
            MSSV: "",
            sex: "",
            major: ""
        };
    }

    register = (checkEmpty, changeSuccess, _fullname, _MSSV, _sex, _major) => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/ChangeInfor",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                Host: "localhost:8081",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                check: "1",
                fullname: _fullname,
                MSSV: _MSSV,
                sex: _sex,
                major: _major
            }),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            if (body === "0") checkEmpty();
            if (body === "1") changeSuccess();
        })
    };


    updateVal = (val, e) => {
        let _val = e.target.value
        switch (val) {
            case "fullname":
                this.setState({
                    fullname: _val
                })
                break;
            case "MSSV":
                this.setState({
                    MSSV: _val
                })
                break;
            case "sex":
                this.setState({
                    sex: _val
                })
                break;
            case "major":
                this.setState({
                    major: _val
                })
                break;
            default:
        }
    }

    checkEmpty = () => {
        alert("Bạn không được để trống các ô!!!");
    }

    changeSuccess = () => {
        alert("Thông tin của bạn đã được cập nhật!!!");
        return (
            <div>
                {this.props.chaInfor()}
            </div>
        )
    }

    cautionchange = () => {
        if (window.confirm("Xác nhận thay đổi thông tin của bạn???")) {
            return (
                <div> {this.register(this.checkEmpty, this.changeSuccess, this.state.fullname, this.state.MSSV, this.state.sex, this.state.major)}</div>
            )
        }
    }

    changeInformation = () => {
        return (
            <div>
                <form className="ChangeInfo">
                    <p className="ChangeInfoHead">Điền thông tin của bạn</p>

                    <p className="Ci">Họ và tên</p>
                    <input type="text" value={this.state.fullname} onChange={e => this.updateVal("fullname", e)}  ></input>

                    <p className="Ci">Mã số Sinh viên</p>
                    <input type="text" value={this.state.MSSV} onChange={e => this.updateVal("MSSV", e)}   ></input>

                    <p className="Ci">Giới tính</p>
                    <select sex={this.state.value} onChange={e => this.updateVal("sex", e)}>
                        <option value="">Chọn giới tính</option>
                        <option value="nam">nam</option>
                        <option value="nữ">nữ</option>
                    </select>

                    <p className="Ci">Ngành học</p>
                    <input type="text" value={this.state.major} onChange={e => this.updateVal("major", e)} ></input>

                    <div className="CiSign" >
                        <input type="button" value="Xác nhận" onClick={() => this.cautionchange()} />
                    </div>
                    <div className="CiReturn">
                        <input type="button" value="Quay lại" onClick={() => this.props.chaInfor()} />
                    </div>
                </form>
            </div>
        )
    }


    render() {
        return (
            <div>
                <h5>CẬP NHẬT THÔNG TIN CÁ NHÂN</h5>
                {this.changeInformation()}
            </div>
        )
    }

}