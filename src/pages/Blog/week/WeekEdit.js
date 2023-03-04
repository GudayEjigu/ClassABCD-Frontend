import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";


const WeekEdit = ({
  showEditModal,
  setShowEditModal,
  week,
  id,
  setEditWeeId,

  setEditWeekId,
}) => {
  const [englishName, setEnglishName] = useState();
  const [amharicName, setAmharicName] = useState();
  const [weekNumber, setWeekNumber] = useState();
  const [weekTrisemesterId, setWeekTrisemesterId] = useState();

  const [englishDescription, setEnglishDescription] = useState(
    week?.description?.english
  );
  const [amharicDescription, setAmharicDescription] = useState(
    week?.description?.amharic
  );
  const [order, setOrder] = useState();
  const [editWeek, setEditWeek] = useState();

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

  const editWeekMutation = useMutation(
    async (editWeek) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL +
          `admin/weeks/${editWeek?.id}`,
        params,
        config
      )
  );

  const editWeekHandler = async (newData) => {
    console.log({ englishName });

    try {
      params.append("nameEnglish", englishName);
      params.append("nameAmharic", amharicName);
      params.append("descriptionEnglish", englishDescription);
      params.append("descriptionAmharic", amharicDescription);
      params.append("week_number", weekNumber);
      params.append("trimester_id", weekTrisemesterId);
      editWeekMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            setShowEditModal(false);
            setEditWeeId(null);
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
  const TrisemesterData = useQuery(
    ["TrisemesterDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/trimesters`, {
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

  const trimesterSelectHandler = (e) => {
    const id = e.target.value;
    setWeekTrisemesterId(id);
    console.log(id);
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
                <h3 className="text-3xl font-semibold">Edit week</h3>
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
                <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select
                  </label>
                  <select
                    id="countries"
                    defaultValue={week?.trimester_id}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      trimesterSelectHandler(e);
                    }}
                  >
                    <option selected>Select Trimester English Name</option>
                    {TrisemesterData?.data?.data?.data.map((trisemester) => (
                      <>
                        <option key={trisemester?.id} value={trisemester?.id}>
                          {trisemester?.name?.english}
                        </option>
                      </>
                    ))}
                  </select>
                  <label className="block text-black text-sm font-base mb-1">
                    English Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={week?.name?.english}
                    onChange={(e) => {
                      setEnglishName(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={week?.name?.amharic}
                    onChange={(e) => {
                      setAmharicName(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    English description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={week?.description?.english}
                    onChange={(e) => {
                      setEnglishDescription(e.target.value);
                    }}
                  />
                  <label className="block text-black text-sm font-base mb-1">
                    Amharic description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    defaultValue={week?.description?.amharic}
                    onChange={(e) => {
                      setAmharicDescription(e.target.value);
                    }}
                  />
                   <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Week Number
                    </label>
                    <input
                    defaultValue={week?.week_number}
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setWeekNumber(e.target.value);
                      }}
                    />
                  </div>
                  
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
                  disabled={editWeekMutation.isLoading}
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    editWeekHandler(week?.id);
                    setEditWeek(week?.id);
                    setEditWeeId(1);

                    // window.location.reload(false);
                  }}
                >
                  {editWeekMutation.isLoading
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

export default WeekEdit;
