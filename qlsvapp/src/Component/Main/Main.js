import React from 'react';
import './Page.css';
import Log from './LogPage';
import StudentDash from './StudentDashBoard';
import ParentDash from "./ParentDashBoard";
import AdminDash from "./AdminDashBoard";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: "Log"
        }
    }

    renderContent = () => {
        switch (this.state.isLogin) {
            case "Log": return (<div><Log updateStuLogin={this.updateStudent} /></div>);
            case "Student": return (<div><StudentDash updateLogout={this.updateLog} /></div>);
            case "Parent": return (<div><ParentDash updateLogout={this.updateLog}/></div>);
            case "Admin": return (<div><AdminDash updateLogout={this.updateLog}/></div>);
            default:
        }
        //     return (
        //         <Dashboard updateLogout={this.updateLogoutState}/>
        //     );
        // }
        // return (
        //     <Log updateLogin={this.updateLoginState}/>
        // );
    }

    updateLog = () => {
        this.setState({ isLogin: "Log" });
    }

    updateStudent = () => {
        this.setState({ isLogin: "Student" });
    }

    updateAdmin = () => {
        this.setState({ isLogin: "Admin" });
    }

    updateParent = () => {
        this.setState({ isLogin: "Parent" });
    }

    render() {
        return (
            <div>
                {
                    this.renderContent()
                }
            </div>
        )
    }
}