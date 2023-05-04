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
    isChineeseLang,
    setIsChineeseLang,
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

  const ChineesePageData = useQuery(
    ["ChineesePageDataApi"],
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
  console.log(ChineesePageData?.data?.data);
  return (
    <div>
      <div className="flex flex-col">
        <div className="h-[5000px]">
          <div className={styles.Rectangle1}>
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
                navigate("/scolarship");
              }}
            >
              <div className={styles.RectangleScolarship}>Scholarship</div>
            </button>
            <button
              className={styles.English}
              onClick={() => {
                navigate("/english");
              }}
            >
              <div className={styles.RectangleEnglish}>English</div>
            </button>
            <button
              className={styles.Chinese}
              onClick={() => {
                navigate("/chineese");
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
                  sx={{
                    left: { xs: "480px", lg: "1467.18px" },
                    top: { xs: "120px", lg: "115.03px" },
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
                      setIsChineeseLang(true);
                      setIsAmharicLang(false);
                      setIsOromoLang(false);
                    }}
                  >
                    Chineese
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsChineeseLang(false);
                      setIsAmharicLang(true);
                      setIsOromoLang(true);
                    }}
                  >
                    Amharic
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsChineeseLang(false);
                      setIsAmharicLang(false);
                      setIsOromoLang(true);
                    }}
                  >
                    Oromiffa
                  </MenuItem>
                </Menu>
              </div>
            </div>

            {prev ? (
              <div className={styles.Toprated2}>
                Chineese
                <div className="grid lg:grid-cols-4  ">
                  {Category3?.data?.data?.data?.map((item, i) => {
                    return i < 9 ? (
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
                              {isChineeseLang ? (
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
                              {isChineeseLang ? (
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
                Chineese
                <div className="flex flex-row">
                  {Category3?.data?.data?.data?.map((item, i) => {
                    return i > 9 ? (
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
                              {isChineeseLang ? (
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
                              {isChineeseLang ? (
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
                    ) : (
                      <div className={styles.Toprated2}>Nothing to show</div>
                    );
                  })}
                </div>
              </div>
            ) : null}
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
        <div className="h-[10%]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Chineese;
