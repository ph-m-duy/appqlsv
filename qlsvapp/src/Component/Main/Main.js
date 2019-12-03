import React from 'react';
import './Page.css';
import Log from './LogPage';
import Dashboard from './DashBoard';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    renderContent = () => {
        if (this.state.isLogin) {
            return (
                <Dashboard updateLogout={this.updateLogoutState}/>
            );
        }
        return (
            <Log updateLogin={this.updateLoginState}/>
        );
    }

    updateLoginState = () => {
        this.setState({isLogin:true});
    }

    updateLogoutState= () => {
        this.setState({isLogin:false});
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