import React from "react";
import Information from './Information';
import ChangeInfor from "./ChangeInfor";

export default class Infor extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            changeInfor: false,
        })
    }

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
                <Information chaSe={this.changeSeenInfor} />
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