import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationsTable from "./LocationsTable";
import LocationsAdd from "./LocationsAdd";

const Locations = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteLocationsId, setDeleteLocationsId] = useState(false);
  const [editLocationsId, setEditLocationsId] = useState(false);
  const [editLocId, setEditLocId] = useState(false);
  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const LocationsData = useQuery(
    [
      "LocationsDataApi",
      showModal,
      deleteLocationsId,
      editLocationsId,
      editLocId,
    ],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/locations`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        if (deleteLocationsId == 1) {
          toast.success("Delete Success");
        }
        setDeleteLocationsId(null);
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
        Locations
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10  py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Locations
        </button>
      </div>
      {showModal ? <LocationsAdd setShowModal={setShowModal} /> : null}
      {LocationsData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {LocationsData.isLoading ? (
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
                  <th class="px-6 py-3">English Locations</th>
                  <th class="px-6 py-3">Amharic Locations</th>

                  <th class="px-6 py-3 mr-16 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {LocationsData?.data?.data?.data.map((locations, id) => (
                  <LocationsTable
                    locations={locations}
                    id={id}
                    setDeleteLocationsId={setDeleteLocationsId}
                    setEditLocationsId={setEditLocationsId}
                    setEditLocId={setEditLocId}
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

export default Locations;
