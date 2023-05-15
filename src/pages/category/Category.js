import React, { useContext, useState } from "react";

import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/Footer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ClampLines from "react-clamp-lines";
import { LanguageContext } from "../../context/LanguageContext";
import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { BiLogOut } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import Modal from "@mui/material/Modal";
import MultiClamp from 'react-multi-clamp';


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


const Category = () => {
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

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);

  const [counter, setCounter] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { token, user, logout } = useAuth();
  
  const [openBars, setOpenBars] = useState(false);
  const handleOpenBars = () => setOpenBars(true);
  const handleCloseBars = () => setOpenBars(false);

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
  const CategoryPageData = useQuery(
    ["CategoryPageDataApi"],
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
    ["Category1Api", refresh],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}posts-by-category/${id}`,
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
        setRefresh(false);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  console.log(CategoryPageData?.data?.data);
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
                      className=" w-[90%] my-[4%] lg:m-[1%] ml-[6%] lg:ml-]|[0%] mt-[16%] lg:mt-[40%] "
                      alt="Vector"
                      src={vector2}
                    />
                  </button>
                </div>
                <div className="pl-[0%] pt-[8%] flex flex-col lg:pt-[3%] lg:pl-[0%]">
                  <p className=" font-inter font-bold xs:text-4xl sm:text-xl md:text-xl lg:text-xl">
                    <button onClick={() => navigate("/")}>ClassABCD</button>
                  </p>
                  <p className=" hidden lg:flex  xs:text-4xl sm:text-xl md:text-xl lg:text-xl  text-[#f97316] ">
                    <button onClick={() => navigate("/")}>
                      Learning Center
                    </button>
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
                                  onClick={() =>{
                                    navigate(`/category/${item.id}`)
                                    setRefresh(true)}
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
              <div className="flex justify-center lg:justify-start lg:pl-[2%] text-xl my-[2%]">
                {HomePageData?.data?.data?.postByCategory?.map((item, i) => {
                  return item.id == id ? (
                    <>
                      <div key={item}>
                        <div className="    text-xl mb-[1%]">
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
                        </div>
                      </div>
                    </>
                  ) : null;
                })}
              </div>
              <div className="grid lg:grid-cols-4 m-[4%]   ">
                {Category1.isFetching ? (
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
                    {Category1?.data?.data?.data?.map((item, i) => {
                      return (
                        <>
                          <div key={item}>
                            <div className="flex flex-col  m-[4%]  ">
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

                                <p className="">{item.category.created_at}</p>

                                {isEnglishLang ? (
                                  <>
                                    {" "}
                                    <p className=" font-bold">
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
                                  </>
                                ) : isAmharicLang ? (
                                  <>
                                    {" "}
                                    <p className="font-bold">
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
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <p className="font-bold">
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
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
