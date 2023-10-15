import React from "react";
import { Routes, Route } from "react-router-dom";

// internal files
import Home from "../pages/Home";
import Chats from "../pages/Chats";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </>
  );
};

export default Router;
