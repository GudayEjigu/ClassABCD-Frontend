import { ImageList } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/auth";

import { useFormik } from "formik";
import * as Yup from "yup";

const ProductsEdit = ({
  showEditModal,
  setShowEditModal,
  product,
  id,
  setEditProId,

  setEditProductId,
}) => {
  const [englishProductName, setEnglishProductName] = useState(
    product?.name?.english
  );
  const [amharicProductName, setAmharicProductName] = useState(
    product?.name?.amharic
  );
  const [englishDescription, setEnglishDescription] = useState(
    product?.description?.english
  );
  const [amharicDescription, setAmharicDescription] = useState(
    product?.description?.amharic
  );
  const [brand, setBrand] = useState(product?.brand);
  const [price, setPrice] = useState(product?.price);
  const [rating, setRating] = useState(product?.rating);
  const [amharicUsage, setAmharicUsage] = useState(product?.usage?.amharic);
  const [englishUsage, setEnglishUsage] = useState(product?.usage?.english);
  const [categoryId, setCategoryId] = useState();
  const [unitId, setUnitId] = useState();
  const [discount, setDiscount] = useState(product?.discount);
  const [productPhoto, setProductPhoto] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const config = {
    headers,
  };
  const params = new URLSearchParams();

  const editProductMutation = useMutation(
    async (editProduct) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `admin/products/${product?.id}`,
        params,
        config
      )
  );

  const editProductHandler = async (newData) => {
    try {
      params.append("nameEnglish", englishProductName);
      params.append("nameAmharic", amharicProductName);
      params.append("englishDescription", englishDescription);
      params.append("amharicDescription", amharicDescription);
      params.append("brand", brand);
      params.append("price", price);
      params.append("rating", rating);
      params.append("usageAmharic", amharicUsage);
      params.append("usageEnglish", englishUsage);
      // params.append("product_photo", productPhoto);
      params.append("discount", discount);

      editProductMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            setShowEditModal(false);
            setEditProId(null);
            toast.success("Edit success");
            setShowEditModal(false);
          },
          onError: (err) => {
            toast.error(err?.response?.data?.message ?? "Edit failed");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const CategoryData = useQuery(
    ["CategoryDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/categories`, {
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

  const categorySelectHandler = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    console.log(id);
  };

  const UnitData = useQuery(
    ["UnitDataApi"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/product-units`,
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

  const unitSelectHandler = (e) => {
    const id = e.target.value;
    setUnitId(id);
    console.log(id);
  };

  const formik = useFormik({
    initialValues: {
      englishName: product?.name?.english,
      amharicName: product?.name?.amharic,
      englishDesc: product?.description?.english,
      amharicDesc: product?.description?.amharic,
      brandEdit: product?.brand,
      ratingEdit: product?.rating,
      discountEdit: product?.discount,

      priceEdit: product?.price,
      amharicUsageEdit: product?.usage?.amharic,
      englishUsageEdit: product?.usage?.english,
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
      englishDesc: Yup.string().required("English Description is required"),
      amharicDesc: Yup.string().required("Amharic Description is required"),
      brandEdit: Yup.string().required("Brand is required"),
      ratingEdit: Yup.string().required(
        "Rating is required and must be a number"
      ),
      discountEdit: Yup.string().required(
        "Discount is required and must be a number"
      ),

      priceEdit: Yup.string().required(
        "Price is required and must be a number"
      ),
      amharicUsageEdit: Yup.string().required("Amharic Usage is required"),
      englishUsageEdit: Yup.string().required("English Usage is required"),
    }),
    onSubmit: () => {
      editProductHandler();
      setEditProId(1);
    },
  });

  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[80%]  h-[80%] my-6 mx-auto ">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Edit Product</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowEditModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-2"
              >
                <div className="relative p-6 ">
                  <form className=" px-2 pt-6 pb-8 w-full">
                    <div className="flex flex-row px-8 w-full">
                      <div className="flex flex-col  px-8 w-full">
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            English Product Name
                          </label>
                          <input
                            id="englishName"
                            value={formik.values.englishName}
                            type="text"
                            className=" shadow appearance-none border rounded w-80 py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setEnglishProductName(e.target.value);
                            }}
                          />
                          {formik.touched.englishName &&
                          formik.errors.englishName ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.englishName}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Amharic Product Name
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            name="amharicName"
                            value={formik.values.amharicName}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setAmharicProductName(e.target.value);
                            }}
                          />
                          {formik.touched.amharicName &&
                          formik.errors.amharicName ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.amharicName}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            English Description
                          </label>
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            name="englishDesc"
                            value={formik.values.englishDesc}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setEnglishDescription(e.target.value);
                            }}
                          />

                          {formik.touched.englishDesc &&
                          formik.errors.englishDesc ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.englishDesc}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Amharic Description
                          </label>
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            value={formik.values.amharicDesc}
                            name="amharicDesc"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setAmharicDescription(e.target.value);
                            }}
                          />
                          {formik.touched.amharicDesc &&
                          formik.errors.amharicDesc ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.amharicDesc}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Brand
                          </label>
                          <input
                            name="brandEdit"
                            value={formik.values.brandEdit}
                            className="shadow appearance-none border rounded w-80 py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setBrand(e.target.value);
                            }}
                          />
                          {formik.touched.brandEdit &&
                          formik.errors.brandEdit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.brandEdit}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Rating
                          </label>
                          <input
                            name="ratingEdit"
                            type="number"
                            value={formik.values.ratingEdit}
                            className="shadow appearance-none  rounded w-full py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setRating(e.target.value);
                            }}
                          />
                          {formik.touched.ratingEdit &&
                          formik.errors.ratingEdit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.ratingEdit}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Discount
                          </label>
                          <input
                            name="discountEdit"
                            type="number"
                            value={formik.values.discountEdit}
                            className="shadow appearance-none  rounded w-full py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setDiscount(e.target.value);
                            }}
                          />{" "}
                          {formik.touched.discountEdit &&
                          formik.errors.discountEdit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.discountEdit}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col px-8 w-full">
                        {/* <div>
                          <label
                            for="countries"
                            class="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Select category
                          </label>
                          <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="englishcat"
                            value={formik.values.englishcat}
                            onChange={(e) => {
                              formik.handleChange(e);
                              categorySelectHandler(e);
                            }}
                          >
                            <option value="">
                              Select Category English Name
                            </option>
                            {CategoryData?.data?.data?.data.map((category) => (
                              <>
                                <option key={category?.id} value={category?.id}>
                                  {category?.name?.english}
                                </option>
                              </>
                            ))}
                          </select>
                          {formik.touched.englishcat &&
                          formik.errors.englishcat ? (
                            <p className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.englishcat}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label
                            for="countries"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Select Product Unit
                          </label>
                          <select
                            name="englishUnit"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formik.values.englishUnit}
                            onChange={(e) => {
                              formik.handleChange(e);
                              unitSelectHandler(e);
                            }}
                          >
                            <option selected>
                              Select Product Unit English Name
                            </option>
                            {UnitData?.data?.data?.data.map((unit) => (
                              <>
                                <option key={unit?.id} value={unit?.id}>
                                  {unit?.name?.english}
                                </option>
                              </>
                            ))}
                          </select>
                          {formik.touched.englishUnit &&
                          formik.errors.englishUnit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.englishUnit}
                            </div>
                          ) : null}
                        </div> */}
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Price
                          </label>
                          <input
                            name="priceEdit"
                            value={formik.values.priceEdit}
                            type="number"
                            className="shadow appearance-none border rounded  w-80 py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setPrice(e.target.value);
                            }}
                          />
                          {formik.touched.priceEdit &&
                          formik.errors.priceEdit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.priceEdit}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            Amharic Usage
                          </label>
                          <textarea
                            name="amharicUsageEdit"
                            value={formik.values.amharicUsageEdit}
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setAmharicUsage(e.target.value);
                            }}
                          />
                          {formik.touched.amharicUsageEdit &&
                          formik.errors.amharicUsageEdit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.amharicUsageEdit}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="block text-black text-sm font-base mb-1">
                            English Usage
                          </label>
                          <textarea
                            name="englishUsageEdit"
                            value={formik.values.englishUsageEdit}
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setEnglishUsage(e.target.value);
                            }}
                          />
                          {formik.touched.englishUsageEdit &&
                          formik.errors.englishUsageEdit ? (
                            <div className="text-[13px] font-medium capitalize text-red-500">
                              {formik.errors.englishUsageEdit}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <label className="block text-black text-sm font-base mb-1">
                        Image
                      </label>
                      <ImageList
                        className="ml-4  mr-6  border-2 shadow-lg rounded"
                        sx={{ width: 550, height: 250 }}
                        cols={1}
                        rowHeight={250}
                      >
                        {product?.product_images?.map((item) => {
                          return (
                            <img
                              key={item}
                              src={`${item}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt="image"
                              loading="lazy"
                            />
                          );
                        })}
                      </ImageList>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    disabled={editProductMutation.isLoading}
                    className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {editProductMutation.isLoading
                      ? "saving.."
                      : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      <ToastContainer />
    </div>
  );
};

export default ProductsEdit;
