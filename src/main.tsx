import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouteDefinitions } from "./RouteDefinitions";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouteDefinitions />
    </RecoilRoot>
  </React.StrictMode>
);
