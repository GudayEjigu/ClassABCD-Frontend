import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";

const UnitEdit = ({
  showEditModal,
  setShowEditModal,
  unit,
  id,
  setEditUniId,

  setEditUnitId,
}) => {
  const [englishName, setEnglishName] = useState(unit?.name?.english);
  const [amharicName, setAmharicName] = useState(unit?.name?.amharic);
  const [editUnit, setEditUnit] = useState();

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

  const editUnitMutation = useMutation(
    async (editUnit) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL +
          `admin/product-units/${editUnit?.id}`,
        params,
        config
      )
  );

  const editUnitHandler = async (newData) => {
    console.log({ englishName });

    try {
      params.append("nameEnglish", englishName);
      params.append("nameAmharic", amharicName);

      editUnitMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            setShowEditModal(false);
            setEditUniId(null);
            toast.success("success", {
              style: {
                backgroundColor: "#22c55e",
                color: "white",
              },
            });
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
      englishName: unit?.name?.english,
      amharicName: unit?.name?.amharic,
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("EnglishName is required"),
      amharicName: Yup.string().required("Amharic Name is required"),
    }),
    onSubmit: (values) => {
      editUnitHandler(unit?.id);
      setEditUnit(unit?.id);
      setEditUniId(1);
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
                  <h3 className="text-3xl font-semibold">Edit Unit</h3>
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
                    name="englishName"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={unit?.name?.english}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setEnglishName(e.target.value);
                    }}
                  />
                  {formik.touched.englishName && formik.errors.amharicName ? (
                    <div className="text-[13px] font-medium capitalize text-red-500">
                      {formik.errors.englishName}
                    </div>
                  ) : null}
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic Name
                  </label>
                  <input
                    name="amharicName"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={unit?.name?.amharic}
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
                    disabled={editUnitMutation.isLoading}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {editUnitMutation.isLoading ? "Editing.." : "Save Changes"}
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

export default UnitEdit;
