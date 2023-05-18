import React, { useContext, useState } from "react";
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
import { BiLogOut } from "react-icons/bi";
import { LanguageContext } from "../../context/LanguageContext";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import Category from "../category/Category";
import { GoThreeBars } from "react-icons/go";
import Modal from "@mui/material/Modal";
import MultiClamp from "react-multi-clamp";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [menu, setMenu] = useState("Menu");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [openBars, setOpenBars] = useState(false);
  const handleOpenBars = () => setOpenBars(true);
  const handleCloseBars = () => setOpenBars(false);

  const { token, user, logout } = useAuth();
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
          logout()
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
          logout()
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
                      className=" w-[90%] my-[4%] lg:m-[1%] ml-[6%]  mt-[16%] lg:mt-[40%] "
                      alt="Vector"
                      src={vector2}
                    />
                  </button>
                </div>
                <div className="pl-[0%] pt-[8%] flex flex-col lg:pt-[3%] lg:pl-[0%]">
                  <p className="font-inter font-bold xs:text-4xl sm:text-3xl md:text-3xl lg:text-xl">
                    <button onClick={() => navigate("/")}>ClassABCD</button>
                  </p>
                </div>
                <div className=" hidden w-[0%] h-[0%]  lg:w-[60%]  lg:block  lg:px-[0%] lg:py-[0%] lg:my-[4%]">
                  <div className=" bg-opacity-50  rounded-lg bg-clip-padding">
                    <div className=" flex flex-row justify-start  px-[10%] py-[0%] my-[0%] lg:text-base">
                      <div className="flex flex-row w-[30%]">
                        {HomePageData?.data?.data?.postByCategory?.map(
                          (item, i) => {
                            return i < 3 ? (
                              <>
                                {" "}
                                <MenuItem
                                  onClick={() =>
                                    navigate(`/category/${item.id}`)
                                  }
                                >
                                  {" "}
                                  {isEnglishLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="text-sm font-bold">
                                        {item.title.english}
                                      </p>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <p ClassName="text-sm font-bold">
                                        {item.title.amharic}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p ClassName="text-sm font-bold">
                                        {item.title.oromiffa}
                                      </p>
                                    </>
                                  )}
                                </MenuItem>
                              </>
                            ) : null;
                          }
                        )}
                        <div className="flex flex-row w-[30%]">
                          {HomePageData?.data?.data?.postByCategory?.[3] ? (
                            <Box sx={{ minWidth: 10 }}>
                              <FormControl fullWidth>
                                <InputLabel
                                  sx={{
                                    fontSize: 10,
                                    fontFamily: "Inter",
                                    color: "black",
                                    pb: 2,
                                  }}
                                  id="demo-simple-select-label"
                                ></InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  sx={{
                                    boxShadow: "none",
                                    ".MuiOutlinedInput-notchedOutline": {
                                      border: 0,
                                    },
                                    marginTop: 0,
                                    width: "100%",
                                    height: "80%",
                                  }}
                                  label="Age"
                                >
                                  {HomePageData?.data?.data?.postByCategory?.map(
                                    (item, i) => {
                                      return i > 2 ? (
                                        <>
                                          <div key={item}>
                                            <div className="    text-xl mb-[1%]">
                                              <MenuItem
                                                onClick={() => {
                                                  navigate(
                                                    `/category/${item.id}`
                                                  );
                                                }}
                                              >
                                                {" "}
                                                {isEnglishLang ? (
                                                  <>
                                                    {" "}
                                                    <p ClassName="text-sm font-bold">
                                                      {item.title.english}
                                                    </p>
                                                  </>
                                                ) : isAmharicLang ? (
                                                  <>
                                                    {" "}
                                                    <p ClassName="text-sm font-bold">
                                                      {item.title.amharic}
                                                    </p>
                                                  </>
                                                ) : (
                                                  <>
                                                    {" "}
                                                    <p ClassName="text-sm font-bold">
                                                      {item.title.oromiffa}
                                                    </p>
                                                  </>
                                                )}
                                              </MenuItem>
                                            </div>
                                          </div>
                                        </>
                                      ) : null;
                                    }
                                  )}
                                </Select>
                              </FormControl>
                            </Box>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:hidden flex pt-[0%] w-[50%] justify-end text-4xl text-[#f97316]">
                  <Button
                    sx={{ color: "#f97316", fontSize: "45px" }}
                    onClick={handleOpenBars}
                  >
                    <GoThreeBars />
                  </Button>
                  <Modal
                    open={openBars}
                    onClose={handleCloseBars}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div className=" flex justify-center lg:hidden flex-row">
                        <button
                          className=" ml-[8%] lg:ml-[1%]   px-[8%] py-[4%] lg:px-[2%] my-[0%] lg:my-[4%] rounded-lg bg-[#f97316]"
                          onClick={() => navigate("/search")}
                        >
                          <img
                            className="w-[500%]"
                            alt="Vector"
                            src={vector3}
                          />
                        </button>
                        <div className="mx-[15%]">
                          <Button
                            className=" ml-[6%]  px-[4%]  my-[4%] rounded-lg flex flex-col"
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <img alt="Vector" src={vector4} />
                            <p className="text-[#f97316] text-xs ">Language </p>
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
                        <div className=" mt-[0%] lg:mt-[3%] mx-[2%]  lg:mx-[2%]  ">
                          <button
                            className=" text-3xl lg:flex justify-center p-[15%] rounded-lg flex-col bg-[#f97316]"
                            onClick={logout}
                          >
                            <BiLogOut />
                            <p className="text-xs flex  justify-center">
                              Logout
                            </p>
                          </button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>

                <button
                  className=" hidden lg:flex ml-[8%] lg:ml-[1%] justify-center pt-[0.5%]   px-[4%] lg:px-[2%] my-[6%] lg:my-[4%] rounded-lg bg-[#f97316]"
                  onClick={() => navigate("/search")}
                >
                  <img className="w-[500%]" alt="Vector" src={vector3} />
                </button>
                <div className=" hidden lg:flex ">
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
                <div className="hidden lg:flex mt-[6%] lg:mt-[3%] h-[40%] mx-[2%]  lg:mx-[2%]  ">
                  <button
                    className="hidden text-3xl lg:flex justify-center p-[15%] rounded-lg flex-col bg-[#f97316]"
                    onClick={logout}
                  >
                    <BiLogOut />
                    <p className="text-xs flex  justify-center">Logout</p>
                  </button>
                </div>
              </div>

              <div className=" lg:hidden lg:w-[100%]  px-[0%] py-[2%] my-[2%]">
                <div className=" bg-opacity-50  rounded-lg bg-clip-padding">
                  <div className=" flex flex-row justify-start  px-[10%] py-[0%] my-[0%] lg:text-base">
                    <div className="flex flex-row w-[30%]">
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          {HomePageData?.data?.data?.postByCategory?.map(
                            (item, i) => {
                              return i < 3 ? (
                                <>
                                  {" "}
                                  <MenuItem
                                    onClick={() =>
                                      navigate(`/category/${item.id}`)
                                    }
                                  >
                                    {" "}
                                    {isEnglishLang ? (
                                      <>
                                        {" "}
                                        <p ClassName="text-sm font-bold">
                                          {item.title.english}
                                        </p>
                                      </>
                                    ) : isAmharicLang ? (
                                      <>
                                        {" "}
                                        <p ClassName="text-sm font-bold">
                                          {item.title.amharic}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <p ClassName="text-sm font-bold">
                                          {item.title.oromiffa}
                                        </p>
                                      </>
                                    )}
                                  </MenuItem>
                                </>
                              ) : null;
                            }
                          )}
                        </div>
                        <div className="flex flex-row">
                          {HomePageData?.data?.data?.postByCategory?.map(
                            (item, i) => {
                              return i > 2 && i < 6 ? (
                                <>
                                  {" "}
                                  <MenuItem
                                    onClick={() =>
                                      navigate(`/category/${item.id}`)
                                    }
                                  >
                                    {" "}
                                    {isEnglishLang ? (
                                      <>
                                        {" "}
                                        <p ClassName="text-sm font-bold">
                                          {item.title.english}
                                        </p>
                                      </>
                                    ) : isAmharicLang ? (
                                      <>
                                        {" "}
                                        <p ClassName="text-sm font-bold">
                                          {item.title.amharic}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <p ClassName="text-sm font-bold">
                                          {item.title.oromiffa}
                                        </p>
                                      </>
                                    )}
                                  </MenuItem>
                                </>
                              ) : null;
                            }
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row w-[30%]">
                        {HomePageData?.data?.data?.postByCategory?.[6] ? (
                          <Box sx={{ minWidth: 10 }}>
                            <FormControl fullWidth>
                              <InputLabel
                                sx={{
                                  fontSize: 10,
                                  fontFamily: "Inter",
                                  color: "black",
                                  pb: 2,
                                }}
                                id="demo-simple-select-label"
                              ></InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                sx={{
                                  boxShadow: "none",
                                  ".MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                  },
                                  marginTop: 0,
                                  width: "100%",
                                  height: "80%",
                                }}
                                label="Age"
                              >
                                {HomePageData?.data?.data?.postByCategory?.map(
                                  (item, i) => {
                                    return i > 5 ? (
                                      <>
                                        <div key={item}>
                                          <div className="    text-xl mb-[1%]">
                                            <MenuItem
                                              onClick={() => {
                                                navigate(
                                                  `/category/${item.id}`
                                                );
                                              }}
                                            >
                                              {" "}
                                              {isEnglishLang ? (
                                                <>
                                                  {" "}
                                                  <p ClassName="text-sm font-bold">
                                                    {item.title.english}
                                                  </p>
                                                </>
                                              ) : isAmharicLang ? (
                                                <>
                                                  {" "}
                                                  <p ClassName="text-sm font-bold">
                                                    {item.title.amharic}
                                                  </p>
                                                </>
                                              ) : (
                                                <>
                                                  {" "}
                                                  <p ClassName="text-sm font-bold">
                                                    {item.title.oromiffa}
                                                  </p>
                                                </>
                                              )}
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : null;
                                  }
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                        ) : null}
                      </div>
                    </div>
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
                <div className="lg:flex lg:flex-col lg:w-[70%]  lg:px-[5%]">
                  <div className="flex justify-center lg:justify-start lg:pl-[2%] text-3xl my-[2%]">
                    Results
                  </div>
                  {SearchData.isFetching ? (
                    <div className="h-[100vh] flex items-start justify-center min-h-0">
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
                      <div className="pb-[57%] lg:py-[0%]">
                        <p ClassName=" flex justify-center p-[4%] ">
                          {" "}
                          No Results.
                        </p>
                      </div>
                    </>
                  ) : SearchData.isFetched ? (
                    <div className="flex flex-col ">
                      {SearchData?.data?.data?.map((item, i) => {
                        return (
                          <>
                            <div key={item}>
                              <div className="flex flex-col m-2 mb-[16%] lg:mb-[6%] lg:pl-[8%] ">
                                <div className="flex flex-col  lg:flex-row ">
                                  {isEnglishLang ? (
                                    <>
                                      <button
                                        className="flex flex-col justify-center lg:justify-start lg:flex-row first-letter"
                                        onClick={() => {
                                          navigate(`/details/${item.id}`);
                                        }}
                                      >
                                        <img
                                          className="   lg:h-48  lg:w-48 object-cover"
                                          alt="unsplash"
                                          src={item?.thumbnail?.link}
                                        />

                                        <div className="flex flex-col">
                                          <p ClassName="">
                                            <p className=" lg:w-[100%]  lg:pr-[0%] lg:text-lg  lg:font-bold">
                                              {item.title.english}
                                            </p>
                                            <p className="text-xs w-[90%]  ">
                                              <MultiClamp
                                                ellipsis="..."
                                                clamp={3}
                                              >
                                                {item.body.english}
                                              </MultiClamp>
                                            </p>
                                          </p>
                                          <div className="flex justify-start p-[2%] text-xs">
                                          <p ClassName="mb-[8%] text-xs flex justify-start">
                                            {" "}
                                            {item.created_at}
                                          </p>
                                        </div>
                                        </div>
                                      </button>
                                    </>
                                  ) : isAmharicLang ? (
                                    <>
                                      {" "}
                                      <button
                                        className="flex flex-col justify-center lg:justify-start lg:flex-row first-letter"
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
                                            <p className=" lg:w-[100%]  lg:pr-[0%] lg:text-lg  lg:font-bold">
                                              {item.title.amharic}
                                            </p>
                                            <p className="text-xs w-[90%]  ">
                                              <MultiClamp
                                                ellipsis="..."
                                                clamp={3}
                                              >
                                                {item.body.amharic}
                                              </MultiClamp>
                                            </p>
                                          </p><div className="flex justify-start p-[2%] text-xs">
                                          <p ClassName="flex justify-start text-xs mb-[8%]">
                                            {" "}
                                            {item.created_at}
                                          </p>
                                        </div>
                                        </div>
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        className="flex flex-col justify-center lg:justify-start lg:flex-row first-letter"
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
                                        <div className="flex flex-col ">
                                          <p ClassName="">
                                            <p className=" lg:w-[100%]  lg:pr-[0%] lg:text-lg  lg:font-bold">
                                              {item.title.oromiffa}
                                            </p>
                                            <p className="text-xs w-[90%]  ">
                                              <MultiClamp
                                                ellipsis="..."
                                                clamp={3}
                                              >
                                                {item.body.oromiffa}
                                              </MultiClamp>
                                            </p>
                                          </p>
                                          <div className="flex justify-start p-[2%] text-xs">
                                            <p ClassName="mb-[8%] ">
                                              {" "}
                                              {item.created_at}
                                            </p>
                                          </div>
                                        </div>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                <div className=" hidden  w-[30%] lg:flex  lg:flex-col justify-start ">
                  <p className="font-bold">Most Recent</p>
                  <div className=" lg:block">
                    <div>
                      {HomePageData?.data?.data?.popularPosts?.map(
                        (item, i) => {
                          return i < 4 ? (
                            <>
                              <div key={item}>
                                <div className="flex flex-col bg-white lg:my-[0%] lg:mr-[4%] lg:p-[2%]    rounded lg">
                                  <div>
                                    <div className="flex flex-col shadow-lg">
                                      <div className="flex flex-row">
                                        {" "}
                                        <div
                                          className="   lg:max-w-[30vh]  
                                            "
                                        >
                                          <img
                                            className="   rounded-lg object-cover lg:overflow-clip  lg:pt-[0%] lg:max-h-[15vh] lg:w-[50vh]"
                                            alt="unsplash"
                                            src={item?.thumbnail?.link}
                                          />
                                        </div>
                                        {isEnglishLang ? (
                                          <>
                                            <div className="flex flex-col   lg:h-[100%] ">
                                              <button
                                                onClick={() => {
                                                  navigate(
                                                    `/details/${item.id}`
                                                  );
                                                }}
                                              >
                                                <div className=" lg:w-[100%]   lg:text-sm  text-left pl-[4%] lg:font-bold">
                                                  {item.title.english}
                                                </div>
                                                <p className="text-xs w-[90%] text-left pl-[4%] ">
                                                  <MultiClamp
                                                    ellipsis="..."
                                                    clamp={3}
                                                  >
                                                    {item.body.english}
                                                  </MultiClamp>
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
                                                  navigate(
                                                    `/details/${item.id}`
                                                  );
                                                }}
                                              >
                                                <p className=" lg:w-[100%]  lg:pr-[0%] text-left pl-[4%] lg:text-sm  lg:font-bold">
                                                  {item.title.amharic}
                                                </p>
                                                <p className="text-xs w-[90%] text-left pl-[4%]  ">
                                                  <MultiClamp
                                                    ellipsis="..."
                                                    clamp={3}
                                                  >
                                                    {item.body.amharic}
                                                  </MultiClamp>
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
                                                  navigate(
                                                    `/details/${item.id}`
                                                  );
                                                }}
                                              >
                                                <p className=" lg:w-[100%]  lg:pr-[0%] text-left pl-[4%] lg:text-sm  lg:font-bold">
                                                  {item.title.oromiffa}
                                                </p>
                                                <p className="text-xs w-[90%]  text-left pl-[4%] ">
                                                  <MultiClamp
                                                    ellipsis="..."
                                                    clamp={3}
                                                  >
                                                    {item.body.oromiffa}
                                                  </MultiClamp>
                                                </p>
                                              </button>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div>
                                        <p className="lg:text-xs lg:ml-[2%]">
                                          {" "}
                                          {item.created_at}
                                        </p>
                                      </div>
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
          <div className=" sm:mt-[0%] md:mt-[0%] lg:mt-[0%]"></div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
