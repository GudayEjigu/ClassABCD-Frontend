import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import { padding } from "@mui/system";
import { Bars } from "react-loader-spinner";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { MdOutlineArrowBack } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

   {
    &.${tabUnstyledClasses.selected} {
      background-color: #fff;
      color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 1;
      cursor: not-allowed;
    }
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    border-radius: 12px;
    
    `
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
    min-width: 400px;
    background-color: ${blue[500]};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    `
);
const Posts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const GroupData = useQuery(
    ["GroupDataApi", id],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/groups/${id}`,
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
        console.log(res.data.data);
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
  }, [GroupData]);
  return (
    <>
      {GroupData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {GroupData.isLoading ? (
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
        <>
          <React.Fragment>
            <CssBaseline />
            <Container fixed>
              <Box
                sx={{
                  bgcolor: "#cfe8fc",
                  height: "fill",
                  margin: "4px",
                  padding: "4px",
                }}
              >
                <button>
                  <MdOutlineArrowBack
                    onClick={() => navigate(`/group`)}
                    className="text-blue-600  text-4xl"
                  />
                </button>
                <TabsUnstyled defaultValue={0}>
                  <TabsList>
                    <Tab>Group Profle</Tab>
                    <Tab>Posts</Tab>
                    <Tab>Media</Tab>
                  </TabsList>
                  <TabPanel value={0}>
                    <div className="flex flex-col p-6">
                      <div className="flex flex-row ">
                        <div className="flex flex-col ">
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ marginTop: "10px", marginLeft: "10px" }}
                          >
                            Group Name:{" "}
                            {GroupData?.data?.data?.data?.group_name}
                          </Typography>

                          <Typography
                            variant="body"
                            gutterBottom
                            sx={{ marginTop: "4px", marginLeft: "10px" }}
                          >
                            <b>Members:</b>{" "}
                            {GroupData?.data?.data?.data?.memberCount}
                            <br />
                            <b>Posts:</b>{" "}
                            {GroupData?.data?.data?.data?.postCount}
                            <br />
                            <b>am i joined? :</b>{" "}
                            {GroupData?.data?.data?.data?.am_i_joined === "true"
                              ? "true"
                              : "false"}
                            <br />
                            <b>created at:</b>{" "}
                            {GroupData?.data?.data?.data?.created_at}
                            <br />
                            <b>updated at:</b>{" "}
                            {GroupData?.data?.data?.data?.updated_at}
                          </Typography>
                        </div>
                        <div className="pl-6 pt-6">
                          <ImageList
                            sx={{ width: 200, height: 150 }}
                            cols={1}
                            rowHeight={164}
                          >
                            {GroupData?.data?.data?.data?.group_images?.map(
                              (item) => {
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
                              }
                            )}
                          </ImageList>
                        </div>
                        <div className="ml-20">
                          <Button onClick={handleOpen}>Open modal</Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Text in a modal
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Duis mollis, est non commodo luctus, nisi erat
                                porttitor ligula.
                              </Typography>
                            </Box>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={1}>
                    <div className="">
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ marginTop: "10px", marginLeft: "10px" }}
                      >
                        Posts{" "}
                      </Typography>

                      {GroupData?.data?.data?.data?.posts?.map((item) => {
                        return (
                          <div className="w-fill flex flex-col bg-white shadow-lg p-4 rounded m-6">
                            <>
                              <Typography
                                className=""
                                variant="body"
                                gutterBottom
                                sx={{ marginTop: "4px", marginLeft: "10px" }}
                              >
                                <div className="flex flex-row">
                                  <div className="w-8/12 p-4">
                                    <b>Title:</b> {item.title}
                                    <br />
                                    <br />
                                    <b>body:</b> <br /> {item.body}
                                    <br />
                                    <br />
                                  </div>
                                  <div>
                                    <Typography
                                      className="flex flex-row"
                                      variant="body"
                                      fontSize={"12px"}
                                      gutterBottom
                                      sx={{
                                        marginTop: "4px",
                                        marginLeft: "0px",
                                      }}
                                    >
                                      <div className=""></div>
                                      <div>
                                        <b>category id: </b>
                                        {item.category_id}
                                        <br />
                                        <b>user id :</b>
                                        {item.user_id}
                                        <br />
                                        <b>group id:</b> {item.group_id}
                                        <br />
                                        <b>status </b>
                                        {item.status}
                                        <br />
                                        <b>created at:</b> {item.created_at}
                                        <br />
                                        <b>updated at:</b> {item.updated_at}
                                        <br />
                                        <b>owner?:</b>{" "}
                                        {item.is_owner === false
                                          ? "false"
                                          : "true"}
                                        <br />
                                        <b>answers:</b> {item.answer_count}
                                        <br />
                                        <b>likes:</b> {item.likes_count}
                                        <br />
                                      </div>
                                    </Typography>
                                  </div>
                                </div>
                              </Typography>
                              <b>question images:</b>

                              <ImageList
                                className="ml-4  mr-6  border-2 shadow-lg rounded"
                                sx={{ width: 750, height: 150 }}
                                cols={4}
                                rowHeight={164}
                              >
                                {GroupData?.data?.data?.data?.posts?.map(
                                  (item) => {
                                    return (
                                      <>
                                        {item?.question_images?.map((item) => {
                                          return (
                                            <>
                                              <ImageListItem
                                                className="p-2"
                                                key={item}
                                              >
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
                                      </>
                                    );
                                  }
                                )}
                              </ImageList>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ marginTop: "10px", marginLeft: "10px" }}
                              >
                                <br />
                                <b>Category</b>{" "}
                              </Typography>
                              <Typography
                                variant="body"
                                fontSize={"12px"}
                                gutterBottom
                                sx={{ marginTop: "4px", marginLeft: "10px" }}
                              >
                                <b>category id:</b> {item.category.id}
                                <br />
                                <b>category parent id:</b>{" "}
                                {item.category.parent_id}
                                <br />
                                <b>category english name: </b>
                                {item.category.name.english}
                                <br />
                                <b>category amharic name: </b>
                                {item.category.name.amharic}
                                <br />
                                <b>created at:</b>
                                {item.category.created_at}
                                <br />
                                <b>updated at:</b>
                                {item.category.updated_at}
                                <br />
                                <b>category image:</b>
                              </Typography>
                              <ImageList
                                className="ml-4  mr-6  border-2 shadow-lg rounded"
                                sx={{ width: 750, height: 150 }}
                                cols={4}
                                rowHeight={164}
                              >
                                {GroupData?.data?.data?.data?.posts?.map(
                                  (item) => {
                                    return (
                                      <>
                                        {item?.category?.category_image?.map(
                                          (item) => {
                                            return (
                                              <>
                                                <ImageListItem
                                                  className="p-2"
                                                  key={item}
                                                >
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
                                      </>
                                    );
                                  }
                                )}
                              </ImageList>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ marginTop: "10px", marginLeft: "10px" }}
                              >
                                <br />
                                <b>Tags</b>{" "}
                              </Typography>
                              {item?.tags?.map((item) => {
                                return (
                                  <>
                                    <Typography
                                      className="p-4  mr-6  border-2 shadow-lg rounded "
                                      variant="body"
                                      fontSize={"12px"}
                                      gutterBottom
                                      sx={{
                                        marginTop: "4px",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <b>tag id</b> {item.id}
                                      <br />
                                      <b>forum id:</b> {item.forum_id}
                                      <br />
                                      <b>name: </b>
                                      {item.name}
                                      <br />
                                      <b>created at:</b>
                                      {item.created_at}
                                      <br />
                                      <b>updated at:</b>
                                      {item.updated_at}
                                      <br />
                                    </Typography>
                                  </>
                                );
                              })}
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ marginTop: "10px", marginLeft: "10px" }}
                              >
                                <br />
                                <b>Creator</b>{" "}
                              </Typography>

                              <Typography
                                variant="body"
                                fontSize={"12px"}
                                gutterBottom
                                sx={{ marginTop: "4px", marginLeft: "10px" }}
                              >
                                <b>creator id</b> {item.creator.id}
                                <br />
                                <b>name :</b> {item.creator.name}
                                <br />
                                <b>email: </b>
                                {item.creator.email}
                                <br />
                                <b>phone:</b>
                                {item.creator.phone}
                                <br />
                                <b>otp sent at:</b>
                                {item.creator.otp_sent_at}
                                <br />
                                <b>status:</b>
                                {item.creator.status}
                                <br />
                                <b>created at:</b>
                                {item.creator.created_at}
                                <br />
                                <b>updated at:</b>
                                {item.creator.updated_at}
                                <br />
                                <b>role id:</b>
                                {item.creator.role.id}
                                <br />
                                <b>role name:</b>
                                {item.creator.role.name}
                                <br />
                              </Typography>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ marginTop: "10px", marginLeft: "10px" }}
                              >
                                <br />
                                <b>Answers/replys</b>{" "}
                              </Typography>
                              {item?.answers?.map((item) => {
                                return (
                                  <>
                                    <div className="flex flex-col rounded-lg border-2 shadow mt-6">
                                      <div className="flex flex-row bg-emerald-100">
                                        <div className="w-96">
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                              marginTop: "10px",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            <br />
                                            <b>Answer</b>{" "}
                                          </Typography>
                                          <Typography
                                            className="p-4  mr-6  "
                                            fontSize={"12px"}
                                            gutterBottom
                                            sx={{
                                              marginTop: "4px",
                                              marginLeft: "0px",
                                            }}
                                          >
                                            <b>answer id</b> {item.id}
                                            <br />
                                            <b>user id:</b> {item.user_id}
                                            <br />
                                            <b>forum_id: </b>
                                            {item.forum_id}
                                            <br />
                                            <br />
                                            <b>body: </b>
                                            <br />
                                            {item.body}
                                            <br />
                                            <br />
                                            <b>created at: </b>
                                            {item.updated_at}
                                            <br />
                                            <b>updated at: </b>
                                            {item.updated_at}
                                            <br />
                                            <b>is owner?: </b>
                                            {item.is_owner}
                                            <br />
                                            <b>reply: </b>
                                            {item.reply_count}
                                            <br />
                                            <b>likes: </b>
                                            {item.likes_count}
                                            <br />
                                            <b>has liked?: </b>
                                            {item.has_liked === true
                                              ? "true"
                                              : "false"}
                                            <br />
                                            <b>answer images:</b>
                                            <br />
                                            <ImageList
                                              className="ml-4  mr-6  border-2 shadow-lg rounded"
                                              sx={{ width: 450, height: 150 }}
                                              cols={4}
                                              rowHeight={164}
                                            >
                                              {item?.answer_images?.map(
                                                (item) => {
                                                  return (
                                                    <>
                                                      <ImageListItem
                                                        className="p-2 bg-white"
                                                        key={item}
                                                      >
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
                                            <br />
                                            <b>time: </b>
                                            {item.diffForHumans}
                                            <br />
                                          </Typography>
                                        </div>
                                        <div>
                                          <Typography
                                            fontSize={"12px"}
                                            gutterBottom
                                            sx={{
                                              marginTop: "100px",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            <b>participant id</b>{" "}
                                            {item.partisipant.id}
                                            <br />
                                            <b>name</b> {item.partisipant.name}
                                            <br />
                                            <b>email</b>{" "}
                                            {item.partisipant.email}
                                            <br />
                                            <b>phone</b>{" "}
                                            {item.partisipant.phone}
                                            <br />
                                            <b>otp sent at</b>{" "}
                                            {item.partisipant.otp_sent_at}
                                            <br />
                                            <b>status</b>{" "}
                                            {item.partisipant.status}
                                            <br />
                                            <b>created at</b>{" "}
                                            {item.partisipant.created_at}
                                            <br />
                                            <b>updated at</b>{" "}
                                            {item.partisipant.updated_at}
                                            <br />
                                            <b>role id</b>{" "}
                                            {item.partisipant.role_id}
                                            <br />
                                            <b>role name</b>{" "}
                                            {item.partisipant.role.name}
                                            <br />
                                          </Typography>
                                        </div>
                                      </div>
                                      <div className="bg-emerald-100">
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          sx={{
                                            marginTop: "0px",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          <br />
                                          <b>Reply</b>{" "}
                                        </Typography>

                                        <Typography
                                          className="p-4  mr-6  "
                                          fontSize={"12px"}
                                          gutterBottom
                                          sx={{
                                            marginTop: "4px",
                                            marginLeft: "0px",
                                          }}
                                        >
                                          {item?.replies?.map((item) => {
                                            return (
                                              <div
                                                className="rounded shadow-lg m-4 border-solid"
                                                key={item}
                                              >
                                                <div className="flex flex-row p-4 bg-white rounded shadow-lg">
                                                  <div className="w-96">
                                                    <b>Reply id: </b> {item.id}
                                                    <br />
                                                    <b>user id: </b>{" "}
                                                    {item.user_id}
                                                    <br />
                                                    <b>
                                                      Forum answer id:{" "}
                                                    </b>{" "}
                                                    {item.forum_answer_id}
                                                    <br />
                                                    <br />
                                                    <b>Body: </b> <br />
                                                    {item.body}
                                                    <br />
                                                    <br />
                                                    <b>created at: </b>{" "}
                                                    {item.created_at}
                                                    <br />
                                                    <b>updated at: </b>{" "}
                                                    {item.updated_at}
                                                    <br />
                                                    <b>is owner?</b>{" "}
                                                    {item.is_owner === true
                                                      ? "true"
                                                      : "false"}
                                                    <br />
                                                    <b>reply images:</b>
                                                    <br />
                                                    <ImageList
                                                      className="ml-4  mr-6  border-2 shadow-lg rounded"
                                                      sx={{
                                                        width: 350,
                                                        height: 150,
                                                      }}
                                                      cols={4}
                                                      rowHeight={164}
                                                    >
                                                      {item?.reply_images?.map(
                                                        (item) => {
                                                          return (
                                                            <>
                                                              <ImageListItem
                                                                className="p-2"
                                                                key={item}
                                                              >
                                                                <img
                                                                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                  alt={
                                                                    item.title
                                                                  }
                                                                  loading="lazy"
                                                                />
                                                              </ImageListItem>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                    </ImageList>
                                                    <b>Likes: </b>{" "}
                                                    {item.likes_count}
                                                    <b>has liked?: </b>
                                                    {item.has_liked === true
                                                      ? "true"
                                                      : "false"}
                                                    <br />
                                                    <b>time: </b>{" "}
                                                    {item.diffForHumans}
                                                    <b>Likes: </b>{" "}
                                                    {item.ilikes_count}
                                                    <b>Likes: </b>{" "}
                                                    {item.ilikes_count}
                                                    <br />
                                                    <div></div>
                                                  </div>
                                                  <div>
                                                    <Typography
                                                      fontSize={"12px"}
                                                      gutterBottom
                                                      sx={{
                                                        marginTop: "10px",
                                                        marginLeft: "10px",
                                                      }}
                                                    >
                                                      <b>replier id: </b>{" "}
                                                      {item.replier.id}
                                                      <br />
                                                      <b>name: </b>{" "}
                                                      {item.replier.name}
                                                      <br />
                                                      <b>email: </b>{" "}
                                                      {item.replier.email}
                                                      <br />
                                                      <b>phone: </b>{" "}
                                                      {item.replier.phone}
                                                      <br />
                                                      <b>otp sent at: </b>{" "}
                                                      {item.replier.otp_sent_at}
                                                      <br />
                                                      <b>status: </b>{" "}
                                                      {item.replier.status}
                                                      <br />
                                                      <b>created at: </b>{" "}
                                                      {item.replier.created_at}
                                                      <br />
                                                      <b>updated at: </b>{" "}
                                                      {item.replier.updated_at}
                                                      <br />
                                                      <b>role id: </b>{" "}
                                                      {item.replier.role_id}
                                                      <br />
                                                      <b>role name: </b>{" "}
                                                      {item.replier.role.name}
                                                      <br />
                                                    </Typography>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </Typography>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel value={2}>Meida page</TabPanel>
                </TabsUnstyled>
              </Box>
            </Container>
          </React.Fragment>
        </>
      )}
    </>
  );
};

export default Posts;
