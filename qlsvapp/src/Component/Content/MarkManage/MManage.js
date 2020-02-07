import React from "react";

export default class TManage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <input type="button" value="Danh sách môn học" onClick={() => this.props.selectsubject()} />
                <input type="button" value="Điểm số dự kiến" onClick={() => this.props.selectmark()} />
            </div>
        );
    }
}

