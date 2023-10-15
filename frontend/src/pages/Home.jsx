import React, { useState } from "react";
import { Link } from "react-router-dom";

// internal files
import bgImg from "../assets/loginbg.jpg";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {
  const [tab, setTab] = React.useState("login");

  const customBackgroundStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section style={customBackgroundStyle}>
      <div className="pl-[100px] pr-[100px] bg-black bg-opacity-80">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="border rounded-2xl p-8 bg-white">
            <div className="flex items-center justify-center gap-4">
              <button
                className={` ${
                  tab === "login" && "bg-blue-900 border-none text-white "
                } border border-black rounded-md pt-4 pb-4 pl-[60px] pr-[60px] flex justify-center items-center hover:bg-blue-900 hover:text-white`}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={`${
                  tab === "signup" && "bg-blue-900 border-none text-white"
                } border border-black rounded-md pt-4 pb-4 pl-[60px] pr-[60px] flex justify-center items-center  hover:bg-blue-900 hover:text-white`}
                onClick={() => setTab("signup")}
              >
                Signup
              </button>
            </div>

            <div>
              {tab === "login" && <Login />}
              {tab === "signup" && <Signup />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
