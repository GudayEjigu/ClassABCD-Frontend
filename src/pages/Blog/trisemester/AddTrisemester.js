import axios from "axios";
import React, { useState } from "react";
import { GiToken } from "react-icons/gi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const AddTrisemester = ({ setShowModal }) => {
  const [englishName, setEnglishName] = useState();
  const [amharicName, setAmharicName] = useState();
  const [englishDescription, setEnglishDescription] = useState();
  const [amharicDescription, setAmharicDescription] = useState();

  const [order, setOrder] = useState();
  const [image, setImage] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const addTrisemesterHandler = () => {
    addTrisemesterMutationSubmitHandler();
  };

  const addTrisemesterMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/trimesters`,
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

  const addTrisemesterMutationSubmitHandler = async (values) => {
    let formData = new FormData();
    formData.append("nameEnglish", englishName);
    formData.append("nameAmharic", amharicName);
    formData.append("descriptionEnglish", englishDescription);
    formData.append("descriptionAmharic", amharicDescription);
    formData.append("trimester_image", image);
    formData.append("order", order);
    try {
      addTrisemesterMutation.mutate(formData, {
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
          toast.error(err?.response?.data?.message ?? "category add failed");
        },
      });
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
              <h3 className="text-3xl font-semibold">Add Trisemester</h3>
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
                      English Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setEnglishName(e.target.value);
                      }}
                    />

                    <label className="block text-black text-sm font-base mb-1">
                      Amharic Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setAmharicName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      English description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setEnglishDescription(e.target.value);
                      }}
                    />
                    <label className="block text-black text-sm font-base mb-1">
                      Amharic description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setAmharicDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <label className="block text-black text-sm font-base mb-1">
                  order
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  onChange={(e) => {
                    setOrder(e.target.value);
                  }}
                />
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                >
                  Trimester Image file
                </label>
                <input
                  required
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  type="file"
                />
                <p
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
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
                disabled={addTrisemesterMutation.isLoading}
                className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  addTrisemesterHandler();
                }}
              >
                {addTrisemesterMutation.isLoading ? "saving.." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddTrisemester;
