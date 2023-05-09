import React, { useContext } from "react";
import styles from "./Footer.module.scss";
import vector from "../assets/Vector.png";
import { TokenContext } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { BiLogOut } from "react-icons/bi";

const Footer = () => {
  const { myToken } = useContext(TokenContext);
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {!token ? (
        { logout }
      ) : (
        <>
          <div className={styles.Rectangle32}>
            <div className="flex flex-row font-inter">
              <div className="flex flex-col lg:w-[60%] ">
                <div className="flex flex-row">
                  {" "}
                  <img
                    className="ml-[12%] w-[20%] mt-[4%] lg:w-[10%]"
                    alt="Vector"
                    src={vector}
                  />
                  <div
                    className="flex flex-col ml-[2%] mt-[7%] 
            "
                  >
                    <p className="text-xl font-bold text-white">ClassABCD</p>
                    <p className="text-3xl font-bold">Learning Center</p>
                    <div className=" hidden lg:block">
                      <p>
                        Our mission is to prove that learning a language is fun
                        and rewarding.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex justify-end w-[60%] flex-col font-bold pt-[6%] lg:justify-start lg:flex-row lg:px-[4%] lg:text-2xl lg:font-bold lg:text-white ">
                    <button className="lg:px-[2%]">Home</button>
                    <button className="lg:px-[2%]">About us</button>
                    <button className="lg:px-[2%]">Contact us</button>
                    <button className="lg:px-[2%]">FAQs</button>
                  </div>
                  <div className=" lg:hidden flex w-[10%]  justify-start text-4xl">
                    <button onClick={logout}>
                      <BiLogOut />
                      <p className="text-base flex justify-center">Logout</p>
                    </button>
                  </div>
                </div>
                <div className="hidden  sm:hidden md:block  lg:text-white lg:pt-[1%] lg:flex lg:flex-col lg:ml-[6%]">
                  {" "}
                  <p>Categories:</p>
                  <button
                    onClick={() => {
                      navigate("/english");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="flex lg:pt-[1%]">English</p>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/chineese");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="flex lg:pt-[1%]">Chineese</p>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/scolarship");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="flex lg:pt-[1%]">Scholarship</p>
                  </button>
                </div>
                <p className="flex mb-[1%] justify-center">
                  2023 classABCD.All Rights reserved
                </p>
              </div>{" "}
              <div className=" hidden lg:flex w-[30%]  justify-end text-8xl">
                <button onClick={logout}>
                  <BiLogOut />
                  <p className="text-xl flex justify-end">Logout</p>
                </button>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Footer;
