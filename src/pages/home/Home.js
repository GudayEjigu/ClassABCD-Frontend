import React, { useContext, useState } from "react";
import styles from "./Home.module.scss";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import { useNavigate } from "react-router-dom";
import unsplash3 from "../../assets/unsplash3.png";
import unsplash4 from "../../assets/unsplash4.png";
import unsplash5 from "../../assets/unsplash5.png";
import Footer from "../../components/Footer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ClampLines from "react-clamp-lines";
import { LanguageContext } from "../../context/LanguageContext";
import { ThreeCircles } from "react-loader-spinner";

const Home = () => {
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
  console.log(HomePageData?.data?.data);
  return (
    <>
      <div className="w-[100%] h-[100%]  overflow-hidden">
        <div className={styles.Rectangle1}>
          <div className="flex font-inter ">
            <div className="flex flex-col w-[100%] ">
              <div className="flex flex-row lg:ml-[4%]">
                <div>
                  <img
                    className=" w-[90%] my-[4%] lg:m-[1%] ml-[6%] lg:ml-]|[0%] mt-[16%] lg:mt-[70%] "
                    alt="Vector"
                    src={vector2}
                  />
                </div>
                <div className="pl-[0%] pt-[8%] flex flex-col lg:pt-[5%] lg:pl-[0%]">
                  <p className="font-inter xs:text-4xl sm:text-3xl md:text-3xl lg:text-2xl">
                    ClassABCD
                  </p>
                  <p className=" font-inter xs:text-4xl sm:text-3xl md:text-3xl lg:text-2xl  text-[#f97316] ">
                    Learning Center
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

              <div className=" lg:hidden lg:w-[100%] lg:h-[0%] px-[10%] py-[2%] my-[2%]">
                <div className=" bg-blue-100 bg-opacity-50  rounded-lg bg-clip-border">
                  <div className=" flex flex-row justify-center  px-[0%] py-[2%] my-[2%]">
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
             {HomePageData?.isFetching ? (<> <div className="h-44 flex items-center justify-center min-h-0">
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
                    </div></>) : (<><div className="lg:flex lg:flex-row lg:h-[25%]">
                <div className="lg:flex lg:flex-col lg:w-[70%]  lg:pr-[18%]">
                  <div className="flex justify-center lg:justify-start lg:pl-[2%] text-3xl my-[2%]">
                    Most Popular
                  </div>
                  <div className=" h-[100%] p-[2%] lg:p-[6%] flex justify-center  lg:justify-start lg:max-h-[60%] lg:max-w-[100%]   ">
                    <img
                      className=" h-[100%] w-[90%] rounded-lg object-cover lg:overflow-clip lg:h-[100%] lg:w-[100%]  "
                      alt="unsplash"
                      src={
                        HomePageData?.data?.data?.popularPosts[0]?.thumbnail
                          ?.link
                      }
                    />
                  </div>
                  <div className=" ml-[8%] text-sm lg:ml-[2%]">
                    {HomePageData?.data?.data?.popularPosts[0]?.created_at}
                  </div>
                  <div className="flex justify-center  lg:justify-start  text-2xl my-[1%] lg:ml-[2%]">
                    {isEnglishLang ? (
                      <>
                        {
                          HomePageData?.data?.data?.popularPosts[0]?.title
                            .english
                        }
                      </>
                    ) : isAmharicLang ? (
                      <>
                        {
                          HomePageData?.data?.data?.popularPosts[0]?.title
                            .amharic
                        }
                      </>
                    ) : (
                      <>
                        {
                          HomePageData?.data?.data?.popularPosts[0]?.title
                            .oromiffa
                        }
                      </>
                    )}
                  </div>
                  <div className="flex justify-center lg:w-[90%]  lg:justify-start text-lg mx-[6%] lg:mx-[6%] ">
                    {" "}
                    {isEnglishLang ? (
                      <>
                        {
                          HomePageData?.data?.data?.popularPosts[0]?.body
                            .english
                        }
                      </>
                    ) : isAmharicLang ? (
                      <>
                        {
                          HomePageData?.data?.data?.popularPosts[0]?.body
                            .amharic
                        }
                      </>
                    ) : (
                      <>
                        {
                          HomePageData?.data?.data?.popularPosts[0]?.body
                            .oromiffa
                        }
                      </>
                    )}
                  </div>
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
                                    <div className="flex flex-row">
                                      {" "}
                                      <div
                                        className="   lg:max-w-[30%] 
                                            "
                                      >
                                        <img
                                          className="   rounded-lg object-cover lg:overflow-clip lg:max-h-[100%] lg:w-[100%]"
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
                                            <p className="lg:text-xs lg:ml-[2%]">
                                              {" "}
                                              {item.created_at}
                                            </p>
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
                                            <p> {item.created_at}</p>
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
                                            <p> {item.created_at}</p>
                                          </div>
                                        </>
                                      )}
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

              <div className="flex justify-center  lg:justify-start  lg:pl-[2%]  text-3xl ">
                Popular Posts
              </div>

              <div className="flex flex-col  lg:flex-row   c ">
                {HomePageData?.data?.data?.popularPosts?.map((item, i) => {
                  return i < 4 ? (
                    <>
                      <div key={item}>
                        <div className="flex flex-col m-[6%] my-[8%]">
                          <button
                            onClick={() => {
                              navigate(`/details/${item.id}`);
                            }}
                          >
                            <div className="flex justify-center lg:h-[10%] lg:w-[100%]">
                              <img
                                className="h-auto   rounded-lg lg:h-[10%] lg:w-[100%] object-cover;"
                                alt="unsplash"
                                src={item?.thumbnail?.link}
                              />
                            </div>

                            <p>{item.category.created_at}</p>
                            {isEnglishLang ? (
                              <>
                                <p>{item.title.english}</p>
                              </>
                            ) : isAmharicLang ? (
                              <>
                                <p>{item.title.amharic}</p>
                              </>
                            ) : (
                              <>
                                <p>{item.title.oromiffa}</p>
                              </>
                            )}

                            {isEnglishLang ? (
                              <>
                                <p>{item.body.english}</p>
                              </>
                            ) : isAmharicLang ? (
                              <>
                                <p>{item.body.amharic}</p>
                              </>
                            ) : (
                              <>
                                <p>{item.body.oromiffa}</p>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null;
                })}
              </div>
              <div className="hidden lg:flex lg:flex-col ">
                {prev ? (
                  <div className="hidden lg:flex lg:flex-col lg:m-[2%]">
                    <div className="    text-3xl mb-[1%]">Scholarship</div>
                    <div className="flex flex-row">
                      {Category1?.data?.data?.data?.map((item, i) => {
                        return i < 4 ? (
                          <>
                            <div key={item}>
                              <div className="flex flex-col m-2">
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

                                  <p ClassName="">{item.category.created_at}</p>

                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.title.english}</p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.title.amharic}</p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.title.oromiffa}</p>
                                    </>
                                  )}
                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.body.english}</p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.body.amharic}</p>
                                    </>
                                  ) : (
                                    <>
                                      <p ClassName="">{item.body.oromiffa}</p>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null;
                      })}
                    </div>
                  </div>
                ) : null}

                {prev ? (
                  <div class="hidden lg:flex lg:flex-col lg:m-[2%]">
                    <div className="    text-3xl mb-[1%]">English</div>
                    <div className="flex flex-row">
                      {Category2?.data?.data?.data?.map((item, i) => {
                        return i < 4 ? (
                          <>
                            <div key={item}>
                              <div className="flex flex-col m-2">
                                <button
                                  onClick={() => {
                                    navigate(`/details/${item.id}`);
                                  }}
                                >
                                  <div>
                                    <img
                                      alt="unsplash"
                                      src={item?.thumbnail?.link}
                                    />
                                  </div>

                                  <p>{item.category.created_at}</p>
                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p>{item.title.english}</p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p>{item.title.amharic}</p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p>{item.title.oromiffa}</p>
                                    </>
                                  )}
                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p>{item.body.english}</p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p>{item.body.amharic}</p>
                                    </>
                                  ) : (
                                    <>
                                      <p>{item.body.oromiffa}</p>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null;
                      })}
                    </div>
                  </div>
                ) : null}

                {prev ? (
                  <div class="hidden lg:flex lg:flex-col lg:m-[2%]">
                    <div className="    text-3xl mb-[1%]">Chineese</div>
                    <div className="flex flex-row">
                      {Category3?.data?.data?.data?.map((item, i) => {
                        return i < 4 ? (
                          <>
                            <div key={item}>
                              <div className="flex flex-col m-2">
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

                                  <p ClassName="">{item.category.created_at}</p>
                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.title.english}</p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.title.amharic}</p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.title.oromiffa}</p>
                                    </>
                                  )}
                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.body.english}</p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="">{item.body.amharic}</p>
                                    </>
                                  ) : (
                                    <>
                                      <p ClassName="">{item.body.oromiffa}</p>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null;
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              </>) }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
