import axios from "axios";
import React, { useState } from "react";
import { GiToken } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

import { useFormik } from "formik";
import * as Yup from "yup";

const EmoticonsAdd = ({ setShowModal }) => {
  const [emoticonEnglishName, setEmoticonEnglishName] = useState();
  const [emoticonEnglishDescription, setEmoticonEnglishDescription] =
    useState();

  const [emoticonImage, setEmoticonImage] = useState();
  const [emoticonTypeId, setEmoticonTypeId] = useState();

  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const addEmoticonHandler = () => {
    addEmoticonMutationSubmitHandler();
  };

  const addEmoticonMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/emoticons`,
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

  const addEmoticonMutationSubmitHandler = async (values) => {
    let formData = new FormData();
    formData.append("emoticonTypeId", emoticonTypeId);
    formData.append("emoticon_photo", emoticonImage);
    formData.append("name", emoticonEnglishName);
    formData.append("description", emoticonEnglishDescription);
    try {
      addEmoticonMutation.mutate(
        // {
        //   emoticonTypeId: emoticonEmoticonTypeId,
        //   file_name: emoticonImage,
        //   nameEnglish: emoticonEnglishName,
        //   nameAmharic: emoticonAmharicName,
        //   descriptionEnglish: emoticonEnglishDescription,
        //   descriptionAmharic: emoticonAmharicDescription,
        //   emoticonNumber: emoticonNumber,
        // }
        formData,
        {
          onSuccess: () => {
            setShowModal(false);
            toast.success("success");
            setShowModal(false);
          },
          onError: (err) => {
            console.log({ err });
            toast.error(err?.response?.data?.data ?? " add failed");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const EmoticonTypeData = useQuery(
    ["EmoticonTypeDataApi"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/emoticon-types`,
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

  const emoticonTypeSelectHandler = (e) => {
    const id = e.target.value;
    setEmoticonTypeId(id);
    console.log(id);
  };

  const formik = useFormik({
    initialValues: {
      englishName: "",
      emoticonTypeEnglishName: "",

      englishDescription: "",

      images: "",
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      emoticonTypeEnglishName: Yup.string().required(
        "Emoticon type is required"
      ),
      englishDescription: Yup.string().required(" Description is required"),

      images: Yup.string().required("image is required"),
    }),
    onSubmit: (values) => {
      addEmoticonHandler();
    },
  });
  return (
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
                <h3 className="text-3xl font-semibold">Add Emoticon</h3>
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
                <div className="felx flex-row w-80">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select
                  </label>
                  <select
                    id="emoticonTypeEnglishName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      formik.handleChange(e);
                      emoticonTypeSelectHandler(e);
                    }}
                  >
                    <option selected value={null}>
                      Select Emoticon-Type English Name
                    </option>
                    {EmoticonTypeData?.data?.data?.data.map((emoticonType) => (
                      <>
                        <option key={emoticonType?.id} value={emoticonType?.id}>
                          {emoticonType?.name}
                        </option>
                      </>
                    ))}
                  </select>
                  {formik.touched.emoticonTypeEnglishName &&
                  formik.errors.emoticonTypeEnglishName ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.emoticonTypeEnglishName}{" "}
                    </div>
                  ) : null}
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Emoticon English Name
                    </label>
                    <input
                      id="englishName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setEmoticonEnglishName(e.target.value);
                      }}
                    />
                    {formik.touched.englishName && formik.errors.englishName ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.englishName}{" "}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Emoticon Description
                    </label>
                    <input
                      id="englishDescription"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setEmoticonEnglishDescription(e.target.value);
                      }}
                    />
                    {formik.touched.englishDescription &&
                    formik.errors.englishDescription ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.englishDescription}{" "}
                      </div>
                    ) : null}
                  </div>

                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Emoticon Image file
                  </label>
                  <input
                    id="images"
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setEmoticonImage(e.target.files[0]);
                    }}
                    type="file"
                  />
                  {formik.touched.images && formik.errors.images ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.images}{" "}
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
                  disabled={addEmoticonMutation.isLoading}
                  className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  {addEmoticonMutation.isLoading ? "saving.." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default EmoticonsAdd;
