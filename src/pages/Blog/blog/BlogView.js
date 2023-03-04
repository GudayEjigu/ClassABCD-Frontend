import {
  CssBaseline,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineArrowBack } from "react-icons/md";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { shadows } from "@mui/system";

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const BlogData = useQuery(
    ["BlogDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/blogs/${id}`, {
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
  }, [BlogData]);

  return (
    <>
      {BlogData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {BlogData.isLoading ? (
        <div className="h-44 flex items-center justify-center min-h-0">
          <Bars
            height="40"
            width="40"
            color="#636ab1"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <React.Fragment>
          <CssBaseline />
          <Container sx={{}} maxWidth="100vh">
            <Box
              sx={{
                bgcolor: "#f1f1f1",

                height: "fill",
                margin: "0px",
                padding: "0px",
              }}
            >
              <button>
                <MdOutlineArrowBack
                  onClick={() => navigate(`/blog`)}
                  className="text-[#636ab1] text-4xl"
                />
              </button>
              <div className="flex flex-col p-6">
                <div className="flex flex-row ">
                  <div className="flex flex-col ">
                    <Typography
                      variant="h6"
                      className="text-b"
                      gutterBottom
                      sx={{ marginTop: "10px", marginLeft: "10px" }}
                    >
                      <b>Blog English Title:</b>
                      <br />
                      {BlogData?.data?.data?.data?.title.english}
                      <br />
                      <b>Blog Amharic Title :</b>
                      <br />
                      {BlogData?.data?.data?.data?.title.amharic}
                      <br />
                      <br />
                    </Typography>
                    <Typography
                      variant="body"
                      gutterBottom
                      sx={{ marginTop: "4px", marginLeft: "10px" }}
                    >
                      <b>author_id:</b> {BlogData?.data?.data?.data?.author_id}
                      <br />
                      <b>blog epic:</b> {BlogData?.data?.data?.data?.blog_epic}
                      <br />
                      <b>has liked? :</b>{" "}
                      {BlogData?.data?.data?.data?.has_liked === "true"
                        ? "true"
                        : "false"}
                      <br />
                      <b>likes:</b> {BlogData?.data?.data?.data?.likes_count}
                      <br />
                      <b>created at:</b>{" "}
                      {BlogData?.data?.data?.data?.created_at}
                      <br />
                      <b>updated at:</b>{" "}
                      {BlogData?.data?.data?.data?.updated_at}
                    </Typography>
                  </div>
                  <div className="pl-6 pt-6">
                    <ImageList
                      sx={{ width: 150, height: 250 }}
                      cols={1}
                      rowHeight={164}
                    >
                      {BlogData?.data?.data?.data?.blog_image?.map((item) => {
                        return (
                          <ImageListItem key={item}>
                            <img
                              src={`${item}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item.title}
                              loading="lazy"
                            />
                          </ImageListItem>
                        );
                      })}
                    </ImageList>
                  </div>
                </div>
                <div className="w-fill flex flex-col bg-white shadow-lg p-4 rounded m-6">
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "0px", marginLeft: "10px" }}
                  >
                    <b>Category</b>{" "}
                  </Typography>
                  <Typography
                    variant="body"
                    fontSize={"12px"}
                    gutterBottom
                    sx={{ marginTop: "4px", marginLeft: "10px" }}
                  >
                    <b>category id:</b>
                    {BlogData?.data?.data?.data?.category?.id}
                    <br />
                    <b>category parent id:</b>{" "}
                    {BlogData?.data?.data?.data?.category?.parent_id}
                    <br />
                    <b>category english name: </b>
                    {BlogData?.data?.data?.data?.category?.name.english}
                    <br />
                    <b>category amharic name: </b>
                    {BlogData?.data?.data?.data?.category?.name.amharic}
                    <br />
                    <b>created at:</b>
                    {BlogData?.data?.data?.data?.category?.created_at}
                    <br />
                    <b>updated at:</b>
                    {BlogData?.data?.data?.data?.category?.updated_at}
                    <br />
                    <b>category image:</b>
                  </Typography>
                  <ImageList
                    className="ml-4  mr-6  border-2 shadow-lg rounded"
                    sx={{ width: 550, height: 250 }}
                    cols={3}
                    rowHeight={200}
                  >
                    {BlogData?.data?.data?.data?.category?.category_image?.map(
                      (item) => {
                        return (
                          <>
                            <ImageListItem className="p-2" key={item}>
                              <img
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                              />
                            </ImageListItem>
                          </>
                        );
                      }
                    )}
                  </ImageList>
                </div>
                <div className="w-fill flex flex-col bg-white shadow-lg p-4 rounded m-6">
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "0px", marginLeft: "10px" }}
                  >
                    <b>Trimesters</b>{" "}
                  </Typography>
                  <Typography
                    className=""
                    variant="body"
                    fontSize={"12px"}
                    gutterBottom
                    sx={{ marginTop: "4px", marginLeft: "10px" }}
                  >
                    {BlogData?.data?.data?.data?.trimesters?.map((item) => {
                      return (
                        <div
                          key={item}
                          className="pb-4 bg-gray-100 shadow-lg border-t-4 mt-6 p-1 border-black"
                        >
                          <p>
                            <b>Id:</b>
                            {"  "} {item?.id}
                          </p>
                          <p>
                            <b>English Name:</b>
                            {"  "} {item?.name?.english}
                          </p>
                          <p>
                            <b>Amharic Name:</b>
                            {"  "} {item?.name?.amharic}
                          </p>{" "}
                          <p>
                            <b>English Description:</b>
                            {"  "} {item?.description?.english}
                          </p>{" "}
                          <p>
                            <b>Amharic Description:</b>
                            {"  "} {item?.description?.amharic}
                          </p>
                          <p>
                            <b>Orders:</b>
                            {"  "} {item?.order}
                          </p>
                          <p>
                            <b>created at:</b>
                            {"  "} {item?.created_at}
                          </p>
                          <p>
                            <b>updated at:</b>
                            {"  "} {item?.updated_at}
                          </p>
                          <p>
                            <b>trisemester image:</b>
                            {"  "}
                          </p>
                          <ImageList
                            className="ml-4  mr-6  border-2 shadow-lg rounded"
                            sx={{ width: 450, height: 250 }}
                            cols={3}
                            rowHeight={200}
                          >
                            {item?.trimester_image.map((item) => {
                              return (
                                <>
                                  <ImageListItem className="p-2" key={item}>
                                    <img
                                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                      alt={item.title}
                                      loading="lazy"
                                    />
                                  </ImageListItem>
                                </>
                              );
                            })}
                          </ImageList>
                          <p>
                            <b>blog Id:</b>
                            {"  "} {item?.pivot?.blog_id}
                          </p>{" "}
                          <p>
                            <b>trimester id:</b>
                            {"  "} {item?.pivot?.trimester_id}
                          </p>
                        </div>
                      );
                    })}
                  </Typography>
                </div>
                <div className="w-fill flex flex-col bg-white shadow-lg p-4 rounded m-6">
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "0px", marginLeft: "10px" }}
                  >
                    <b>Weeks</b>{" "}
                  </Typography>
                  <Typography
                    className=""
                    variant="body"
                    fontSize={"12px"}
                    gutterBottom
                    sx={{ marginTop: "4px", marginLeft: "10px" }}
                  >
                    {BlogData?.data?.data?.data?.weeks?.map((item) => {
                      return (
                        <div
                          key={item}
                          className="pb-4 bg-gray-100 shadow-lg border-t-4 mt-6 p-1 border-black"
                        >
                          <p>
                            <b>Id:</b>
                            {"  "} {item?.id}
                          </p>
                          <p>
                            <b>English Name:</b>
                            {"  "} {item?.name?.english}
                          </p>
                          <p>
                            <b>Amharic Name:</b>
                            {"  "} {item?.name?.amharic}
                          </p>{" "}
                          <p>
                            <b>English Description:</b>
                            {"  "} {item?.description?.english}
                          </p>{" "}
                          <p>
                            <b>Amharic Description:</b>
                            {"  "} {item?.description?.amharic}
                          </p>
                          <p>
                            <b>week number:</b>
                            {"  "} {item?.week_number}
                          </p>
                          <p>
                            <b>trimester id:</b>
                            {"  "} {item?.trimester_id}
                          </p>
                          <p>
                            <b>length:</b>
                            {"  "} {item?.length}
                          </p>
                          <p>
                            <b>weight:</b>
                            {"  "} {item?.weight}
                          </p>
                          <p>
                            <b>size:</b>
                            {"  "} {item?.size}
                          </p>
                          <p>
                            <b>created at:</b>
                            {"  "} {item?.created_at}
                          </p>
                          <p>
                            <b>updated at:</b>
                            {"  "} {item?.updated_at}
                          </p>
                          <p>
                            <b>week image:</b>
                            {"  "}
                          </p>
                          <ImageList
                            className="ml-4  mr-6  border-2 shadow-lg rounded"
                            sx={{ width: 450, height: 250 }}
                            cols={3}
                            rowHeight={200}
                          >
                            {item?.week_image.map((item) => {
                              return (
                                <>
                                  <ImageListItem className="p-2" key={item}>
                                    <img
                                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                      alt={item.title}
                                      loading="lazy"
                                    />
                                  </ImageListItem>
                                </>
                              );
                            })}
                          </ImageList>
                          <p>
                            <b>blog Id:</b>
                            {"  "} {item?.pivot?.blog_id}
                          </p>{" "}
                          <p>
                            <b>week id:</b>
                            {"  "} {item?.pivot?.week_id}
                          </p>
                        </div>
                      );
                    })}
                  </Typography>
                </div>
                <div className="w-fill flex flex-col bg-white shadow-lg p-4 rounded m-6">
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "0px", marginLeft: "10px" }}
                  >
                    <b>Tags</b>{" "}
                  </Typography>
                  <Typography
                    className=""
                    variant="body"
                    fontSize={"12px"}
                    gutterBottom
                    sx={{ marginTop: "4px", marginLeft: "10px" }}
                  >
                    {BlogData?.data?.data?.data?.tags?.map((item) => {
                      return (
                        <div
                          key={item}
                          pb-4
                          bg-gray-100
                          shadow-lg
                          border-t-4
                          mt-6
                          p-1
                          border-black
                        >
                          <div
                            className="pb-4 bg-gray-100 shadow-lg border-t-4 mt-6 p-1 border-black
                           "
                          >
                            <p>
                              <b>Id:</b>
                              {"  "} {item?.id}
                            </p>
                            <p>
                              <b>English Name:</b>
                              {"  "} {item?.name?.english}
                            </p>
                            <p>
                              <b>Amharic Name:</b>
                              {"  "} {item?.name?.amharic}
                            </p>{" "}
                            <p>
                              <b>taggable Id:</b>
                              {"  "} {item?.pivot?.taggable_id}
                            </p>{" "}
                            <p>
                              <b>tag id:</b>
                              {"  "} {item?.pivot?.tag_id}
                            </p>
                            <p>
                              <b>taggable type:</b>
                              {"  "} {item?.pivot?.taggable_type}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Typography>
                </div>
              </div>
            </Box>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};

export default BlogView;
