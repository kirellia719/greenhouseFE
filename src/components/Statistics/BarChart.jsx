import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart(props) {
  const labels = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [50, 67, 45, 45, 40, 34, 42],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${props.labelName}`,
      },
    },
  };
  
  
  
  useEffect(()=>{
    let data_ = []
    let color = ""
    let borderColor = ""
    if(props.labelName == "Nhiệt độ"){
      data_ = [20,23, 30, 27, 25, 22, 23]
      color = "rgba(255, 99, 132, 0.5)"
      borderColor = "rgba(255, 99, 132, 1)"
    } else if (props.labelName == "Độ ẩm không khí"){
      data_ = [70, 80, 75, 56, 90, 95, 80]
      color = "rgba(54, 162, 235, 0.5)"
      borderColor = "rgba(54, 162, 235, 1)"
    } else if (props.labelName == "Cường độ ánh sáng"){
      data_ = [100, 120, 150, 125, 80, 220, 210]
      color = "rgba(255, 206, 86, 0.5)"
      borderColor = "rgba(255, 206, 86, 1)"
    } else{
      data_ = [70, 85, 65, 90, 100, 85, 60];
      color = "rgba(75, 192, 192, 0.5)" 
      borderColor = "rgba(75, 192, 192, 1)"
    }
    setData({
      labels,
      datasets: [
        {
          label: "",
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 1,
          hoverBackgroundColor: color,
          hoverBorderColor: color,
          data: data_,
        },
      ],
    })

  }, [props.labelName])
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [50, 67, 45, 45, 40, 34, 42],
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  return <Bar options={options} data={data} />;
}
