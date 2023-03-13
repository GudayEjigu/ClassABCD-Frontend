import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import ManageExpertAdd from "./ManageExpertAdd";
import ManageExpertTable from "./ManageExpertTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageExpert = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteExpertId, setDeleteExpertId] = useState(false);
  const [editExpertId, setEditExpertId] = useState(false);

  const [viewExpertId, setViewExpertId] = useState(false);
  const [editExpId, setEditExpId] = useState(null);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const ExpertData = useQuery(
    ["ExpertDataApi", showModal, deleteExpertId, editExpertId, editExpId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/experts`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        if (deleteExpertId == 1) {
          toast.success("Delete Success");
        }
        setDeleteExpertId(null);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
        toast.error("Failed");
      },
    }
  );
  return (
    <div>
      <h2
        class="mb-4 ml-4 
    text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl"
      >
        ManageExpert{" "}
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Expert
        </button>
      </div>
      {showModal ? <ManageExpertAdd setShowModal={setShowModal} /> : null}
      {ExpertData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {ExpertData.isLoading ? (
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
        <div>
          <div class="relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">Expert Name </th>
                  <th class="px-6 py-3">Phone</th>
                  <th class="px-6 py-3">Speciality</th>
                  <th class="px-6 py-3">Patients</th>
                  <th class="px-6 py-3">Babies</th>

                  <th class="px-6 py-3 pr-12 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ExpertData?.data?.data?.data.map((expert, id) => (
                  <ManageExpertTable
                    expert={expert}
                    id={id}
                    setDeleteExpertId={setDeleteExpertId}
                    setEditExpertId={setEditExpertId}
                    setEditExpId={setEditExpId}
                    setViewExpertId={setViewExpertId}
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

export default ManageExpert;
