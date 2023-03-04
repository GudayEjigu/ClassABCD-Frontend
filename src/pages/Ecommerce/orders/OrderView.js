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

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const OrderData = useQuery(
    ["OrderDataApi"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/orders/${id}`,
        {
          headers,
        }
      ),
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
  }, [OrderData]);

  return (
    <>
      {OrderData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {OrderData.isLoading ? (
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
                  onClick={() => navigate(`/blog`)}
                  className="text-gray-500  text-4xl"
                />
              </button>
              <div className="flex flex-col p-6"></div>
            </Box>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};

export default OrderView;
