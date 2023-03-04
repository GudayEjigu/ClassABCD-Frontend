import React, { useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";

import { useAuth } from "../../../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductsAdd = ({ setShowModal }) => {
  const [englishProductName, setEnglishProductName] = useState();
  const [amharicProductName, setAmharicProductName] = useState();
  const [englishDescription, setEnglishDescription] = useState();
  const [amharicDescription, setAmharicDescription] = useState();
  const [brand, setBrand] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [amharicUsage, setAmharicUsage] = useState();
  const [englishUsage, setEnglishUsage] = useState();
  const [categoryId, setCategoryId] = useState();
  const [unitId, setUnitId] = useState();
  const [discount, setDiscount] = useState();
  const [productPhoto, setProductPhoto] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const addProductHandler = () => {
    addProductMutationSubmitHandler();
  };

  const addProductMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/products`,
        newData,
        {
          headers,
        }
      ),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {},
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const addProductMutationSubmitHandler = async (values) => {
    try {
      let formData = new FormData();
      formData.append("nameEnglish", englishProductName);
      formData.append("nameAmharic", amharicProductName);
      formData.append("englishDescription", englishDescription);
      formData.append("amharicDescription", amharicDescription);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("rating", rating);
      formData.append("usageAmharic", amharicUsage);
      formData.append("usageEnglish", englishUsage);

      formData.append("categoryId", categoryId);
      formData.append("product_unit_id", unitId);
      formData.append("discount", discount);
      formData.append("product_photo", productPhoto);

      addProductMutation.mutate(formData, {
        onSuccess: () => {
          setShowModal(false);
          toast.success("Add success");
          setShowModal(false);
        },
        onError: (err) => {
          console.log({ err });
          toast.error(err?.response?.data?.message ?? "Product add failed");
        },
      });
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
      englishName: "",
      amharicName: "",
      englishDesc: "",
      amharicDesc: "",
      brand: "",
      rating: "",
      discount: "",
      englishcat: "",
      englishUnit: "",
      price: "",
      amharicUsage: "",
      englishUsage: "",
      photo: "",
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
      englishDesc: Yup.string().required("English Description is required"),
      amharicDesc: Yup.string().required("Amharic Description is required"),
      brand: Yup.string().required("Brand is required"),
      rating: Yup.string().required("Rating is required and must be a number"),
      discount: Yup.string().required(
        "Discount is required and must be a number"
      ),
      englishcat: Yup.string().required(" English Category is Required"),
      englishUnit: Yup.string().required("English Unit is required"),
      price: Yup.string().required("Price is required and must be a number"),
      amharicUsage: Yup.string().required("Amharic Usage is required"),
      englishUsage: Yup.string().required("English Usage is required"),
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: (values) => {
      addProductHandler();
    },
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x(-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Product</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
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
                          name="brand"
                          className="shadow appearance-none border rounded w-80 py-2 px-1 text-black"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setBrand(e.target.value);
                          }}
                        />
                        {formik.touched.brand && formik.errors.brand ? (
                          <div className="text-[13px] font-medium capitalize text-red-500">
                            {formik.errors.brand}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-black text-sm font-base mb-1">
                          Rating
                        </label>
                        <input
                          name="rating"
                          type="number"
                          className="shadow appearance-none  rounded w-full py-2 px-1 text-black"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setRating(e.target.value);
                          }}
                        />
                        {formik.touched.rating && formik.errors.rating ? (
                          <div className="text-[13px] font-medium capitalize text-red-500">
                            {formik.errors.rating}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-black text-sm font-base mb-1">
                          Discount
                        </label>
                        <input
                          name="discount"
                          type="number"
                          className="shadow appearance-none  rounded w-full py-2 px-1 text-black"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setDiscount(e.target.value);
                          }}
                        />{" "}
                        {formik.touched.discount && formik.errors.discount ? (
                          <div className="text-[13px] font-medium capitalize text-red-500">
                            {formik.errors.discount}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col px-8 w-full">
                      <div>
                        <label
                          for="countries"
                          class="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Select category
                        </label>
                        <select
                          class="bg-gr ay-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="englishcat"
                          onChange={(e) => {
                            formik.handleChange(e);
                            categorySelectHandler(e);
                          }}
                        >
                          <option value="">Select Category English Name</option>
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
                      </div>
                      <div>
                        <label className="block text-black text-sm font-base mb-1">
                          Price
                        </label>
                        <input
                          name="price"
                          type="number"
                          className="shadow appearance-none border rounded  w-80 py-2 px-1 text-black"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setPrice(e.target.value);
                          }}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div className="text-[13px] font-medium capitalize text-red-500">
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className="block text-black text-sm font-base mb-1">
                          Amharic Usage
                        </label>
                        <textarea
                          name="amharicUsage"
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setAmharicUsage(e.target.value);
                          }}
                        />
                        {formik.touched.amharicUsage &&
                        formik.errors.amharicUsage ? (
                          <div className="text-[13px] font-medium capitalize text-red-500">
                            {formik.errors.amharicUsage}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="block text-black text-sm font-base mb-1">
                          English Usage
                        </label>
                        <textarea
                          name="englishUsage"
                          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          onChange={(e) => {
                            formik.handleChange(e);
                            setEnglishUsage(e.target.value);
                          }}
                        />
                        {formik.touched.englishUsage &&
                        formik.errors.englishUsage ? (
                          <div className="text-[13px] font-medium capitalize text-red-500">
                            {formik.errors.englishUsage}
                          </div>
                        ) : null}
                      </div>
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Product Image file
                      </label>
                      <input
                        name="photo"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setProductPhoto(e.target.files[0]);
                        }}
                        type="file"
                      />
                      {formik.touched.photo && formik.errors.photo ? (
                        <div className="text-[13px] font-medium capitalize text-red-500">
                          {formik.errors.photo}
                        </div>
                      ) : null}
                      <p
                        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  disabled={addProductMutation.isLoading}
                  className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  {addProductMutation.isLoading ? "saving.." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <ToastContainer />
    </>
  );
};

export default ProductsAdd;
