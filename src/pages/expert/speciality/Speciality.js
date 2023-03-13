import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpecialityTable from "./SpecialityTable";
import SpecialityAdd from "./SpecialityAdd";

const Speciality = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteSpecialityId, setDeleteSpecialityId] = useState(false);
  const [editSpecialityId, setEditSpecialityId] = useState(false);
  const [editSpecId, setEditSpecId] = useState(false);
  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const SpecialityData = useQuery(
    [
      "SpecialityDataApi",
      showModal,
      deleteSpecialityId,
      editSpecialityId,
      editSpecId,
    ],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/specialities`,
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
        if (deleteSpecialityId == 1) {
          toast.success("Delete Success");
        }
        setDeleteSpecialityId(null);
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
        Speciality
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10  py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Speciality
        </button>
      </div>
      {showModal ? <SpecialityAdd setShowModal={setShowModal} /> : null}
      {SpecialityData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {SpecialityData.isLoading ? (
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
                  <th class="px-6 py-3">Speciality</th>

                  <th class="px-6 py-3 mr-16 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SpecialityData?.data?.data?.data.map((speciality, id) => (
                  <SpecialityTable
                    speciality={speciality}
                    id={id}
                    setDeleteSpecialityId={setDeleteSpecialityId}
                    setEditSpecialityId={setEditSpecialityId}
                    setEditSpecId={setEditSpecId}
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

export default Speciality;
