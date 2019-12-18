import React from "react"
import request from "request";

export default class MoTerm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            givemoney: 0,
            addmoney: 0,
            olaymoney: 0,
            addlearnmoney: 0,
            allmoney: 0,
            savemoney: 0,
            checkterm: false
        }
    }

    selectMoTerm = (_term, _givemoney, _addmoney, _olaymoney, _addlearnmoney) => {
        var options = {
            method: 'POST',
            url: 'http://localhost:8081/MoneyTermManage',
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'Content-Length': '0',
                'Accept-Encoding': 'gzip, deflate',
                Host: 'localhost:8081',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selecttype: "term",
                term: _term,
                givemoney: _givemoney,
                addmoney: _addmoney,
                oplaymoney: _olaymoney,
                addlearnmoney: _addlearnmoney
            })
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }


    updateVal = (val, e) => {
        let _val = e.target.value ? e.target.value : 0
        switch (val) {
            case "givemoney":
                this.setState({
                    givemoney: _val
                })
                break;
            case "addmoney":
                this.setState({
                    addmoney: _val
                })
                break;
            case "olaymoney":
                this.setState({
                    olaymoney: _val
                })
                break;
            case "addlearnmoney":
                this.setState({
                    addlearnmoney: _val
                })
                break;
            default:
        }
    }


    inputMoney = () => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.term = this.props.termterm;
        return (
            <div>
                <p>Nhập số tiền bạn được phụ huynh cấp trong kì {this.state.term}:</p>
                <p>Tổng học phí của bạn kì này:</p>
                <p> <input type="text" value="15.000.000" /> đồng</p>
                <ul>
                    <p> Số tiền chi tiêu và làm thêm:</p>
                    <li>
                        <p>Nhập số tiền được chu cấp kì này của bạn:</p>
                        <p><input type="text" value={parseInt(this.state.givemoney)} onChange={e => this.updateVal("givemoney", e)} /> đồng</p>
                    </li>
                    <li>
                        <p>Nhập số tiền bạn kiếm được khi làm thêm (nếu có) kỳ này:</p>
                        <p><input type="text" value={parseInt(this.state.addmoney)} onChange={e => this.updateVal("addmoney", e)} /> đồng</p>
                    </li>
                    <ul>
                        <p>=> Tổng số tiền bạn có trong kì này là:</p>
                        <p> <input type="text" value={this.state.allmoney} /> đồng</p>
                        <li>
                            <p>>Nhập số tiền dành cho việc chơi và sinh hoạt:</p>
                            <p><input type="text" value={parseInt(this.state.olaymoney)} onChange={e => this.updateVal("olaymoney", e)} /> đồng</p>
                        </li>
                        <li>
                            <p>Nhập số tiền dành cho việc học thêm:</p>
                            <p><input type="text" value={parseInt(this.state.addlearnmoney)} onChange={e => this.updateVal("addlearnmoney", e)} /> đồng</p>
                        </li>
                        <li>
                            <p> => Số tiền tiết kiệm được:</p>
                            <p><input type="text" value={this.state.savemoney} /> đồng</p>
                        </li>
                    </ul>
                </ul>
                <input type="button" value="Xác nhận" onClick={() => this.selectMoTerm(this.state.term, this.state.givemoney, this.state.addmoney, this.state.olaymoney, this.state.addlearnmoney)}  />
                <input type="button" onClick={() => this.props.backterm()} value="Quay lại" />
            </div >
        )
    }

    render() {
        return (
            <div>
                {this.inputMoney()}
            </div>
        )
    }
}