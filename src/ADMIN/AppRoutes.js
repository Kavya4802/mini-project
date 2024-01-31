// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ViewUsers from "./ViewUsers";
import AddBike from "./AddBike";
import ViewBike from "./ViewBike";
import Update from "./Update";


function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="content" element={<Content />} /> */}
          <Route path="/addbike" element={<AddBike />} />
          <Route path="/viewbike" element={<ViewBike />} />
          <Route path="/bikeupdate/:id" element={<Update />} />
          <Route path="/viewuser" element={<ViewUsers />} />
        </Route>
      </Routes>
    );
  }
  

export default AppRoutes;
