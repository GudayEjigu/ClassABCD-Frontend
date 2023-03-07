import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";

const BlogEdit = ({
  showEditModal,
  setShowEditModal,
  blog,
  id,
  setEditBloId,

  setEditBlogId,
}) => {
  const [englishName, setEnglishName] = useState(blog?.title?.english);
  const [amharicName, setAmharicName] = useState(blog?.title?.amharic);
  const [categoryId, setCategoryId] = useState(blog?.category?.id);

  const [englishDescription, setEnglishDescription] = useState(
    blog?.description?.english
  );
  const [amharicDescription, setAmharicDescription] = useState(
    blog?.description?.amharic
  );
  const [order, setOrder] = useState(blog?.order);
  const [editBlog, setEditBlog] = useState();

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

  const editBlogMutation = useMutation(
    async (editBlog) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `admin/blogs/${editBlog?.id}`,
        params,
        config
      )
  );

  const editBlogHandler = async (newData) => {
    console.log({ englishName });

    try {
      params.append("category_id", categoryId);
      params.append("titleEnglish", englishName);
      params.append("titleAmharic", amharicName);
      params.append("descriptionEnglish", englishDescription);
      params.append("descriptionAmharic", amharicDescription);
      params.append("order", order);
      editBlogMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            setShowEditModal(false);
            setEditBloId(null);
            toast.success("success");
            setShowEditModal(false);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      englishName: blog?.title?.english,
      amharicName: blog?.title?.amharic,
      englishDescription: blog?.description?.english,
      amharicDescription: blog?.description?.amharic,
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
      englishDescription: Yup.string().required(
        "english Description is required"
      ),
      amharicDescription: Yup.string().required(
        "amharic Descriptionis required"
      ),
    }),
    onSubmit: (values) => {
      editBlogHandler(blog?.id);
      setEditBlog(blog?.id);
      setEditBlogId(1);
    },
  });

  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[60%] my-6 mx-auto">
            {/*content*/}
            <form
              className=" px-8 pt-6 pb-8 w-full"
              onSubmit={formik.handleSubmit}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit blog</h3>
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
                <div className="relative p-6 flex-auto">
                  <label className="block text-black text-sm font-base mb-1">
                    English Name
                  </label>
                  <input
                    id="englishName"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={blog?.title?.english}
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
                    defaultValue={blog?.title?.amharic}
                    onChange={(e) => {
                      formik.handleChange(e);

                      setAmharicName(e.target.value);
                    }}
                  />
                  {formik.touched.amharicName && formik.errors.amharicName ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.amharicName}{" "}
                    </div>
                  ) : null}
                  <label className="block text-black text-sm font-base mb-1">
                    English description
                  </label>
                  <textarea
                    id="englishDescription"
                    className="shadow appearance-none border rounded w-full h-44 py-2 px-1 text-black"
                    defaultValue={blog?.description?.english}
                    onChange={(e) => {
                      formik.handleChange(e);

                      setEnglishDescription(e.target.value);
                    }}
                  />
                  {formik.touched.englishDescription &&
                  formik.errors.englishDescription ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.englishDescription}{" "}
                    </div>
                  ) : null}
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic description
                  </label>
                  <textarea
                    id="amharicDescription"
                    className="shadow appearance-none border rounded w-[100%] h-44 py-2 px-1 text-black"
                    defaultValue={blog?.description?.amharic}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setAmharicDescription(e.target.value);
                    }}
                  />
                  {formik.touched.amharicDescription &&
                  formik.errors.amharicDescription ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.amharicDescription}{" "}
                    </div>
                  ) : null}
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
                    disabled={editBlogMutation.isLoading}
                    className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {editBlogMutation.isLoading ? "Editing.." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
};

export default BlogEdit;
