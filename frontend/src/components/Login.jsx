import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the details", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:7000/api/v1/auth/login",
        { email, password },
        config
      );

      toast.success("Login Successfull!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      localStorage.setItem("userinfo", JSON.stringify(data));
      navigate("/chats");
    } catch (err) {
      toast.error("Wrong credentials!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="pt-7">
      <form className="flex items-center justify-center flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          className="p-[10px] bg-none border rounded-md border-gray-400 w-full bg-transparent text-black outline-none"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          className="p-[10px] bg-none border rounded-md border-gray-400 outline-none w-full bg-transparent text-black"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button
          value="Login"
          className="border-none bg-blue-900 text-white w-full rounded-md p-2 hover:cursor-pointer mt-4"
          onClick={loginHandler}
        >
          {" "}
          Login{" "}
        </button>
        <button
          className="border-none bg-red-600 text-white w-full rounded-md p-2 hover:cursor-pointer"
          onClick={(e) => {
            setEmail("guest@example.com");
            setPassword("123456");
            e.preventDefault();
          }}
        >
          Login as Guest
        </button>
      </form>
    </div>
  );
};

export default Login;
