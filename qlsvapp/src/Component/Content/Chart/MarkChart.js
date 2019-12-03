import React, { PureComponent } from "react";
import request from "request";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


var data = [
  {
    name: "Đại số",
    DiemDuKien: 4000,
    DiemThucTe: 2400,
    amt: 2400
  },
  {
    name: "Giải tích 1",
    DiemDuKien: 3000,
    DiemThucTe: 1398,
    amt: 2210
  },
  {
    name: "NLCB Mác 1",
    DiemDuKien: 2000,
    DiemThucTe: 9800,
    amt: 2290
  },
  {
    name: "Thể chất A",
    DiemDuKien: 2780,
    DiemThucTe: 3908,
    amt: 2000
  },
  {
    name: "Quốc phòng 1",
    DiemDuKien: 1890,
    DiemThucTe: 4800,
    amt: 2181
  },
  {
    name: "Vật lý 1",
    DiemDuKien: 2390,
    DiemThucTe: 3800,
    amt: 2500
  },
  {
    name: "Giải tích 2",
    DiemDuKien: 3490,
    DiemThucTe: 4300,
    amt: 2100
  }
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/q4eonc12/";

  MaChart = () => {
    var options = {
      method: 'POST',
      url: 'http://localhost:8081/MarkChart',
      headers:
      {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Length': '0',
        'Accept-Encoding': 'gzip, deflate',
        Host: 'localhost:8081',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'Content-Type': 'application/json',
        body: {}
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
  }

  render() {
    return (
      <div>
        <p>Biểu đồ điểm môn học theo dự kiến và thực tế kì học 20171</p>
        <BarChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 50
          }}
          padding={{
            top: 500,
            right: 30,
            left: 20,
            bottom: 50
          }}
          background={{ fill: "rgb(175, 206, 211)" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="DiemDuKien"
            fill="#8884d8"
          />
          <Bar dataKey="DiemThucTe" fill="#82ca9d" />
        </BarChart>
      </div>
    );
  }
}
