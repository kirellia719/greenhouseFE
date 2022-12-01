import React, { useState } from "react";
import "./assets/style/App.css";
import SideBar from "./components/common/SideBar";
import "./assets/style/App.css";
import "./assets/style/Main.css";
import Header from "./components/common/Header";

import {
  BrowserRouter as BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import LineChart from "./components/Statistics/LineChart";
import { BarChart } from "./components/Statistics/BarChart";

// Adding font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faSun,
  faTemperatureFull,
  faDroplet,
  faHillRockslide,
  faCirclePlus,
  faCircleMinus,
  faChartLine,
  faGears,
  faHouseChimneyWindow,
  faCircleCheck,
  faFan,
  faLightbulb,
  faPumpSoap,
  faBell,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import SelectProp from "./components/common/SelectProp";
// import DataHistory from "./components/DataHistory";
import DeviceHistory from "./components/Device/DeviceHistory";
import Figure from "./components/Figure/Figure";
import MainPage from "./components/mainPage/MainPage";
import DevicePage from "./components/Device/DevicePage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Notification from "./components//Notification/Notification";
library.add(
  fab,
  faSun,
  faTemperatureFull,
  faHillRockslide,
  faDroplet,
  faCirclePlus,
  faCircleMinus,
  faChartLine,
  faGears,
  faHouseChimneyWindow,
  faCircleCheck,
  faFan,
  faLightbulb,
  faPumpSoap,
  faBell,
  faDoorOpen
);

const App = () => {
  const [selectedProp, setSelectedProp] = useState(0);

  let labelName = "";
  switch (selectedProp) {
    case 0:
      labelName = "Nhiệt độ";
      break;
    case 1:
      labelName = "Độ ẩm không khí";
      break;
    case 2:
      labelName = "Cường độ ánh sáng";
      break;
    case 3:
      labelName = "Độ ẩm đất";
      break;
  }
  function changProp(prop) {
    setSelectedProp(prop);
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/stat">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <SideBar />
              </div>
              <Switch>
                <Route path="/stat/history">
                  <div className="col-9">
                    <DeviceHistory />
                  </div>
                </Route>
                <Route path="/stat/daily-stat">
                  <div className="col-8">
                    <LineChart labelName={labelName} />
                  </div>
                  <div className="col-1">
                    <SelectProp fun={changProp} selectedProp={selectedProp} />
                  </div>
                </Route>
                {/* -------------------------------------- */}
                <Route path="/stat/weekly-stat">
                  <div className="col-8">
                    <BarChart labelName={labelName} />
                  </div>
                  <div className="col-1">
                    <SelectProp fun={changProp} selectedProp={selectedProp} />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
        </Route>
        <Route path="/data">
          <Figure />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/device">
          <DevicePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/notification">
          <Notification />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
