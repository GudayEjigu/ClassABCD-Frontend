import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import EmoticonTypesAdd from "./EmoticonTypesAdd";
import EmoticonTypesTable from "./EmoticonTypesTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmoticonTypes = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteEmoticonTypeId, setDeleteEmoticonTypeId] = useState(false);
  const [editEmoticonTypeId, setEditEmoticonTypeId] = useState(false);

  const [viewEmoticonTypeId, setViewEmoticonTypeId] = useState(false);
  const [editEmoTypId, setEditEmoTypId] = useState(null);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const EmoticonTypeData = useQuery(
    [
      "EmoticonTypeDataApi",
      showModal,
      deleteEmoticonTypeId,
      editEmoticonTypeId,
      editEmoTypId,
    ],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/emoticon-types`,
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
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        if (deleteEmoticonTypeId == 1) {
          toast.success("Delete Success");
        }
        setDeleteEmoticonTypeId(null);
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
        Emoticon Types{" "}
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Emoticon Type
        </button>
      </div>
      {showModal ? <EmoticonTypesAdd setShowModal={setShowModal} /> : null}
      {EmoticonTypeData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {EmoticonTypeData.isLoading ? (
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
                  <th class="px-6 py-3">Name </th>
                  <th class="px-6 py-3">Description </th>

                  <th class="px-6 py-3  pr-16 flex justify-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {EmoticonTypeData?.data?.data?.data.map((emoticonType, id) => (
                  <EmoticonTypesTable
                    emoticonType={emoticonType}
                    id={id}
                    setDeleteEmoticonTypeId={setDeleteEmoticonTypeId}
                    setEditEmoticonTypeId={setEditEmoticonTypeId}
                    setEditEmoTypId={setEditEmoTypId}
                    setViewEmoticonTypeId={setViewEmoticonTypeId}
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

export default EmoticonTypes;
