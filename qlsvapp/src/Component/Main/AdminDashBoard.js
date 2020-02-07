import React from "react"
import request from "request";
import AccCount from "../Content/AdminFile/AccessCount";
import AddSub from "../Content/AdminFile/AddSubject";
import ManaAcc from "../Content/AdminFile/ManageAccount";
import UpTerm from "../Content/AdminFile/UpdateTerm";
import ADHome from "../Content/AdminFile/ADHome";
import moment from "moment";



export default class AdminDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            subjectlist: [],
            userlist: [],
            term: "",
            week: ""
        };
    }

    LoadHelloData = callname => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/AdminDashBoard",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                "Content-Length": "0",
                "Accept-Encoding": "gzip, deflate",
                Host: "localhost:8081",
                "Cache-Control": "no-cache",
                Accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                checkLogout: "1"
            }),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var bod = JSON.parse(body);
            callname(bod.name, bod.sublist, bod.userslist, bod.term, bod.week);
        });
    };

    callname = (_name, _sublist, _userslist, _term, _week) => {
        this.setState({
            fullname: _name,
            subjectlist: _sublist,
            userlist: _userslist,
            term: _term,
            week: _week
        });
    };

    UNSAFE_componentWillMount = () => {
        this.LoadHelloData(this.callname);
    };

    updateContentState = state => {
        this.setState({ contentState: state });
    };

    renderContent = () => {
        switch (this.state.contentState) {
            case 1: return (<div className="ADql"><AccCount /></div>);
            case 2: return (<div className="ADql"><ManaAcc userlist={this.state.userlist} /></div>);
            case 3: return (<div className="ADql"><AddSub sublist={this.state.subjectlist} /></div>);
            case 4: return (<div className="ADql"><UpTerm /></div>);
            default: return (<div className="ADql"><ADHome /></div>);
        }
    };

    render() {
        console.log(this.state.subjectlist);
        return (
            <div>
                <div className="container">
                    <div className="header">
                        <h1>TRANG QUẢN LÍ THEO DÕI VÀ TÍNH KPI SINH VIÊN</h1>
                    </div>
                    <div className="s1">
                        <p>Học kỳ {this.state.term},{this.state.week}, {moment().format('dddd')} ngày {moment().format('DD/MM/YYYY')}</p>
                    </div>
                    <div className="ADbody">
                        <div className="Hello">Xin chào, {this.state.fullname}</div>
                        <div className="AdMenu">
                            <ul>
                                <li>
                                    <div className="AD">
                                        <input type="button" value="THỐNG KÊ TRUY CẬP" onClick={() => { this.updateContentState(1); }} />
                                    </div>
                                </li>
                                <li>
                                    <div className="AD">
                                        <input type="button" value="TÀI KHOẢN SINH VIÊN" onClick={() => { this.updateContentState(2) }} />
                                    </div>
                                </li>
                                <li>
                                    <div className="AD">
                                        <input type="button" value="DANH SÁCH MÔN HỌC" onClick={() => { this.updateContentState(3); }} />
                                    </div>
                                </li>
                                <li>
                                    <div className="AD">
                                        <input type="button" value="CẬP NHẬT KÌ HỌC" onClick={() => { this.updateContentState(4); }} />
                                    </div>
                                </li>
                                <li>
                                    <div className="AD">
                                        <input type="button" value="ĐĂNG XUẤT" onClick={() => { this.props.updateLogout() }} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="showContent">
                            {this.renderContent()}
                        </div>
                    </div>
                    <div className="AdS1">

                    </div>
                    <div className="footer">
                        <p>Trang theo dõi quản lí và tính KPI Sinh Viên ver 1.0</p>
                        <p>Design by Project 1-<a href="https://www.facebook.com/thoiloanhhung">Phạm Duy</a>- Đại học Bách khoa Hà Nội</p>
                        <p>
                            Hanoi University of Science and Technology - No. 1, Dai Co Viet
                            Str., Hanoi, Vietnam
            </p>
                    </div>
                </div>
            </div >
        )
    }
}