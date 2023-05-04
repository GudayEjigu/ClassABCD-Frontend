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
    <div>
      <div className="h-[3000px]">
        {" "}
        <div className={styles.Rectangle1}></div>
        <button onClick={() => navigate("/")}>
          <img className={styles.vector2} alt="Vector" src={vector2} />
          <p className={styles.classABCD}>ClassABCD</p>
          <p className={styles.learning}>Learning Center</p>
        </button>
        <div className={styles.Rectangle30}></div>
        {/*       <div className={styles.Rectangle33}></div>
         */}{" "}
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
              left: { xs: "480px", lg: "1267.18px" },
              top: { xs: "100px", lg: "85.03px" },
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
        <input
          className={styles.RectangleSearch}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={Search}>
          <img className={styles.vector5} alt="Vector" src={vector5} />
          <div className={styles.Rectangle31}></div>
          <p className={styles.Search}>Search</p>
        </button>
        <p className={styles.Results}> Results </p>
        {SearchData.isFetching ? (
          <div className="h-44 flex items-center justify-center min-h-0">
            <div className={styles.frame26position}>
              <ThreeCircles
                height="300"
                width="300"
                color="#f97316"
                ariaLabel="ThreeCircles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
        ) : SearchData.isFetched ? (
          <div className="flex flex-col ">
            <div className={styles.frame26position}>
              {SearchData?.data?.data?.map((item, i) => {
                return i < 15 ? (
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
                                  <p className={styles.Datemini2}>
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
          </div>
        ) : !SearchData ? (
          <div className={styles.frame26position}>
            <h1>No Results.</h1>
          </div>
        ) : null}
        <div className="invisible lg:visible">
          <p className={styles.Mostpopular}> Most popular </p>
          <div className="flex flex-col col-5">
            <div className={styles.frame26position2}>
              {HomePageData?.data?.data?.popularPosts?.map((item, i) => {
                return i < 4 ? (
                  <>
                    <div key={item}>
                      <div className="flex flex-col m-2">
                        <div className={styles.Frame262}>
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
                                    <p className={styles.subtitlemini2}>
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
                                  <p className={styles.Datemini2}>
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
                                    <p className={styles.subtitlemini2}>
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
                                    <p className={styles.subtitlemini2}>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
