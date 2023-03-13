import React, { useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";

const LocationsAdd = ({ setShowModal }) => {
  const [englishLocationName, setEnglishLocationName] = useState();
  const [amharicLocationName, setAmharicLocationName] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const addLocationHandler = () => {
    addLocationMutationSubmitHandler();
  };

  const addLocationMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/locations`,
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

  const addLocationMutationSubmitHandler = async (values) => {
    try {
      addLocationMutation.mutate(
        {
          nameEnglish: englishLocationName,
          nameAmharic: amharicLocationName,
        },
        {
          onSuccess: () => {
            setShowModal(false);
            toast.success("success");
            setShowModal(false);
          },
          onError: (err) => {
            console.log({ err });
            toast.error(err?.response?.data?.data ?? "catLocation add failed");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      englishName: "",
      amharicName: "",
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
    }),
    onSubmit: (values) => {
      addLocationHandler();
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
                <h3 className="text-3xl font-semibold">Add Location</h3>
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
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      English Location Name
                    </label>
                    <input
                      id="englishName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setEnglishLocationName(e.target.value);
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
                      Amharic Location Name
                    </label>
                    <input
                      id="amharicName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setAmharicLocationName(e.target.value);
                      }}
                    />
                    {formik.touched.amharicName && formik.errors.amharicName ? (
                      <div className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.amharicName}
                      </div>
                    ) : null}
                  </div>
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
                  disabled={addLocationMutation.isLoading}
                  className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  {addLocationMutation.isLoading ? "saving.." : "Save Changes"}
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

export default LocationsAdd;
