import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import AddTrisemester from "./AddTrisemester";
import TrisemesterTable from "./TrisemesterTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trisemester = () => {
  const { token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleteTrisemesterId, setDeleteTrisemesterId] = useState(null);
  const [editTrisemesterId, setEditTrisemesterId] = useState(null);
  const [editTriId, setEditTriId] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const TrisemesterData = useQuery(
    [
      "TrisemesterDataApi",
      showModal,
      deleteTrisemesterId,
      editTrisemesterId,
      editTriId,
    ],
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
        if (deleteTrisemesterId == 1) {
          toast.success("Delete Success");
        }
        setDeleteTrisemesterId(null);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  return (
    <>
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
        Trisemester{" "}
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Trisemester
        </button>
      </div>

      {showModal ? <AddTrisemester setShowModal={setShowModal} /> : null}
      <div>
        {TrisemesterData.error ? (
          <div className="text-red-700 text-4xl">Error!</div>
        ) : null}
        {TrisemesterData.isLoading ? (
          <div className="h-44 flex items-center justify-center min-h-0">
            <Bars
              height="40"
              width="40"
              color="#636ab1"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div class="relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">English Name</th>
                  <th class="px-6 py-3">Amharic Name</th>
                  <th class="px-6 py-3">English Desc</th>
                  <th class="px-6 py-3">Amharic Desc</th>
                  <th class="px-6 py-3">order</th>

                  <th class="px-6 py-3 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {TrisemesterData?.data?.data?.data.map((trisemester, id) => (
                  <TrisemesterTable
                    trisemester={trisemester}
                    id={id}
                    setDeleteTrisemesterId={setDeleteTrisemesterId}
                    setEditTrisemesterId={setEditTrisemesterId}
                    setEditTriId={setEditTriId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Trisemester;
