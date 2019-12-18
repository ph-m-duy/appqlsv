import React from "react";


export default class TDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectweek: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            selectweek: event.target.value
        })
    }

    dayTable = () => {
        return (
            <div className="table">
                <table border="1">
                    <tr>
                        <th rowspan="2" colspan="3">Thứ</th>
                        <th colspan="4">Học và Nghiên cứu</th>
                        <th colspan="4">Làm và Học thêm</th>
                        <th colspan="8">Sinh hoạt và Vui chơi</th>
                    </tr>
                    <tr>
                        <th colspan="2">Ở Trường</th>
                        <th colspan="2">Ở Nhà</th>
                        <th colspan="2">Đi Làm</th>
                        <th colspan="2">Học Thêm</th>
                        <th colspan="2">Vui Chơi</th>
                        <th colspan="2">Thể Thao</th>
                        <th colspan="2">Sinh Hoạt</th>
                    </tr>
                    <tr>
                        <td colspan="3">Thứ Hai</td>
                        <td colspan="2">   </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                    <tr>
                        <td colspan="3">Thứ Ba</td>
                        <td colspan="2"> 4 </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                    <tr>
                        <td colspan="3">Thứ Tư</td>
                        <td colspan="2"> 4 </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                    <tr>
                        <td colspan="3">Thứ Năm</td>
                        <td colspan="2"> 4 </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                    <tr>
                        <td colspan="3">Thứ Sáu</td>
                        <td colspan="2"> 4 </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                    <tr>
                        <td colspan="3">Thứ Bảy</td>
                        <td colspan="2"> 4 </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                    <tr>
                        <td colspan="3">Chủ Nhật</td>
                        <td colspan="2"> 4 </td>
                        <td colspan="2"> 3 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 2 </td>
                        <td colspan="2"> 9 </td>
                    </tr>
                </table>
            </div>
        )
    }


    chooseDayonDay = () => {
        return (
            <div>
                <input type="button" value="Xác nhận"  />
                <input type="button" value="Quay lại" onClick={() => this.props.backday()} />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.dayTable()}
                {this.chooseDayonDay()}
            </div>
        )
    }
}