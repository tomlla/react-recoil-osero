import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { RouteDefinitions } from "./RouteDefinitions";

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <RouteDefinitions />
  </React.StrictMode>
)
