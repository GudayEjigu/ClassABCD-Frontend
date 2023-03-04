import React, { useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const ReasonAdd = ({ setShowModal }) => {
  const [reason, setReason] = useState();
  const [description, setDescription] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const addReasonHandler = () => {
    addReasonMutationSubmitHandler();
  };

  const addReasonMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/report-reasons`,
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

  const addReasonMutationSubmitHandler = async (values) => {
    try {
      addReasonMutation.mutate(
        {
          reason: reason,
          description: description,
        },
        {
          onSuccess: () => {
            setShowModal(false);
            toast.success("success", {
              style: {
                backgroundColor: "#22c55e",
                color: "white",
              },
            });
            setShowModal(false);
          },
          onError: (err) => {
            console.log({ err });
            toast.error(err?.response?.data?.message ?? "catReason add failed");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Reason</h3>
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
              <form className=" px-8 pt-6 pb-8 w-full">
                <div className="felx flex-row w-80">
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Reason
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setReason(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Description
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                disabled={addReasonMutation.isLoading}
                className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  addReasonHandler();
                }}
              >
                {addReasonMutation.isLoading ? "saving.." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ReasonAdd;
