import React from "react";
import Login from "./LoginForm";
import Register from "./RegisterForm";
import ForgetPass from "./ForgetPass"

export default class LogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkLogin: "login"
        }
    }

    renderLog = () => {
        switch (this.state.checkLogin) {
            case "login": return (
                <Login upStuLogin={this.updateStuLoginForm} upPaLogin={this.updatePaLoginForm} upAdLogin={this.updateAdLoginForm} upSignup={this.updateRegisterForm} upforget={this.updateForgetPass} />
            )
            case "register": return (
                <Register upRegister={this.updateReturnLoginForm} upReturn={this.updateReturnLoginForm} />
            )
            case "forgetpass": return (
                <ForgetPass upReturn={this.updateReturnLoginForm} />
            )
            default:
        }
    }

    updateStuLoginForm = () => {
        return (
            <div>{this.props.updateStuLogin()}</div>
        )
    }

    updatePaLoginForm = () => {
        return (
            <div>{this.props.updatePaLogin()}</div>
        )
    }

    updateAdLoginForm = () => {
        return (
            <div>{this.props.updateAdLogin()}</div>
        )
    }

    updateRegisterForm = () => {
        this.setState({
            checkLogin: "register"
        })
    }

    updateReturnLoginForm = () => {
        this.setState({
            checkLogin: "login"
        })
    }

    updateForgetPass = () => {
        this.setState({
            checkLogin: "forgetpass"
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