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

const data = [
  {
    name: "Tháng 9",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Tháng 10",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Tháng 11",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Tháng 12",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Tháng 1",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Tháng 2",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Tháng 3",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Tháng 3",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/9hjfkp73/";

  MoChart = () => {
    var options = {
      method: 'POST',
      url: 'http://localhost:8081/MoneyChart',
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
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
        <Bar dataKey="uv" fill="#ffc658" />
      </BarChart>
      </div>
    );
  }
}
