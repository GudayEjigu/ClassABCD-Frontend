import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const EditTrisemester = ({
  showEditModal,
  setShowEditModal,
  trisemester,
  id,
  setEditTriId,

  setEditTrisemesterId,
}) => {
  const [englishName, setEnglishName] = useState(trisemester?.name?.english);
  const [amharicName, setAmharicName] = useState(trisemester?.name?.amharic);

  const [englishDescription, setEnglishDescription] = useState(
    trisemester?.description?.english
  );
  const [amharicDescription, setAmharicDescription] = useState(
    trisemester?.description?.amharic
  );
  const [order, setOrder] = useState(trisemester?.order);
  const [editTrisemester, setEditTrisemester] = useState();

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

  const editTrisemesterMutation = useMutation(
    async (editTrisemester) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL +
          `admin/trimesters/${editTrisemester?.id}`,
        params,
        config
      )
  );

  const editTrisemesterHandler = async (newData) => {
    console.log({ englishName });

    try {
      params.append("nameEnglish", englishName);
      params.append("nameAmharic", amharicName);
      params.append("descriptionEnglish", englishDescription);
      params.append("descriptionAmharic", amharicDescription);
      params.append("order", order);
      editTrisemesterMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            setShowEditModal(false);
            setEditTriId(null);
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

  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Edit trimester</h3>
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
                <form className=" px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-base mb-1">
                    English Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={trisemester?.name?.english}
                    onChange={(e) => {
                      setEnglishName(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={trisemester?.name?.amharic}
                    onChange={(e) => {
                      setAmharicName(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    English description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={trisemester?.description?.english}
                    onChange={(e) => {
                      setEnglishDescription(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={trisemester?.description?.amharic}
                    onChange={(e) => {
                      setAmharicDescription(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    order
                  </label>
                  <input
                    defaultValue={trisemester?.order}
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    onChange={(e) => {
                      setOrder(e.target.value);
                    }}
                  />
                </form>
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
                  disabled={editTrisemesterMutation.isLoading}
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    editTrisemesterHandler(trisemester?.id);
                    setEditTrisemester(trisemester?.id);
                    setEditTriId(1);

                    // window.location.reload(false);
                  }}
                >
                  {editTrisemesterMutation.isLoading
                    ? "Editing.."
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
};

export default EditTrisemester;
