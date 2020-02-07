import React from "react"
import request from "request";

export default class MoTerm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Tính năng này sẽ được cập nhật trong phiên bản tiếp theo.</p>
                <input type="button" onClick={() => this.props.backterm()} value="Quay lại" />
            </div>
        )
    }
}