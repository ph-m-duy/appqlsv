import React from "react";

export default class TDayTable extends React.Component {

   
    weekTable = () => {
        return (
            <div>
                <table border="1" className="subjectable">
                    <thead>
                        <tr>
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
                    </thead>
                    <tbody className="BodySubTable">
                            <tr>
                                <td colspan="2"> 2 </td>
                                <td colspan="2"> 3 </td>
                                <td colspan="2"> 2 </td>
                                <td colspan="2"> 2 </td>
                                <td colspan="2"> 2 </td>
                                <td colspan="2"> 2 </td>
                                <td colspan="2"> 9 </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }



}