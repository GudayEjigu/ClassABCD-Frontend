import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

import { useNavigate } from "react-router-dom/dist";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/Logo";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const LoginHandler = () => {
    loginMutationSubmitHandler();
  };

  const loginMutation = useMutation(
    async (newData) =>
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}login`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );

  const loginMutationSubmitHandler = async (values) => {
    try {
      loginMutation.mutate(
        { phone: userName, password },
        {
          onSuccess: (responseData) => {
            login(
              responseData?.data?.data?.token,
              responseData?.data?.data?.user
            );
            console.log({ user: responseData?.data?.data });
            navigate("/dashboard");

            toast.success("Success Notification !", {
              position: toast.POSITION.TOP_CENTER,
            });
          },
          onError: (err) => {
            console.log({ err });
            toast(err?.response?.data?.message ?? "user not found");
          },
        }
      );
    } catch (err) {
      toast(err?.response?.data?.message ?? "user not found2");
    }
  };
  return (
    <div className="flex items-center flex-col justify-center min-h-screen  bg-gray-100">
      <div className="px-40  py-6 mt-4 text-left  bg-white border rounded-lg  shadow-lg">
        <Logo className="" />
      </div>
      <div className="px-12  py-6 mt-4 text-left  bg-white border rounded-lg  shadow-lg">
        <h3 className="text-center text-3xl">Login</h3>
        <br />
        <div className="flex-col items-center justify-center py-8">
          <label>Phone no:</label>
          <input
            placeholder="Phone number"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className=" border-2 ml-4 rounded-r px-4 py-1 my-1"
          />
          <br />
          <label>Password:</label>
          <input
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className=" border-2  rounded-r px-4 ml-4 py-1 my-1"
          />
          <br />
          {loginMutation.isLoading ? (
            <>
              {" "}
              <button
                disabled
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-6 mt-4 py-2 ml-56"
              >
                Logging
              </button>
            </>
          ) : (
            <button
              onClick={LoginHandler}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-6 mt-4 py-2 ml-56"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
