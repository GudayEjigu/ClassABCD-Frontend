import axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom/dist";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";
import vector2 from "../../assets/Vector2.png";
import { CheckBox } from "@material-ui/icons";
import frame from "../../assets/Frame.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TokenContext } from "../../context/TokenContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setMyToken } = useContext(TokenContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const LoginHandler = () => {
    loginMutationSubmitHandler();
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log("You must have pressed Enter ");
      loginMutationSubmitHandler();
    }
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
            login(responseData?.data?.token, responseData?.data);
            console.log({ user: responseData?.data?.token });
            setMyToken(responseData?.data?.token);
            navigate("/");

            toast.success("Login success!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          },
          onError: (err) => {
            console.log({ err });
            toast(err?.response?.data?.message);
          },
        }
      );
    } catch (err) {
      toast(err?.response?.data?.message ?? "user not found2");
    }
  };
  return (
    <>
      <div className={styles.Rectangle1}>
        <div className=" w-[100%] h-[100vh] overflow-hidden">
          <div className=" py-[10%] pb-[24%]  lg:pt-[2%] lg:flex lg:flex-row lg:pb-[2%]">
            <div className="flex flex-col  ">
              <div className="flex flex-row justify-center lg:justify-start">
                <div className=" w-[30%] h-[30%] my-[4%] lg:w-[11%] lg:h-[90%] lg:ml-[8%] lg:flex lg:flex-justify-end lg:my-[2%] ">
                  <img className=" lg:w-[100%] " alt="vector2" src={vector2} />
                </div>

                <div className=" pl-[0%] pt-[8%] flex flex-col lg:pt-[4%] lg:ml-[2%] ">
                  <p className="   font-inter xs:text-4xl sm:text-5xl md:text-4xl ">
                    classABCD
                  </p>
                  <p className="   font-inter xs:text-4xl sm:text-5xl md:text-4xl text-[#f97316] ">
                    Learning Center
                  </p>
                </div>
              </div>
              <div className=" flex justify-center my-[6%] lg:justify-start lg:ml-[6%]">
                <div className="w-[90%] h-[30%] lg:w-[50%] lg:text-base lg:h-[20%] ">
                  <p>
                    {" "}
                    The classABCD is an online language education website
                    teaching English and Chinese. It is the best platform to
                    learn English, Chinese and many other languages{" "}
                  </p>
                </div>
              </div>
              <div className="flex  justify-center lg:justify-start lg:ml-[6%]">
                <div className=" w-[90%] h-[10%]  lg:w-[50%]">
                  <div className=" flex flex-col  m-[1%] border border-white rounded-lg lg:m-[0%] ">
                    <label className="font-Poppins pl-[8%] pt-[8%] lg:text-base">
                      Phone no:
                    </label>
                    <div class="flex mx-[10%]">
                      <span class="inline-flex items-center  px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                        +251
                      </span>
                      <input
                       placeholder="91173 90 28"
                       onKeyDown={handleKeyDown}
                       onChange={(e) => {
                         setUserName("251" + (e.target.value));
                       }}
                        class="rounded-none rounded-r-lg bg-gray-200 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
                        type="number"
                      />
                    </div>
                  {/* 
                    <p className="mx-[4%] lg:text-base ">
                      +251{" "}
                      <input
                        placeholder="91173 90 28"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        className=" bg-gray-200  w-[80%] my-[4%] rounded-lg lg:py-[2%] lg:text-base"
                        type="number"
                      />
                    </p> */}
                    <label className="font-Poppins pl-[8%] pt-[4%] lg:text-base">
                      Password:
                    </label>

                    <input
                      placeholder="Enter Password"
                      onKeyDown={handleKeyDown}
                      className=" bg-gray-200 mx-[10%] w-[80%] my-[4%] rounded-lg  focus:ring-blue-500 focus:border-blue-500 lg:py-[2%] lg:text-base border-gray-300"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                    />

                    <div class="flex items-start  mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="w-[6%] mt-[1%] ml-[6%] text-blue-600 bg-gray-100 border-[#f97316] rounded focus:ring-blue-500  focus:ring-2 lg:w-[3%] lg:py-[1%] "
                      />
                      <label
                        for="default-checkbox"
                        class="ml-[2%] text-sm font-medium lg:text-base"
                      >
                        Keep me signed in
                      </label>
                    </div>

                    {loginMutation.isLoading ? (
                      <div className="flex justify-center">
                        {" "}
                        <button
                          disabled
                          className="bg-[#00bbf0] w-[60%] py-[4%] my-[4%] rounded-lg "
                        >
                          <p className=" text-white  lg:text-base">Logging</p>
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          onClick={LoginHandler}
                          type="submit"
                          className="bg-[#00bbf0] w-[60%] py-[4%] my-[4%] rounded-lg"
                        >
                          <p className="text-white lg:text-base">Login</p>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <button className="bg-[#f97316] px-[40%] my-[2%] py-[4%] rounded-lg">
                      <div className="text-white lg:text-base">Register</div>
                    </button>
                  </div>
                  <div className="flex justify-center lg:text-base">
                    <button className="py-[4%]">Forgot Password?</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden  lg:w-[75%] lg:flex lg:justify-center">
              <img
                className=" lg:mr-[40%] lg:h-[80%] lg:mt-[10%]"
                alt="frame"
                src={frame}
              />
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
