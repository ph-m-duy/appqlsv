import React from "react";
import SubMa from "./NewSubManage";
import MarkHope from "./MarkHopeMa";
import MManage from "./MManage";
import request from "request";

export default class MarkSub extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Tính năng này sẽ được cập nhật trong bản update sau.</p>
                <input className="SubListSend" type="button" value="Quay lại" onClick={() => this.props.backmark()} />
            </div>
        )
    }
}