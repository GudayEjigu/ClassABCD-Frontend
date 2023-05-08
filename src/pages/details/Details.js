import React, { useContext, useEffect, useState } from "react";
import styles from "./Details.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import unsplash from "../../assets/unsplash.png";
import unsplash2 from "../../assets/unsplash2.png";
import Footer from "../../components/Footer";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Button, Card, Menu, MenuItem } from "@mui/material";
import ClampLines from "react-clamp-lines";
import unsplash4 from "../../assets/unsplash4.png";
import unsplash5 from "../../assets/unsplash5.png";
import { LanguageContext } from "../../context/LanguageContext";
import ReactPlayer from "react-player";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isEnglishLang,
    setIsEnglishLang,
    isAmharicLang,
    setIsAmharicLang,
    isOromoLang,
    setIsOromoLang,
  } = useContext(LanguageContext);
  const [isScholarship, setIsScolarship] = useState(true);
  const [isAmharic, setIsAmharic] = useState(false);

  const [isEnglish, setIsEnglish] = useState(false);
  const [isChinese, setIsChinese] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const [after, setAfter] = useState(false);
  const { token, user } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const DetailData = useQuery(
    ["DetailDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}show-post/${id}`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [DetailData]);
  console.log(DetailData?.data?.data?.post?.boddy?.english);

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
  return (
    <>
      <div className="w-[100%] h-[100%]  overflow-hidden">
        <div className={styles.Rectangle1}>
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
              <div className="lg:flex lg:flex-row lg:h-[25%]">
                <div className="lg:flex lg:flex-col lg:w-[70%]  lg:pr-[18%]">
                  <div className="flex justify-center lg:justify-start lg:pl-[2%] text-3xl my-[2%]">
                    Detail
                  </div>
                  <div className=" h-[100%] p-[2%] lg:p-[6%] flex justify-center  lg:justify-start lg:max-h-[100%] lg:max-w-[100%]   ">
                    <img
                      className=" h-[100%] w-[90%] rounded-lg object-cover lg:overflow-clip lg:h-[100%] lg:w-[100%]  "
                      alt="unsplash"
                      src={DetailData?.data?.data?.post?.thumbnail?.link}
                    />
                  </div>
                  <div className=" ml-[8%] text-sm lg:ml-[2%]">
                    {DetailData?.data?.data?.post?.created_at}
                  </div>
                  <div className="flex justify-center  lg:justify-start  text-2xl my-[1%] lg:ml-[2%]">
                    {isEnglishLang ? (
                      <>{DetailData?.data?.data?.post?.title?.english}</>
                    ) : isAmharicLang ? (
                      <>{DetailData?.data?.data?.post?.title?.amharic}</>
                    ) : (
                      <>{DetailData?.data?.data?.post?.title?.oromiffa}</>
                    )}
                  </div>
                  <div className="flex justify-center lg:w-[90%]  lg:justify-start text-lg mx-[6%] lg:mx-[6%] ">
                    {" "}
                    {isEnglishLang ? (
                      <>{DetailData?.data?.data?.post?.body?.english}</>
                    ) : isAmharicLang ? (
                      <>{DetailData?.data?.data?.post?.body?.english}</>
                    ) : (
                      <>{DetailData?.data?.data?.post?.body?.english}</>
                    )}
                  </div>
                  <div>
                    <p class="pt-[10%] pb-4">
                      <b>Video:</b>
                    </p>
                    {DetailData?.data?.data?.post?.file?.type?.startsWith("video") ? (
                      <div className="flex justify-center">
                        <Card
                          sx={{ width: "70%", height: "16%"  }}
                          raised={true}
                        >
                         {/* <img  alt={"s"} src={DetailData?.data?.data?.post?.file?.link}/> */}

                           <ReactPlayer
                            url={DetailData?.data?.data?.post?.file?.link}
                            controls
                          /> 
                        </Card>

                       
                      </div>
                    ): <p className="flex justify-center lg:pt-[10%]">No Video</p>}
                  </div>{" "}
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
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Details;
