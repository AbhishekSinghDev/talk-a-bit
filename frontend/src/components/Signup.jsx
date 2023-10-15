import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (pics === undefined) {
      toast.warn("🦄 Please upload a picture!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      toast.info("🦄 Uploading Image", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dhckd5nam");

      fetch("https://api.cloudinary.com/v1_1/dhckd5nam/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          toast.success("🦄 Image uploaded successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warn("🦄 Please select an image!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !pic) {
      toast.error("Please fill all the fields!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password do not match", {
        position: "top-right",
        autoClose: 5000,
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
        "http://localhost:7000/api/v1/auth/register",
        { name, email, password, pic },
        config
      );

      console.log(data);
      toast.success("Registration Successfull!", {
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
      toast.error("Some server error", {
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
          type="text"
          placeholder="Username"
          required
          className="p-[10px] bg-none border rounded-md border-gray-400 outline-none w-full bg-transparent text-black"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Email"
          required
          className="p-[10px] bg-none border rounded-md border-gray-400 outline-none w-full bg-transparent text-black"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          required
          className="p-[10px] bg-none border rounded-md border-gray-400 outline-none w-full bg-transparent text-black"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          className="p-[10px] bg-none border rounded-md border-gray-400 outline-none w-full bg-transparent text-black"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <input
          type="file"
          className="pt-4 text-black hover:cursor-pointer"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></input>

        <button
          // type="submit"  don't forget to handle default behavious of react forms
          value="Signup"
          className="border-none bg-blue-900 text-white w-full rounded-md p-2 hover:cursor-pointer mt-4"
          onClick={signupHandler}
        >
          {" "}
          Signup{" "}
        </button>
      </form>
    </div>
  );
};

export default Signup;
