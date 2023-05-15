import React, { useContext, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import { ThreeCircles } from "react-loader-spinner";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BiLogOut } from "react-icons/bi";

import { Box, FormControl, InputLabel, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
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

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const ITEM_HEIGHT = 48;

  const [openBars, setOpenBars] = useState(false);
  const handleOpenBars = () => setOpenBars(true);
  const handleCloseBars = () => setOpenBars(false);

  const { token, user, logout } = useAuth();

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

  return (
    <>
      <div className="w-[100%] h-[100%]  overflow-hidden">
        <div className="">
          <div className="flex font-inter ">
            <div className="flex flex-col w-[100%] ">
              <div className="flex flex-row lg:ml-[4%]">
                <div>
                  <img
                    className=" w-[90%] my-[4%] lg:m-[1%] ml-[6%] lg:ml-[0%] mt-[16%] lg:mt-[40%] "
                    alt="Vector"
                    src={vector2}
                  />
                </div>
                <div className="pl-[0%] pt-[8%] flex flex-col lg:pt-[3%] lg:pl-[0%]">
                  <p className="font-inter font-bold xs:text-4xl sm:text-3xl md:text-3xl lg:text-xl">
                    ClassABCD
                  </p>
                  <p className=" hidden lg:flex font-inter xs:text-4xl sm:text-3xl md:text-3xl lg:text-xl  text-[#f97316] ">
                    Learning Center
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
                    className=" ml-[6%]  px-[4%]  my-[4%] rounded-lg  flex-col"
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
                <div className="hidden lg:flex mt-[6%] lg:mt-[3%] h-[40%] mx-[2%]  lg:mx-[2%]  ">
                  <button
                    className=" text-3xl lg:flex justify-center px-[15%] rounded-lg flex-col bg-[#f97316]"
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
              {HomePageData?.isFetching ? (
                <>
                  {" "}
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
                </>
              ) : (
                <>
                  <div className="lg:flex lg:flex-row lg:h-[25%] lg:pl-[6%] lg:justify-end">
                    <div className="lg:flex lg:flex-col lg:w-[70%]  pb-[25%] lg:pb-[0%] lg:pr-[18%] overfill-y-clip ">
                      <div className="flex justify-center lg:justify-start lg:pl-[2%] text-xl my-[2%] font-bold">
                        Most Popular
                      </div>
                      <div className=" h-[100%] p-[2%]   flex justify-center  lg:justify-start lg:max-h-[50%] lg:max-w-[100%]   ">
                        <img
                          className=" h-[100%] w-[90%] rounded-lg object-cover lg:overflow-clip lg:h-[100%] lg:w-[100%]  "
                          alt="unsplash"
                          src={
                            HomePageData?.data?.data?.popularPosts[0]?.thumbnail
                              ?.link
                          }
                        />
                      </div>
                      <div className=" ml-[8%] text-xs lg:ml-[2%] lg:text-xs ">
                        {HomePageData?.data?.data?.popularPosts[0]?.created_at}
                      </div>
                      <div className="flex justify-center font-bold  lg:justify-start  text-base lg:text-xl my-[1%] lg:ml-[2%]">
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
                      <div className="flex justify-center text-sm lg:w-[90%]  lg:justify-start  lg:text-sm mx-[6%] lg:mx-[6%] ">
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
                                                <div className="flex flex-col lg:h-[100%] ">
                                                  <button
                                                    onClick={() => {
                                                      navigate(
                                                        `/details/${item.id}`
                                                      );
                                                    }}
                                                  >
                                                    <p className=" flex justify-start pl-[4%] lg:w-[100%]lg:pr-[0%] lg:text-sm  lg:font-bold">
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
                                                    <p className=" lg:w-[100%]  lg:pr-[0%] lg:text-sm  lg:font-bold">
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
                                                    <p className=" lg:w-[100%]  lg:pr-[0%] lg:text-sm  lg:font-bold">
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

                  <div className="lg:mx-[4%]">
                    <div className="flex justify-center  lg:justify-start py-[0%]  pt-[4%] lg:pl-[2%]  text-xl font-bold ">
                      Popular Posts
                    </div>

                    {HomePageData?.data?.data?.postByCategory?.map(
                      (item, i) => {
                        return i < 4 ? (
                          <div key={item}>
                            <div className="mt-[4%]  ">
                              <div className="flex flex-col  lg:flex-row lg:text-xs ">
                                {item?.posts?.map((item, i) => {
                                  return i < 4 ? (
                                    <>
                                      <div key={item}>
                                        <button
                                          className="flex flex-col lg:inline p-[4%]  mx-[2%] mb-[25%] lg:pb-[2%] shadow-lg   "
                                          onClick={() => {
                                            navigate(`/details/${item.id}`);
                                          }}
                                        >
                                          <div className="flex  flex-col  lg:flex-col  lg:p-[4%]">
                                            <div className="flex justify-start text-xl font-bold">
                                              {isEnglishLang ? (
                                                <>
                                                  <p className="">
                                                    {item.title.english}
                                                  </p>
                                                </>
                                              ) : isAmharicLang ? (
                                                <>
                                                  <p className="">
                                                    {item.title.amharic}
                                                  </p>
                                                </>
                                              ) : (
                                                <>
                                                  <p className="">
                                                    {item.title.oromiffa}
                                                  </p>
                                                </>
                                              )}
                                            </div>
                                            <img
                                              className=" rounded-lg  lg:aspect-[3/2] lg:max-w-xs object-cover"
                                              alt="unsplash"
                                              src={item?.thumbnail?.link}
                                            />
                                            <div className="flex flex-col ">
                                              <div className="flex  justify-start">
                                                <p className="text-xs ">
                                                  {item.created_at}
                                                </p>
                                              </div>
                                              {isEnglishLang ? (
                                                <>
                                                  <MultiClamp
                                                    ellipsis="..."
                                                    clamp={3}
                                                  >
                                                    {item.body.english}
                                                  </MultiClamp>
                                                </>
                                              ) : isAmharicLang ? (
                                                <>
                                                  <MultiClamp
                                                    ellipsis="..."
                                                    clamp={3}
                                                  >
                                                    {item.body.amharic}
                                                  </MultiClamp>
                                                </>
                                              ) : (
                                                <>
                                                  <MultiClamp
                                                    ellipsis="..."
                                                    clamp={3}
                                                  >
                                                    {item.body.oromiffa}
                                                  </MultiClamp>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex justify-start lg:pl-[6%]">
                                            {isEnglishLang ? (
                                              <>
                                                {" "}
                                                <p ClassName="">
                                                  <b>
                                                    {HomePageData?.data?.data?.postByCategory?.map(
                                                      (cat, i) => {
                                                        return (
                                                          <div key={cat}>
                                                            {cat.id ==
                                                            item.category.id ? (
                                                              <div>
                                                                {
                                                                  cat.title
                                                                    .english
                                                                }
                                                              </div>
                                                            ) : null}
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  </b>
                                                </p>
                                              </>
                                            ) : isAmharicLang ? (
                                              <>
                                                {" "}
                                                <p ClassName=" ">
                                                  <b>
                                                    {HomePageData?.data?.data?.postByCategory?.map(
                                                      (cat, i) => {
                                                        return (
                                                          <div key={cat}>
                                                            {cat.id ==
                                                            item.category.id ? (
                                                              <div>
                                                                {
                                                                  cat.title
                                                                    .amharic
                                                                }
                                                              </div>
                                                            ) : null}
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  </b>
                                                </p>
                                              </>
                                            ) : (
                                              <>
                                                {" "}
                                                <p ClassName="">
                                                  <b>
                                                    {HomePageData?.data?.data?.postByCategory?.map(
                                                      (cat, i) => {
                                                        return (
                                                          <div key={cat}>
                                                            {cat.id ==
                                                            item.category.id ? (
                                                              <div>
                                                                {
                                                                  cat.title
                                                                    .oromiffa
                                                                }
                                                              </div>
                                                            ) : null}
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  </b>
                                                </p>
                                              </>
                                            )}
                                          </div>
                                        </button>
                                      </div>
                                    </>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          </div>
                        ) : null;
                      }
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
