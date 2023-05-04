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
      <div className={styles.Rectangle1}>
      <div className="flex flex-col">
        <div className="h-[5000px]">
          <img className={styles.vector2} alt="Vector" src={vector2} />
          <p className={styles.classABCD}>ClassABCD</p>
          <p className={styles.learning}>Learning Center</p>
          <div className={styles.Rectangle30}></div>
          <div className={styles.Rectangle31}></div>
          <button
            className={styles.Scolarship}
            onClick={() => {
             
              navigate("/scolarship")
            }}
          >
           
                <div className={styles.RectangleScolarship}>Scholarship</div>
             
          </button>
          <button
            className={styles.English}
            onClick={() => {
              
              navigate("/english")
            }}
          >
           
                <div className={styles.RectangleEnglish}>English</div>
              
          </button>
          <button
            className={styles.Chinese}
            onClick={() => {
              
              navigate("/chineese")
            }}
          >
           
             
                <div className={styles.RectangleChinese}>Chinese</div>
           
          </button>
          <div className="flex flex-row">
            <button onClick={() => navigate("/search")}>
              <div className={styles.Rectangle36}></div>
              <img className={styles.vector3} alt="Vector" src={vector3} />
            </button>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img className={styles.vector4} alt="Vector" src={vector4} />
                <p className={styles.Language}>Language </p>
              </Button>

              <Menu
                id="basic-menu"
                sx={{ left:{xs:"480px", lg:"1467.18px"}, top: {xs:"120px", lg:"115.03px"} }}
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
          </div>
          <p className={styles.Mostpopular}> Most popular</p>
          <div className={styles.Rectangle37}>
            <img
              className={styles.unsplash}
              alt="unsplash"
              src={HomePageData?.data?.data?.popularPosts[0]?.thumbnail?.link}
            />
          </div>
          <p className={styles.TopDate}>
            {" "}
            {HomePageData?.data?.data?.popularPosts[0]?.created_at}
          </p>
          <p className={styles.TopTitle}>
            {isEnglishLang ? (
              <>{HomePageData?.data?.data?.popularPosts[0]?.title.english}</>
            ) : isAmharicLang ? (
              <>{HomePageData?.data?.data?.popularPosts[0]?.title.amharic}</>
            ) : (
              <>{HomePageData?.data?.data?.popularPosts[0]?.title.oromiffa}</>
            )}
          </p>
          <p className={styles.TopSubTitle}>
            {" "}
            {isEnglishLang ? (
              <>{HomePageData?.data?.data?.popularPosts[0]?.body.english}</>
            ) : isAmharicLang ? (
              <>{HomePageData?.data?.data?.popularPosts[0]?.body.amharic}</>
            ) : (
              <>{HomePageData?.data?.data?.popularPosts[0]?.body.oromiffa}</>
            )}
          </p>
          <p className={styles.MostRecent} class="invisible lg:visible"> Most Recent </p>
          <div className="flex flex-col col-5" class="invisible lg:visible">
            <div className={styles.frame26position}>
              {HomePageData?.data?.data?.popularPosts?.map((item, i) => {
                return i < 4 ? (
                  <>
                    <div key={item}>
                      <div className="flex flex-col m-2">
                        <div className={styles.Frame26}>
                          <div className="flex flex-row">
                            {isEnglishLang ? (
                              <>
                                {" "}
                                <img
                                  className={styles.unsplash4}
                                  alt="unsplash"
                                  src={item?.thumbnail?.link}
                                />
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => {
                                      navigate(`/details/${item.id}`);
                                    }}
                                  >
                                    <p className={styles.subtitlemini}>
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
                                  </button>
                                  <p className={styles.Datemini}>
                                    {" "}
                                    {item.created_at}
                                  </p>
                                </div>
                              </>
                            ) : isAmharicLang ? (
                              <>
                                {" "}
                                <img
                                  className={styles.unsplash4}
                                  alt="unsplash"
                                  src={item?.thumbnail?.link}
                                />
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => {
                                      navigate(`/details/${item.id}`);
                                    }}
                                  >
                                    <p className={styles.subtitlemini}>
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
                                  </button>
                                  <p className={styles.Datemini}>
                                    {" "}
                                    {item.created_at}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                {" "}
                                <img
                                  className={styles.unsplash4}
                                  alt="unsplash"
                                  src={item?.thumbnail?.link}
                                />
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => {
                                      navigate(`/details/${item.id}`);
                                    }}
                                  >
                                    <p className={styles.subtitlemini}>
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
                                  </button>
                                  <p className={styles.Datemini}>
                                    {" "}
                                    {item.created_at}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null;
              })}
            </div>
          </div>{" "}
          <div className={styles.Toprated}>
            Popular Posts
            <div className="flex flex-col  lg:flex-row   col-5 ">
              {HomePageData?.data?.data?.popularPosts?.map((item, i) => {
                return i < 4 ? (
                  <>
                    <div key={item}>
                      <div className="flex flex-col m-2">
                        <button
                          c
                          onClick={() => {
                            navigate(`/details/${item.id}`);
                          }}
                        >
                          <div className={styles.img}>
                            <img
                              className={styles.img2}
                              alt="unsplash"
                              src={item?.thumbnail?.link}
                            />
                          </div>

                          <p className={styles.date}>
                            {item.category.created_at}
                          </p>
                          {isEnglishLang ? (
                            <>
                              <p className={styles.title}>
                                {item.title.english}
                              </p>
                            </>
                          ) : isAmharicLang ? (
                            <>
                              <p className={styles.title}>
                                {item.title.amharic}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className={styles.title}>
                                {item.title.oromiffa}
                              </p>
                            </>
                          )}

                          {isEnglishLang ? (
                            <>
                              <p className={styles.subtitle}>
                                {item.body.english}
                              </p>
                            </>
                          ) : isAmharicLang ? (
                            <>
                              <p className={styles.subtitle}>
                                {item.body.amharic}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className={styles.subtitle}>
                                {item.body.oromiffa}
                              </p>
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
          <div className="invisible lg:visible">
              {prev ? (
                <div class="invisible lg:visible" className={styles.Toprated2}>
                  Scholarship 
                  <div className="flex flex-row">
                    {Category1?.data?.data?.data?.map((item, i) => {
                      return i < 4 ? (
                        <>
                          <div  key={item}>
                            <div className="flex flex-col m-2">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                }}
                              >
                                <div className={styles.img}>
                                  <img
                                    className={styles.img2}
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
                                    <p className={styles.title}>
                                      {item.title.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.oromiffa}
                                    </p>
                                  </>
                                )}
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className={styles.subtitle}>
                                      {item.body.oromiffa}
                                    </p>
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
              {next ? (
                <div class="invisible lg:visible"  className={styles.Toprated2}>
                  Scolarship 
                  <div className="flex flex-row">
                    {Category1?.data?.data?.data?.map((item, i) => {
                      return i > 5 && i < 10 ? (
                        <>
                          <div key={item}>
                            <div className="flex flex-col m-2">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                }}
                              >
                                <div className={styles.img}>
                                  <img
                                    alt="unsplash"
                                    className={styles.img2}
                                    src={item?.thumbnail?.link}
                                  />
                                </div>

                                <p className={styles.date}>
                                  {item.category.created_at}
                                </p>
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.oromiffa}
                                    </p>
                                  </>
                                )}
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className={styles.subtitle}>
                                      {item.body.oromiffa}
                                    </p>
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
              <div class="invisible lg:visible">              <button
                className={styles.next}
                onClick={() => {
                  setNext(true);

                  setPrev(false);
                }}
              >
                2
              </button>
              <button
                className={styles.prev}
                onClick={() => {
                  setNext(false);
                  setPrev(true);
                }}
              >
                1
              </button>
              </div>
         
         
              {prev ? (
                <div class="invisible lg:visible"  className={styles.Toprated2English}>
                  English
                  <div className="flex flex-row">
                    {Category2?.data?.data?.data?.map((item, i) => {
                      return i < 4 ? (
                        <>
                          <div key={item} >
                            <div className="flex flex-col m-2">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                }}
                              >
                                <div className={styles.img}>
                                  <img
                                    className={styles.img2}
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
                                    <p className={styles.title}>
                                      {item.title.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.oromiffa}
                                    </p>
                                  </>
                                )}
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className={styles.subtitle}>
                                      {item.body.oromiffa}
                                    </p>
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
              {next ? (
                <div  className={styles.Toprated2English} class="invisible lg:visible">
                  English 
                  <div className="flex flex-row">
                    {Category2?.data?.data?.data?.map((item, i) => {
                      return i > 5 && i < 10 ? (
                        <>
                          <div key={item} >
                            <div className="flex flex-col m-2">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                }}
                              >
                                <div className={styles.img}>
                                  <img
                                    className={styles.img2}
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
                                    <p className={styles.title}>
                                      {item.title.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.oromiffa}
                                    </p>
                                  </>
                                )}
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className={styles.subtitle}>
                                      {item.body.oromiffa}
                                    </p>
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
              
              <div class="invisible lg:visible">
              <button
                className={styles.next}
                onClick={() => {
                  setNext(true);

                  setPrev(false);
                }}
              >
                2
              </button>
              <button
                className={styles.prev}
                onClick={() => {
                  setNext(false);
                  setPrev(true);
                }}
              >
                1
              </button>
        
              </div>
              {prev ? (
                <div  class="invisible lg:visible" className={styles.Toprated3Chineese}>
                  Chineese 
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
                                <div className={styles.img}>
                                  <img
                                    className={styles.img2}
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
                                    <p className={styles.title}>
                                      {item.title.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.oromiffa}
                                    </p>
                                  </>
                                )}
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className={styles.subtitle}>
                                      {item.body.oromiffa}
                                    </p>
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
              {next ? (
                <div class="invisible lg:visible" className={styles.Toprated3Chineese}>
                  Chineese 
                  <div className="flex flex-row">
                    {Category3?.data?.data?.data?.map((item, i) => {
                      return i > 5 && i < 10 ? (
                        <>
                          <div key={item}>
                            <div className="flex flex-col m-2">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                }}
                              >
                                <div className={styles.img}>
                                  <img
                                    className={styles.img2}
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
                                    <p className={styles.title}>
                                      {item.title.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className={styles.title}>
                                      {item.title.oromiffa}
                                    </p>
                                  </>
                                )}
                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.english}
                                    </p>
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className={styles.subtitle}>
                                      {item.body.amharic}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className={styles.subtitle}>
                                      {item.body.oromiffa}
                                    </p>
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
              <div class="invisible lg:visible">
              <button
                className={styles.next}
                onClick={() => {
                  setNext(true);

                  setPrev(false);
                }}
              >
                2
              </button>
              <button
                className={styles.prev}
                onClick={() => {
                  setNext(false);
                  setPrev(true);
                }}
              >
                1
              </button>
              </div>
              </div>
        </div>
        </div>
        <div className="h-[10%]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
