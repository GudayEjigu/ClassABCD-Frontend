import React, { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../context/auth";
import BannerAdd from "./BannerAdd";
import BannerTable from "./BannerTable";
const Banner = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState(false);
  const [editBannerId, setEditBannerId] = useState(false);

  const [viewBannerId, setViewBannerId] = useState(false);
  const [editBanId, setEditBanId] = useState(false);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const BannerData = useQuery(
    ["BannerDataApi", showModal, deleteBannerId, editBannerId, editBanId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/banners`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        setDeleteBannerId(null);
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
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl ">
        Banner
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Banner
        </button>
      </div>
      {showModal ? <BannerAdd setShowModal={setShowModal} /> : null}
      {BannerData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {BannerData.isLoading ? (
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
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th class="px-6 py-3">Banner Name</th>

                  <th class="px-6 mr-6 py-3 flex justify-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {BannerData?.data?.data?.data.map((banner, id) => (
                  <BannerTable
                    banner={banner}
                    id={id}
                    setDeleteBannerId={setDeleteBannerId}
                    setEditBannerId={setEditBannerId}
                    setEditBanId={setEditBanId}
                    setViewBannerId={setViewBannerId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
