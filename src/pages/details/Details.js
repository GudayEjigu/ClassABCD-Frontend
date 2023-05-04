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
import { Button, Menu, MenuItem } from "@mui/material";
import ClampLines from "react-clamp-lines";
import unsplash4 from "../../assets/unsplash4.png";
import unsplash5 from "../../assets/unsplash5.png";
import { LanguageContext } from "../../context/LanguageContext";

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
    <div className="">
      <div className={styles.Rectangle1}>
    <div className="h-[3000px]">
      {" "}
      <button onClick={() => navigate("/")}>
        <img className={styles.vector2} alt="Vector" src={vector2} />
        <p className={styles.classABCD}>ClassABCD</p>
        <p className={styles.learning}>Learning Center</p>
      </button>
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
          sx={{ left:{xs:"480px", lg:"1267.18px"}, top: {xs:"120px", lg:"85.03px"} }}
          
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
      <img
        className={styles.unsplash2}
        alt="unsplash2"
        src={DetailData?.data?.data?.post?.thumbnail?.link}
      />
      <div className={styles.Rectangle48}> </div>
      {isEnglishLang ? (
        <>
          <p className={styles.EnglishPro}>
            {" "}
            {DetailData?.data?.data?.post?.title?.english}
          </p>
          <div className={styles.Rectangle49}> </div>

          <p className={styles.EnglishPro2}>
            {" "}
            {DetailData?.data?.data?.post?.title?.english}
          </p>
          <div className={styles.Rectangle51}>
            <p className={styles.Messi}>
              {DetailData?.data?.data?.post?.body?.english}
            </p>
          </div>
        </>
      ) : isAmharicLang ? (
        <>
          <p className={styles.EnglishPro}>
            {" "}
            {DetailData?.data?.data?.post?.title?.amharic}
          </p>
          <div className={styles.Rectangle49}> </div>

          <p className={styles.EnglishPro2}>
            {" "}
            {DetailData?.data?.data?.post?.title?.amharic}
          </p>
          <div className={styles.Rectangle51}>
            <p className={styles.Messi}>
              {DetailData?.data?.data?.post?.body?.amharic}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className={styles.EnglishPro}>
            {" "}
            {DetailData?.data?.data?.post?.title?.oromiffa}
          </p>
          <div className={styles.Rectangle49}> </div>

          <p className={styles.EnglishPro2}>
            {" "}
            {DetailData?.data?.data?.post?.title?.oromiffa}
          </p>
          <div className={styles.Rectangle51}>
            <p className={styles.Messi}>
              {DetailData?.data?.data?.post?.body?.oromiffa}
            </p>
          </div>
        </>
      )}
      <div className="invisible lg:visible">
      <p className={styles.MostRecent}> Most Recent </p>
      <div className="flex flex-col col-5">
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
                              src={item.thumbnail.link}
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                  window.location.reload(true);
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
                              <p className={styles.Datemini}> {item.created_at}</p>
                            </div>
                          </>
                        ) : isAmharicLang ? (
                          <>
                            {" "}
                            <img
                              className={styles.unsplash4}
                              alt="unsplash"
                              src={item.thumbnail.link}
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                  window.location.reload(true);
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
                              <p className={styles.Datemini}> {item.created_at}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <img
                              className={styles.unsplash4}
                              alt="unsplash"
                              src={item.thumbnail.link}
                            />
                            <div className="flex flex-col">
                              <button
                                onClick={() => {
                                  navigate(`/details/${item.id}`);
                                  window.location.reload(true);
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
                              <p className={styles.Datemini}> {item.created_at}</p>
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
    
          {prev ? (
            <div className={styles.Toprated2}>
              Scholarship Category
              <div className="flex flex-row">
                {Category1?.data?.data?.data?.map((item, i) => {
                  return i < 4 ? (
                    <>
                      <div key={item}>
                        <div className="flex flex-col m-2">
                          <button
                            onClick={() => {
                              navigate(`/details/${item.id}`);
                              window.location.reload(true);
                            }}
                          >
                            <div className={styles.img}>
                              <img alt="unsplash" src={item.thumbnail.link} />
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
            <div className={styles.Toprated2}>
              English Category
              <div className="flex flex-row">
                {Category2?.data?.data?.data?.map((item, i) => {
                  return i < 4 ? (
                    <>
                      <div key={item}>
                        <div className="flex flex-col m-2">
                          <button
                            onClick={() => {
                              navigate(`/details/${item.id}`);
                              window.location.reload(true);
                            }}
                          >
                            <div className={styles.img}>
                              <img alt="unsplash" src={item.thumbnail.link} />
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
          {after ? (
            <div className={styles.Toprated2}>
              Chineese Category
              <div className="flex flex-row">
                {Category3?.data?.data?.data?.map((item, i) => {
                  return i < 4 ? (
                    <>
                      <div key={item}>
                        <div className="flex flex-col m-2">
                          <button
                            onClick={() => {
                              navigate(`/details/${item.id}`);
                              window.location.reload(true);
                            }}
                          >
                            <div className={styles.img}>
                              <img alt="unsplash" src={item.thumbnail.link} />
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
          <button
            className={styles.next}
            onClick={() => {
              setNext(true);

              setPrev(false);
              setAfter(false)
            }}
          >
            Englsih
          </button>
          <button
            className={styles.prev}
            onClick={() => {
              setNext(false);
              setPrev(true);
              setAfter(false)
            }}
          >
            Scolarship
          </button>
          <button
            className={styles.after}
            onClick={() => {
              setNext(false);
              setPrev(false);
              setAfter(true)
            }}
          >
            Chineese
          </button>
      
          </div>
     
    </div>
      <Footer />
    </div>
    </div>
  );
};

export default Details;
