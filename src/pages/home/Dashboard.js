import React, { useState, Component } from "react";
import axios from "axios";

import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import Select from "react-select";
import { useAuth } from "../../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myDefault = [{ id: 0, name: "select an option" }];

function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(false);
  const [editBlogId, setEditBlogId] = useState(false);
  const [editBloId, setEditBloId] = useState(false);
  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const BlogData = useQuery(
    ["BlogDataApi", showModal, deleteBlogId, editBlogId, editBloId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/blogs`, {
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

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
  };

  let tempObj = [];

  BlogData?.data?.data?.data?.map((item) => {
    tempObj.push({ id: item.id, name: item.title.english });
  });
  const options = [
    ...tempObj,
    { id: 2, name: "Ilaa Beach Maldives" },
    { id: 3, name: "Finolhu" },
    { id: 4, name: "Arena" },
    { id: 5, name: "Kaani Beach Hotel" },
  ];

  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT,
    });

    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  return (
    <div className="mx-auto container py-8">
      <h1 className="text-sm">Select Hotels</h1>
      <div className="flex flex-wrap items-center lg:justify-between justify-center">
        <div className=" px-2	">
          {" "}
          <button onClick={notify} className="text-red-500">
            Notify
          </button>
          <Select
            isMulti={true}
            styles={{
              menuPortal: (base) => ({
                zIndex: 999999,
              }),
            }}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            defaultValue={myDefault}
            options={options}
            onChange={(newSelection) => {
              console.log({ newSelection });
            }}
          />
        </div>
        <div>{selectedOptions}</div>
      </div>
      ;
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
