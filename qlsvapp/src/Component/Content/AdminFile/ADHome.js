import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="ADHome">
          <p>Chào mừng bạn đến với trang quản lí của Admin</p>
          <p>Trong trang này bạn có thể:</p>
          <ul>
              <li>Xem thống kê truy nhập</li>
              <li>Xem và thêm xóa tài khoản sinh viên</li>
              <li>Xem và thêm xóa danh sách môn học</li>
              <li>Cập nhật năm học kì học tuần học</li>
          </ul>
        </div>
      </div>
    );
  }
}
