import React from "react";

export default class TWeek extends React.Component {
    constructor(props) {
        super(props);
    }



    chooseWeekonWeek = () => {
        return (
            <div>
                <input type="button" value="Xác nhận" />
                <input type="button" value="Quay lại" onClick={() => this.props.backweek()} />
            </div>
        )
    }

    render() {
        return (
            <div>
                <p>Tính năng này sẽ được cập nhật trong phiên bản tiếp theo.</p>
                {this.chooseWeekonWeek()}
            </div>
        )
    }
}