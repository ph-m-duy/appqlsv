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

    handleChange = (event) => {
        this.setState({
            id: event.target.value
        })
    }


    subjectList = () => {
        return (
            <div>
                <p>Danh sách môn học trong kì {this.props.nowterm}</p>
                <table border="1" className="subjectable">
                    <thead>
                        <tr>
                            <th width="80px" >Số thứ tự</th>
                            <th width="150px">Mã môn học</th>
                            <th width="400px">Tên môn học</th>
                        </tr>
                    </thead>
                    <tbody className="BodySubTable">
                        {this.state.sublist.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.subjectname}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <input className="SubListSend" type="button" value="Quay lại" onClick={() => this.props.backlist()} />
            </div>
        )
    }

    render() {
        console.log(this.state.resetcheck);
        console.log(this.state.submarklist);
        this.state.sublist = this.props.OwnerList;
        return (

            < div className="SubjectList" >
                {this.subjectList()}
            </div >
        )
    }
}