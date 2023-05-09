import React, { useContext, useState } from "react";
import styles from "./SearchPage.module.scss";
import { useNavigate } from "react-router-dom";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import vector5 from "../../assets/Vector5.png";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/auth";
import { useMutation, useQuery } from "react-query";
import ClampLines from "react-clamp-lines";
import unsplash4 from "../../assets/unsplash4.png";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { LanguageContext } from "../../context/LanguageContext";
import { Button, Menu, MenuItem } from "@mui/material";

const SearchPage = () => {
  const navigate = useNavigate();
  const {
    isEnglishLang,
    setIsEnglishLang,
    isAmharicLang,
    setIsAmharicLang,
    isOromoLang,
    setIsOromoLang,
  } = useContext(LanguageContext);
  const [search, setSearch] = useState(null);
  const [SearchApi, setSearchApi] = useState(null);

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
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const SearchData = useQuery(
    ["SearchDataApi", SearchApi],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}search-post?search_text=${search}`,
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
        setSearchApi(null);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  const Search = () => {
    console.log(search);
    setSearchApi(1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log("You must have pressed Enter ");
      setSearchApi(1);
    }
  };

  const HomePageData = useQuery(
    ["HomePageDataApi"],
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
                  <p className="font-inter xs:text-4xl sm:text-3xl md:text-3xl lg:text-2xl">
                    <button onClick={() => navigate("/")}>ClassABCD</button>
                  </p>
                  <p className=" font-inter xs:text-4xl sm:text-3xl md:text-3xl lg:text-2xl  text-[#f97316] ">
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
                        className=" mx-[1%]"
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
                      className=" mx-[1%]"
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
                      className=" mx-[1%]"
                      onClick={() => {
                        navigate("/chineese");
                      }}
                    >
                      Chineese
                    </button>
                  </div>
                </div>
              </div>
              <div ClassName=" flex  flex-row  ">
                <input
                  className="w-[60%] rounded-lg  border border-black  my-[8%] ml-[8%] pl-[2%] lg:h-8"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  />

                <button
                  className="w-[20%] ml-[4%] px-[2%] bg-[#f97316] rounded-lg lg:w-[10%] lg:h-16 lg:pl-[3%] "
                  onClick={Search}
                  
                >
                  <div>
                    <p ClassName=" bg-[#f97316] p-[40%]  ">Search</p>
                  </div>
                </button>
              </div>

              <div className="lg:flex lg:flex-row lg:h-[25%]">
                <div className="lg:flex lg:flex-col lg:w-[70%]  lg:pr-[18%]">
                  <div className="flex justify-center lg:justify-start lg:pl-[2%] text-3xl my-[2%]">
                    Results
                  </div>
                  {SearchData.isFetching ? (
                    <div className="h-44 flex items-center justify-center min-h-0">
                      <div ClassName="">
                        <ThreeCircles
                          height="100"
                          width="300"
                          color="#f97316"
                          ariaLabel="ThreeCircles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      </div>
                    </div>
                  ) : SearchData?.data?.data?.length === 0 ? (
                    <>
                      <div>
                        <p ClassName=" flex justify-center p-[4%]">
                          {" "}
                          No Results.
                        </p>
                      </div>
                    </>
                  ) : SearchData.isFetched ? (
                    <div className="flex flex-col ">
                      <div ClassName="">
                        {SearchData?.data?.data?.map((item, i) => {
                          return (
                            <>
                              <div key={item}>
                                <div className="flex flex-col m-2 mb-[16%] lg:mb-[6%] lg:pl-[8%] ">
                                  <div ClassName="">
                                    <div className="flex flex-col  lg:flex-row ">
                                      {isEnglishLang ? (
                                        <>
                                          <button
                                            className="flex"
                                            onClick={() => {
                                              navigate(`/details/${item.id}`);
                                            }}
                                          >
                                            <img
                                              className=" h-48 lg:h-48  lg:w-48 object-cover"
                                              alt="unsplash"
                                              src={item?.thumbnail?.link}
                                            />

                                            <div className="flex flex-col">
                                              <p ClassName="">
                                                <ClampLines
                                                  text={item.body.english}
                                                  id="really-unique-id"
                                                  lines={4}
                                                  ellipsis="..."
                                                  moreText=""
                                                  lessText=""
                                                  className="custom-class"
                                                  innerElement="p"
                                                />
                                              </p>
                                              <p ClassName="mb-[8%]">
                                                {" "}
                                                {item.created_at}
                                              </p>
                                            </div>
                                          </button>
                                        </>
                                      ) : isAmharicLang ? (
                                        <>
                                          {" "}
                                          <button
                                            onClick={() => {
                                              navigate(`/details/${item.id}`);
                                            }}
                                          >
                                            <img
                                              className=" h-48 lg:h-48  lg:w-48 object-cover"
                                              alt="unsplash"
                                              src={item?.thumbnail?.link}
                                            />
                                            <div className="flex flex-col">
                                              <p ClassName="">
                                                <ClampLines
                                                  text={item.body.amharic}
                                                  id="really-unique-id"
                                                  lines={4}
                                                  ellipsis="..."
                                                  moreText=""
                                                  lessText=""
                                                  className="custom-class"
                                                  innerElement="p"
                                                />
                                              </p>
                                              <p ClassName="mb-[8%]">
                                                {" "}
                                                {item.created_at}
                                              </p>
                                            </div>
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            onClick={() => {
                                              navigate(`/details/${item.id}`);
                                            }}
                                          >
                                            {" "}
                                            <img
                                              className=" h-48 lg:h-48  lg:w-48 object-cover"
                                              alt="unsplash"
                                              src={item?.thumbnail?.link}
                                            />
                                            <div className="flex flex-col">
                                              <p ClassName="">
                                                <ClampLines
                                                  text={item.body.oromiffa}
                                                  id="really-unique-id"
                                                  lines={4}
                                                  ellipsis="..."
                                                  moreText=""
                                                  lessText=""
                                                  className="custom-class"
                                                  innerElement="p"
                                                />
                                              </p>
                                              <p ClassName="mb-[8%]">
                                                {" "}
                                                {item.created_at}
                                              </p>
                                            </div>
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className=" hidden  w-[30%] lg:flex  lg:flex-col">
                  <p>Most Recent</p>
                  <div className=" lg:block">
                    <div>
                      {HomePageData?.data?.data?.popularPosts?.map(
                        (item, i) => {
                          return i < 4 ? (
                            <>
                              <div key={item}>
                                <div className="flex flex-col bg-white lg:my-[8%] lg:mr-[4%] lg:p-[2%] rounded lg">
                                  <div>
                                    <div className="flex flex-col">
                                    <div className="flex flex-row">
                                      {" "}
                                      <div
                                        className="    lg:max-w-[30%]
                                            "
                                      >
                                        <img
                                          className="   rounded-lg object-cover lg:overflow-clip lg:max-w-[100%] lg:w-w-[100%]"
                                          alt="unsplash"
                                          src={item?.thumbnail?.link}
                                        />
                                      </div>
                                      {isEnglishLang ? (
                                        <>
                                          <div className="flex flex-col lg:h-[100%] ">
                                            <button
                                              onClick={() => {
                                                navigate(`/details/${item.id}`);
                                              }}
                                            >
                                              <p>
                                                <ClampLines
                                                  className=" lg:w-[100%] lg:h-[0%] lg:pr-[0%] lg:text-sm "
                                                  text={item.body.english}
                                                  id="really-unique-id"
                                                  lines={3}
                                                  ellipsis="..."
                                                  moreText=""
                                                  lessText=""
                                                  innerElement="p"
                                                />
                                              </p>
                                            </button>
                                          
                                          </div>
                                        </>
                                      ) : isAmharicLang ? (
                                        <>
                                          {" "}
                                          <div className="flex flex-col">
                                            <button
                                              onClick={() => {
                                                navigate(`/details/${item.id}`);
                                              }}
                                            >
                                              <p>
                                                <ClampLines
                                                  className=" lg:w-[100%] lg:h-[0%] lg:pr-[0%] lg:text-sm "
                                                  text={item.body.amharic}
                                                  id="really-unique-id"
                                                  lines={4}
                                                  ellipsis="..."
                                                  moreText=""
                                                  lessText=""
                                                  innerElement="p"
                                                />
                                              </p>
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <div className="flex flex-col">
                                            <button
                                              onClick={() => {
                                                navigate(`/details/${item.id}`);
                                              }}
                                            >
                                              <p>
                                                <ClampLines
                                                  className=" lg:w-[100%] lg:h-[0%] lg:pr-[0%] lg:text-sm "
                                                  text={item.body.oromiffa}
                                                  id="really-unique-id"
                                                  lines={4}
                                                  ellipsis="..."
                                                  moreText=""
                                                  lessText=""
                                                  innerElement="p"
                                                />
                                              </p>
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
  <p className="lg:text-xs lg:ml-[2%]">
                                              {" "}
                                              {item.created_at}
                                            </p>                                      
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null;
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[50vh] sm:mt-[0%] md:mt-[0%] lg:mt-[0%]"></div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
