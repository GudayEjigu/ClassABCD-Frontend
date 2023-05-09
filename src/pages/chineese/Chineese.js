import React, { useContext, useState } from "react";
import styles from "./Chineese.module.scss";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ClampLines from "react-clamp-lines";
import { LanguageContext } from "../../context/LanguageContext";

const Chineese = () => {
  const navigate = useNavigate();
  const {
    isEnglishLang,
    setIsEnglishLang,
    isAmharicLang,
    setIsAmharicLang,
    isOromoLang,
    setIsOromoLang,
  } = useContext(LanguageContext);

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const [counter, setCounter] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const ScolarshipPageData = useQuery(
    ["ScolarshipPageDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}homepage`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const Category1 = useQuery(
    ["Category1Api"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}posts-by-category/1`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const Category2 = useQuery(
    ["Category2Api"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}posts-by-category/2`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  const Category3 = useQuery(
    ["Category3Api"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}posts-by-category/3`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  console.log(ScolarshipPageData?.data?.data);
  return (
    <>
      <div className="w-[100%] h-[100%]  overflow-hidden">
        <div className="">
          <div className="flex font-inter ">
            <div className="flex flex-col w-[100%] ">
              <div className="flex flex-row lg:ml-[4%]">
                <div>
                  <button onClick={() => navigate("/")}>
                    <img
                      className=" w-[90%] my-[4%] lg:m-[1%] ml-[6%] lg:ml-]|[0%] mt-[16%] lg:mt-[70%] "
                      alt="Vector"
                      src={vector2}
                    />
                  </button>
                </div>
                <div className="pl-[0%] pt-[8%] flex flex-col lg:pt-[5%] lg:pl-[0%]">
                  <p className="font-inter xs:text-4xl sm:text-xl md:text-xl lg:text-2xl">
                    <button onClick={() => navigate("/")}>ClassABCD</button>
                  </p>
                  <p className=" font-inter xs:text-4xl sm:text-xl md:text-xl lg:text-2xl  text-[#f97316] ">
                    <button onClick={() => navigate("/")}>
                      Learning Center
                    </button>
                  </p>
                </div>
                <div className=" hidden w-[0%] h-[0%]  lg:w-[60%]  lg:block  lg:px-[10%] lg:py-[2%] lg:my-[2%]">
                  <div className="bg-blue-100 bg-opacity-50  rounded-lg bg-clip-padding">
                    <div className=" flex flex-row justify-center  px-[10%] py-[2%] my-[2%] lg:text-2xl">
                      <button
                        className=" mx-[1%]"
                        onClick={() => {
                          navigate("/scolarship");
                        }}
                      >
                        Scholarship
                      </button>
                      <button
                        className=" mx-[10%]"
                        onClick={() => {
                          navigate("/english");
                        }}
                      >
                        English
                      </button>
                      <button
                        className=" mx-[1%] bg-gray-500 text-white px-[5%] rounded-md "
                        onClick={() => {
                          navigate("/chineese");
                        }}
                      >
                        Chineese
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className=" ml-[8%] lg:ml-[1%]   px-[4%] lg:px-[2%] my-[6%] lg:my-[4%] rounded-lg bg-[#f97316]"
                  onClick={() => navigate("/search")}
                >
                  <img className="w-[500%]" alt="Vector" src={vector3} />
                </button>

                <Button
                  className=" ml-[6%]  px-[4%]  my-[4%] rounded-lg flex flex-col"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img alt="Vector" src={vector4} />
                  <p className="text-[#f97316]">Language </p>
                </Button>
                <Menu
                  id="basic-menu"
                  sx={{
                    left: { xs: "0%", lg: "0%" },
                    top: { xs: "0%", lg: "-10%" },
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsEnglishLang(true);
                      setIsAmharicLang(false);
                      setIsOromoLang(false);
                    }}
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsEnglishLang(false);
                      setIsAmharicLang(true);
                      setIsOromoLang(true);
                    }}
                  >
                    Amharic
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsEnglishLang(false);
                      setIsAmharicLang(false);
                      setIsOromoLang(true);
                    }}
                  >
                    Oromiffa
                  </MenuItem>
                </Menu>
              </div>

              <div className=" lg:hidden lg:w-[0%] lg:h-[0%] px-[10%] py-[2%] my-[2%]">
                <div className=" bg-blue-100 bg-opacity-50  rounded-lg bg-clip-border">
                  {" "}
                  <div className=" flex flex-row justify-center  px-[10%] py-[2%] my-[2%]">
                    <button
                      className="  mx-[1%]  rounded-lg "
                      onClick={() => {
                        navigate("/scolarship");
                      }}
                    >
                      Scholarship
                    </button>
                    <button
                      className=" mx-[5%]"
                      onClick={() => {
                        navigate("/english");
                      }}
                    >
                      English
                    </button>
                    <button
                      className=" mx-[1%] bg-white px-[5%] rounded-md"
                      onClick={() => {
                        navigate("/chineese");
                      }}
                    >
                      Chineese
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start lg:pl-[2%] text-xl my-[2%]">
                Chineese
              </div>
              <div className="grid lg:grid-cols-4 m-[4%]   ">
                {Category2?.data?.data?.data?.map((item, i) => {
                  return (
                    <>
                      <div key={item}>
                        <div className="flex flex-col   m-[4%]  ">
                          <button
                            onClick={() => {
                              navigate(`/details/${item.id}`);
                            }}
                          >
                            <div ClassName="">
                              <img
                                ClassName=""
                                alt="unsplash"
                                src={item?.thumbnail?.link}
                              />
                            </div>

                            <p className={styles.date}>
                              {item.category.created_at}
                            </p>

                            {isEnglishLang ? (
                              <>
                                {" "}
                                <p ClassName="font-bold"><b>{item.title.english}</b></p>
                                <p ClassName="">{item.body.english}</p>
                              </>
                            ): isAmharicLang ? (
                              <>
                                {" "}
                                <p ClassName="font-bold"><b>{item.title.amharic}</b></p>
                                <p ClassName="">{item.body.amharic}</p>
                              </>
                            ) :  (
                              <>
                                {" "}
                                <p ClassName="font-bold"><b>{item.title.oromiffa}</b></p>
                                <p ClassName="">{item.body.oromiffa}</p>
                              </>
                            )  }
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Chineese;
