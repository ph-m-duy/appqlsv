import React from "react";
import Information from './Information';
import ChangeInfor from "./ChangeInfor";
import request from "request";


export default class Infor extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            changeInfor: false,
            fullname: "",
            MSSV: "",
            sex: "",
            major: ""
        })
    }

    Infor = Profile => {
        var options = {
            method: "POST",
            url: "http://localhost:8081/Information",
            headers: {
                "cache-control": "no-cache",
                Connection: "keep-alive",
                "Content-Length": "15",
                "Accept-Encoding": "gzip, deflate",
                Host: "localhost:8081",
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                check: "1"
            })
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var bod = JSON.parse(body);
            console.log(body);
            if (bod) Profile(bod.fullname, bod.MSSV, bod.sex, bod.major);
        });
    };

    UNSAFE_componentWillMount = () => {
        this.Infor(this.Profile);
    };

    Profile = (_fullname, _MSSV, _sex, _major) => {
        this.setState({
            fullname: _fullname,
            MSSV: _MSSV,
            sex: _sex,
            major: _major
        });
    };

    changeInformation = () => {
        this.setState({
            changeInfor: false
        })
    }

    changeSeenInfor = () => {
        this.setState({
            changeInfor: true
        })
    }

    checkInfor = () => {
        if (this.state.changeInfor) {
            return (
                <ChangeInfor chaInfor={this.changeInformation} />
            )
        } else {
            return (
                <Information
                    chaSe={this.changeSeenInfor}
                    _fullname={this.state.fullname}
                    _MSSV={this.state.MSSV}
                    _sex={this.state.sex}
                    _major={this.state.major}
                />
            )
        }
    }

    render() {
        return (
            <div>
                {this.checkInfor()}
            </div>
        )
    }
}