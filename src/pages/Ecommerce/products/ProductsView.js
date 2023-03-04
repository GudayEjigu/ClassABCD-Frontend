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

const ProductsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const ProductData = useQuery(
    ["ProductDataApi"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/products/${id}`,
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
  }, [ProductData]);
  return (
    <>
      {ProductData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {ProductData.isLoading ? (
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
          <Container sx={{ bgcolor: "#f1f1f1" }} maxWidth="100vh">
            <button>
              <MdOutlineArrowBack
                onClick={() => navigate(`/products`)}
                className="text-[#636ab1] text-4xl"
              />
            </button>
            <div className="flex flex-row">
              <div className="w-[50%] flex flex-col">
                {" "}
                <div className="text-3xl">
                  <b>Product English Name: </b>
                  {ProductData?.data?.data?.data?.name.english}
                  <br />
                </div>
                <br />
                <div className="text-3xl">
                  <b>Product Amharic Name: </b>
                  {ProductData?.data?.data?.data?.name.amharic}
                  <br />
                  <br />
                </div>
                <div>
                  <b>Product English Description: </b>
                  {ProductData?.data?.data?.data?.description.english}
                  <br />
                </div>
                <div>
                  <b>Product Amharic Description: </b>
                  {ProductData?.data?.data?.data?.description.amharic}
                  <br />
                </div>
                <br />
                <div className=" flex flex-row border-t border-black">
                  <div className=" w-1/2 flex flex-col ">
                    <div>
                      <b>Brand: </b>
                      {ProductData?.data?.data?.data?.brand}
                      <br />
                    </div>
                    <div>
                      <b>Price: </b>
                      {ProductData?.data?.data?.data?.price}
                      <br />
                      <b>discount: </b>
                      {ProductData?.data?.data?.data?.discount}
                      <br />
                    </div>
                    <div>
                      <b>Rating: </b>
                      {ProductData?.data?.data?.data?.rating}
                      <br />
                      <b>number of reviews: </b>
                      {ProductData?.data?.data?.data?.number_of_reviews}
                      <br />
                    </div>{" "}
                  </div>
                  <div className=" w-1/2 flex justify-end">
                    <div className=" flex  flex-col  ">
                      <div>
                        <b>Market epic: </b>
                        {ProductData?.data?.data?.data?.market_epic}
                        <br />
                      </div>{" "}
                      <div>
                        <b>Status: </b>
                        {ProductData?.data?.data?.data?.status}
                        <br />{" "}
                      </div>
                      <div>
                        <b>Has discount: </b>
                        {ProductData?.data?.data?.data?.has_discount == "true"
                          ? "true"
                          : "false"}
                        <br />
                        <b>Discount percent: </b>
                        {ProductData?.data?.data?.data?.discount_percent}
                        <br />
                      </div>
                      <div>
                        <b>On cart: </b>
                        {ProductData?.data?.data?.data?.on_cart == "true"
                          ? "true"
                          : "false"}
                        <br />
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="pl-6 pt-6">
                  <b>Product Images: </b>
                  <br />
                  <br />
                  <ImageList
                    sx={{ width: 150, height: 250 }}
                    cols={1}
                    rowHeight={164}
                  >
                    {ProductData?.data?.data?.data?.product_images?.map(
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
                <div className=" flex flex-row mt-4 border-t border-black">
                  <div className=" w-1/2 flex flex-col ">
                    <h1 className="flex text-xl justify-start p-4">
                      <b>Owner</b>
                    </h1>
                    <div>
                      <b>ID: </b>
                      {ProductData?.data?.data?.data?.owner?.id}
                      <br />
                    </div>
                    <div>
                      <b>Name: </b>
                      {ProductData?.data?.data?.data?.owner?.name}
                      <br />
                      <b>enail: </b>
                      {ProductData?.data?.data?.data?.owner?.email}
                      <br />
                    </div>
                    <div>
                      <b>phone: </b>
                      {ProductData?.data?.data?.data?.owner?.phone}
                      <br />
                      <b>otp sent at: </b>
                      {ProductData?.data?.data?.data?.owner?.otp_sent_at}
                      <br />
                    </div>{" "}
                    <div>
                      <b>status: </b>
                      {ProductData?.data?.data?.data?.owner?.status}
                      <br />
                    </div>
                    <div>
                      <b>created at: </b>
                      {ProductData?.data?.data?.data?.owner?.created_at}
                      <br />
                      <b>updated at: </b>
                      {ProductData?.data?.data?.data?.owner?.updated_at}
                      <br />
                    </div>
                    <div>
                      <b>role id: </b>
                      {ProductData?.data?.data?.data?.owner?.role_id}
                      <br />
                      <b>role name: </b>
                      {ProductData?.data?.data?.data?.owner?.role?.name}
                      <br />
                    </div>{" "}
                    <div className="pl-6 pt-6">
                      <b>User Images: </b>
                      <br />
                      <br />
                      <ImageList
                        sx={{ width: 150, height: 250 }}
                        cols={1}
                        rowHeight={164}
                      >
                        {ProductData?.data?.data?.data?.owner?.user_image?.map(
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
                  </div>
                  <div className=" w-1/2 flex justify-end">
                    <div className=" flex  flex-col  ">
                      <h1 className="flex text-xl justify-start p-4">
                        <b>Category</b>
                      </h1>
                      <div>
                        <b>Id: </b>
                        {ProductData?.data?.data?.data?.category?.id}
                        <br />
                      </div>{" "}
                      <div>
                        <b>Parent Id: </b>
                        {ProductData?.data?.data?.data?.category?.parent_id}
                        <br />
                      </div>{" "}
                      <div>
                        <b>English name: </b>
                        {ProductData?.data?.data?.data?.category?.name?.english}
                        <br />
                      </div>{" "}
                      <div>
                        <b>Amharic name: </b>
                        {ProductData?.data?.data?.data?.category?.name?.amharic}
                        <br />
                      </div>{" "}
                      <div>
                        <b>created at: </b>
                        {ProductData?.data?.data?.data?.category?.created_at}
                        <br />
                      </div>{" "}
                      <div>
                        <b>updated at: </b>
                        {ProductData?.data?.data?.data?.category?.updated_at}
                        <br />
                      </div>{" "}
                      <div className="pl-6 pt-6">
                        <b>Category Images: </b>
                        <br />
                        <br />
                        <ImageList
                          sx={{ width: 150, height: 250 }}
                          cols={1}
                          rowHeight={164}
                        >
                          {ProductData?.data?.data?.data?.category?.category_image?.map(
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-1/2  ">
                <div className="flex flex-col  ">
                  <div>
                    <b>Product ID: </b> {ProductData?.data?.data?.data?.id}
                    <br />
                  </div>
                  <div>
                    <b>Category ID: </b>{" "}
                    {ProductData?.data?.data?.data?.category_id}
                    <br />
                  </div>
                  <div>
                    <b>Owner ID: </b> {ProductData?.data?.data?.data?.owner_id}
                    <br />
                  </div>
                  <div>
                    <b>Product Unit ID: </b>{" "}
                    {ProductData?.data?.data?.data?.product_unit_id}
                    <br />
                  </div>
                  <div>
                    <b>Created at: </b>{" "}
                    {ProductData?.data?.data?.data?.created_at}
                    <br />
                  </div>
                  <div>
                    <b>Updated at: </b>{" "}
                    {ProductData?.data?.data?.data?.updated_at}
                    <br />
                  </div>
                  <div className=" flex flex-row mt-32 border-t border-black">
                    <div className="  flex justify-end">
                      <div className=" flex  flex-col  ">
                        <h1 className="flex text-xl justify-start py-4">
                          <b>Product Unit</b>
                        </h1>
                        <div>
                          <b>Id: </b>
                          {ProductData?.data?.data?.data?.product_unit?.id}
                          <br />
                        </div>{" "}
                        <div>
                          <b>English name: </b>
                          {
                            ProductData?.data?.data?.data?.product_unit?.name
                              ?.english
                          }
                          <br />
                        </div>{" "}
                        <div>
                          <b>Amharic name: </b>
                          {
                            ProductData?.data?.data?.data?.product_unit?.name
                              ?.amharic
                          }
                          <br />
                        </div>{" "}
                        <div>
                          <b>Status: </b>
                          {ProductData?.data?.data?.data?.product_unit?.status}
                          <br />
                        </div>{" "}
                        <div>
                          <b>created at: </b>
                          {
                            ProductData?.data?.data?.data?.product_unit
                              ?.created_at
                          }
                          <br />
                        </div>{" "}
                        <div>
                          <b>updated at: </b>
                          {
                            ProductData?.data?.data?.data?.product_unit
                              ?.updated_at
                          }
                          <br />
                        </div>{" "}
                        <div>
                          <b>deleted at: </b>
                          {
                            ProductData?.data?.data?.data?.product_unit
                              ?.deleted_at
                          }
                          <br />
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};

export default ProductsView;
