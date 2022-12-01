import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
const mqttclient = require("../../scripts/MQTTConnect");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
var moment = require("moment");

async function fetchData(topic_) {
  const data = await fetch(
    `https://io.adafruit.com/api/v2/CanhHoang/feeds/${topic_}/data?limit=20`
  );
  let datajson = await data.json();
  let labels = datajson.map((element) =>
    moment(element.created_at).format("HH:mm:ss")
  );
  let datas = datajson.map((element) => element.value);
  datas = datas.reverse();
  labels = labels.reverse();
  return { labels, datas };
}

const LineChart = (props) => {
  const options = {
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${props.labelName}`.toUpperCase(),
      },
    },
  };
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    let topic = "";
    if (props.labelName === "Nhiệt độ") {
      topic = "gh-temp";
    } else if (props.labelName === "Độ ẩm không khí") {
      topic = "gh-hum";
    } else if (props.labelName === "Cường độ ánh sáng") {
      topic = "gh-light";
    } else if (props.labelName === "Độ ẩm đất") {
      topic = "gh-soil";
    }
    if (topic !== "") {
      fetchData(topic).then((data) => {
        setChartData({
          labels: data.labels,
          datasets: data.datas,
        });
      });
    }
  }, [props.labelName]);

  mqttclient.on("message", async (topic) => {
    const feed = topic.split("/")[2];
    let res_data;
    if (feed === "GH_TEMP") {
      res_data = await fetchData("gh-temp");
      console.log(res_data);
    } else if (feed === "GH_HUM") {
      res_data = await fetchData("gh-hum");
    } else if (feed === "GH_LIGHT") {
      res_data = await fetchData("gh-light");
    } else if (feed === "GH_SOIL") {
      res_data = await fetchData("gh-soil");
    }
    setChartData({
      labels: res_data.labels,
      datasets: res_data.datas,
    });
  });

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        fill: true,
        label: props.labelName,
        data: chartData.datasets,
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
