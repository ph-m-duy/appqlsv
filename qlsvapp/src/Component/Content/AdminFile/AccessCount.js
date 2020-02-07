import React from "react";
import request from "request";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div className="accCount">
                   <p>Tính năng này sẽ được cập nhật trong phiên bản sau.</p>
                </div>
            </div>
        );
    }
}
