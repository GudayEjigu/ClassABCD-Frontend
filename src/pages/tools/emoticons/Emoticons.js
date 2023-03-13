import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import EmoticonsAdd from "./EmoticonsAdd";
import EmoticonsTable from "./EmoticonsTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Emoticons = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteEmoticonId, setDeleteEmoticonId] = useState(false);
  const [editEmoticonId, setEditEmoticonId] = useState(false);

  const [viewEmoticonId, setViewEmoticonId] = useState(false);
  const [editEmoId, setEditEmoId] = useState(null);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const EmoticonData = useQuery(
    ["EmoticonDataApi", showModal, deleteEmoticonId, editEmoticonId, editEmoId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/emoticons`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        if (deleteEmoticonId == 1) {
          toast.success("Delete Success");
        }
        setDeleteEmoticonId(null);
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
        Emoticons{" "}
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Emoticon
        </button>
      </div>
      {showModal ? <EmoticonsAdd setShowModal={setShowModal} /> : null}
      {EmoticonData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {EmoticonData.isLoading ? (
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
                  <th class="px-6 py-3">type</th>
                  <th class="px-6 py-3">Emoticon type name </th>
                  <th class="px-6 py-3">Emoticon type description</th>

                  <th class="px-6 py-3 flex justify-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {EmoticonData?.data?.data?.data.map((emoticon, id) => (
                  <EmoticonsTable
                    emoticon={emoticon}
                    id={id}
                    setDeleteEmoticonId={setDeleteEmoticonId}
                    setEditEmoticonId={setEditEmoticonId}
                    setEditEmoId={setEditEmoId}
                    setViewEmoticonId={setViewEmoticonId}
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

export default Emoticons;
