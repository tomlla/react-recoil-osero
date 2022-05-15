import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { OseroPage } from "./osero/OseroPage";
import { App } from "./App";

export const RouteDefinitions: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="osero" element={<OseroPage />} />
          <Route path="example" element={<App />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
