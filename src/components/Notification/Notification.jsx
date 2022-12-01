import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import SideBar from "../common/SideBar";
import fetch from "node-fetch";

var moment = require("moment");

function Notification(props) {
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
      label: "Thời gian",
      field: "time",
      width: 150,
    },
    {
      label: "Thông báo",
      field: "mess",
      width: 270,
    },
  ];

  React.useEffect(() => {
    fetch("http://localhost:4000/notification")
      .then((res) => res.json())
      .then((data) => {
        let id = 0;
        let row = data.map((noti) => {
          return {
            id: id++,
            time: moment(noti.time).format("DD/MM/YYYY HH:mm:ss"),
            mess: noti.message,
          };
        });

        setDatatable({
          columns: column,
          rows: row.reverse(),
        });
      });
  }, []);

  const [datatable, setDatatable] = React.useState({
    columns: [],
    rows: [],
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <SideBar />
        </div>
        <div className="col-9" id="data-box">
          <h3>Thông báo thiết bị</h3>
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            materialSearch
          />
        </div>
      </div>
    </div>
  );
}
export default Notification;
