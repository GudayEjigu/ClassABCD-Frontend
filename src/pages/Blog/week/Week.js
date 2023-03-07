import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import WeekAdd from "./WeekAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeekTable from "./WeekTable";

const Week = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteWeekId, setDeleteWeekId] = useState(false);
  const [editWeekId, setEditWeekId] = useState(false);
  const [editWeeId, setEditWeeId] = useState(false);
  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const WeekData = useQuery(
    ["WeekDataApi", showModal, deleteWeekId, editWeekId, editWeeId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/weeks`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        if (deleteWeekId == 1) {
          toast.success("Delete Success");
        }
        setDeleteWeekId(null);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  return (
    <div>
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
        Week
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Week
        </button>
      </div>
      {showModal ? <WeekAdd setShowModal={setShowModal} /> : null}
      {WeekData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {WeekData.isLoading ? (
        <div className="h-44 flex items-center justify-center min-h-0">
          <Bars
            height="40"
            width="40"
            color="#72A0C1"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div class="relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">Week Egnlish Name</th>
                  <th class="px-6 py-3">Week Amharic Name</th>
                  <th class="px-6 py-3">Week English Description</th>
                  <th class="px-6 py-3">Week Amharic Description</th>
                  <th class="px-6 py-3">Week Number</th>

                  <th class="px-8 py-3 flex justify-satrt ">Action</th>
                </tr>
              </thead>
              <tbody>
                {WeekData?.data?.data?.data.map((week, id) => (
                  <WeekTable
                    week={week}
                    id={id}
                    setDeleteWeekId={setDeleteWeekId}
                    setEditWeekId={setEditWeekId}
                    setEditWeeId={setEditWeeId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Week;
