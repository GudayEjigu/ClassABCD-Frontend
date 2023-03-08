import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import DeleteModal from "../../components/DeleteCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";
import { Bars } from "react-loader-spinner";

const CategoryBlog = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [englishName, setEnglishName] = useState();
  const [amharicName, setAmharicName] = useState();
  const [categoryDatas, setCategoryDatas] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [type, setType] = useState();
  const [editBlogId, setEditBlogId] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);

  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const categoryData = useQuery(
    [
      "categoryDataApi",
      showModal,
      deleteCategoryId,
      editCategoryId,
      editBlogId,
    ],
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
        if (deleteCategoryId == 1) {
          toast.success("Delete Success");
        }
        setDeleteCategoryId(null);
        console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  // console.log(categoryData.data.data.data[1].name.english);
  //Add category

  const addCategoryHandler = () => {
    addCategoryMutationSubmitHandler();
  };

  const addCategoryMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/categories`,
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

  const addCategoryMutationSubmitHandler = async (values) => {
    let formData = new FormData();
    formData.append("category_photo", categoryImage);
    formData.append("nameEnglish", englishName);
    formData.append("nameAmharic", amharicName);
    formData.append("type", type);

    try {
      addCategoryMutation.mutate(formData, {
        onSuccess: () => {
          setShowModal(false);
          toast.success("success", {});
          setShowModal(false);
        },
        onError: (err) => {
          console.log({ err });
          toast.error(
            err?.response?.data?.message ?? (
              <p>English or Amharic name already exists.</p>
            )
          );
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      englishName: "",
      amharicName: "",
      type: "",
      images: "",
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
      type: Yup.number()
        .min(1)
        .max(3)
        .required("type is required and must be between 0 and 4"),
      images: Yup.string().required("image is required"),
    }),
    onSubmit: (values) => {
      addCategoryHandler();
      setCategoryDatas();
    },
  });

  return (
    <>
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
        Blog Category
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1]  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add a category
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form
                className=" px-8 pt-6 pb-8 w-full"
                onSubmit={formik.handleSubmit}
              >
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Add Blog Category
                    </h3>
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
                  <div className="relative p-6 flex-auto">
                    <label className="block text-black text-sm font-base mb-1">
                      English Name
                    </label>
                    <input
                      id="englishName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setEnglishName(e.target.value);
                      }}
                    />
                    {formik.touched.englishName && formik.errors.englishName ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.englishName}{" "}
                      </div>
                    ) : null}
                    <label className="block text-black text-sm font-base mb-1">
                      Amharic Name
                    </label>
                    <input
                      id="amharicName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setAmharicName(e.target.value);
                      }}
                    />
                    {formik.touched.amharicName && formik.errors.amharicName ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.amharicName}
                      </div>
                    ) : null}
                    <label className="block text-black text-sm font-base mb-1">
                      Type
                    </label>
                    <input
                      id="type"
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setType(e.target.value);
                      }}
                    />
                    {formik.touched.type && formik.errors.type ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.type}{" "}
                      </div>
                    ) : null}
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900"
                      for="file_input"
                    >
                      Category Image file
                    </label>
                    <input
                      id="images"
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      aria-describedby="file_input_help"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setCategoryImage(e.target.files[0]);
                      }}
                      type="file"
                    />
                    {formik.touched.images && formik.errors.images ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.images}{" "}
                      </div>
                    ) : null}
                    <p class="mt-1 text-sm text-gray-500 " id="file_input_help">
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
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
                      disabled={addCategoryMutation.isLoading}
                      className="bg-[#636ab1] text-white active:bg-[#636ab1] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      {addCategoryMutation.isLoading
                        ? "saving.."
                        : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {categoryData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {categoryData.isLoading ? (
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
        <div class="relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th class="px-6 py-3">English Name</th>
                <th class="px-6 py-3">Amharic Name</th>
                <th class="px-6 py-3 flex justify-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryData?.data?.data?.data.map((category, id) => (
                <DeleteCategoryModal
                  category={category}
                  id={id}
                  setDeleteCategoryId={setDeleteCategoryId}
                  setEditCategoryId={setEditCategoryId}
                  setEditBlogId={setEditBlogId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CategoryBlog;
