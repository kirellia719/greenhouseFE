import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import "../../assets/style/App.css";
var moment = require("moment");
export default function DeviceHistory() {
  const column = [
    {
      label: "ID",
      field: "id",
      width: 150,
      attributes: {
        "aria-controls": "DataTable",
        "aria-label": "Name",
      },
    },
    {
      label: "Tên thiết bị",
      field: "name",
      width: 270,
    },
    {
      label: "Thời gian bật tắt",
      field: "time",
      width: 200,
    },
    {
      label: "Trạng thái",
      field: "status",
      sort: "asc",
      width: 100,
    },
    {
      label: "Người bật/tắt",
      field: "username",
      sort: "disabled",
      width: 150,
    },
  ];

  React.useEffect(() => {
    fetch("http://localhost:4000/getdevicedetail")
      .then((res) => res.json())
      .then((data) => {
        let id = 0;
        let name = "";
        let row = data.map((device) => {
          if (device.name == "FAN") {
            name = "Quạt công nghiệp";
          } else if (device.name == "LIGHT") {
            name = "Đèn sợi đốt";
          } else if (device.name == "PUMP") {
            name = "Máy bơm";
          }
          let history = device.history.map((history) => {
            let data = {
              id: id++,
              name: name,
              time: moment(history.time).format("DD/MM/YYYY HH:mm:ss"),
              status: history.status ? "Bật" : "Tắt",
              username: history.username ? history.username : "Tự động",
            };
            return data;
          });
          return history;
        });
        setDatatable({
          columns: column,
          rows: row.flat().reverse(),
        });
      });
  }, []);

  const [datatable, setDatatable] = React.useState({});

  return (
    <>
      <div id="data-box">
        <h3>thống kê lịch sử thiết bị</h3>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 10, 15]}
          entries={5}
          pagesAmount={3}
          data={datatable}
        />
      </div>
    </>
  );
}
