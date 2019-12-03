import React from "react";
import Login from "./LoginForm";
import Register from "./RegisterForm";

export default class LogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkLogin: false
        }
    }

    renderLog = () => {
        if (this.state.checkLogin) {
            return (
                <Register upRegister={this.updateLoginForm} upReturn = {this.updateReturnLoginForm}/>
            )
        } else {
            return (
                <Login upLogin={this.updateLoginForm} upSignup={this.updateRegisterForm} />
            )
        }
    }

    updateLoginForm = () => {
        return (
            <div>{this.props.updateLogin()}</div>
        )
    }

    updateRegisterForm = () => {
        this.setState({
            checkLogin: true
        })
    }

    updateReturnLoginForm = () => {
        this.setState({
            checkLogin: false
        })
    }

    render() {
        return (
            <div>
                {this.renderLog()}
            </div>
        )
    }
}