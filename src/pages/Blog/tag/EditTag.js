import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTag = ({
  showEditModal,
  setShowEditModal,
  tag,
  id,
  setEditTagId,
  setEditTaId,
}) => {
  const [englishTagName, setEnglishTagName] = useState(tag?.name?.english);
  const [amharicTagName, setAmharicTagName] = useState(tag?.name?.amharic);
  const [editTag, setEditTag] = useState();
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

  const editTagMutation = useMutation(
    async (editTag) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `admin/tags/${editTag?.id}`,
        params,
        config
      )
  );
  const editTagHandler = async (newData) => {
    console.log({ englishTagName });

    try {
      params.append("nameEnglish", englishTagName);
      params.append("nameAmharic", amharicTagName);

      editTagMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            toast.success("Edit success!");
            setShowEditModal(false);
            setEditTaId(null);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      englishName: tag?.name?.english,
      amharicName: tag?.name?.amharic,
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
    }),
    onSubmit: (values) => {
      editTagHandler(tag?.id);
      setEditTag(tag?.id);
      setEditTagId(1);
    },
  });

  return (
    <div>
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
                  <h3 className="text-3xl font-semibold">Edit Tag</h3>
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
                    English Tag Name
                  </label>
                  <input
                    name="englishName"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={tag?.name?.english}
                    onChange={(e) => {
                      formik.handleChange(e);

                      setEnglishTagName(e.target.value);
                    }}
                  />
                  {formik.touched.englishName && formik.errors.amharicName ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.englishName}
                    </div>
                  ) : null}
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic Tag Name
                  </label>
                  <input
                    name="amharicName"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={tag?.name?.amharic}
                    onChange={(e) => {
                      formik.handleChange(e);

                      setAmharicTagName(e.target.value);
                    }}
                  />
                  {formik.touched.amharicName && formik.errors.amharicName ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.amharicName}
                    </div>
                  ) : null}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    disabled={editTagMutation.isLoading}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {editTagMutation.isLoading ? "Editing.." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      <ToastContainer />
    </div>
  );
};

export default EditTag;
