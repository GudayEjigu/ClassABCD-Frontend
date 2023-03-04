import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import { toast } from "react-toastify";
import DeleteModal from "../../components/DeleteCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";
import DeleteCommunityCategory from "./ManageCommunity/DeleteCommunityCategory";

const CategoryCommunity = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [englishName, setEnglishName] = useState();
  const [amharicName, setAmharicName] = useState();
  const [categoryDatas, setCategoryDatas] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [type, setType] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const categoryData = useQuery(
    ["categoryDataApi", showModal, deleteCategoryId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/categories`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {},
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  // console.log(categoryData.data.data.data[1].name.english);
  //Add category

  const addCategoryHandler = () => {
    setType("2");
    addCategoryMutationSubmitHandler();
  };

  const addCategoryMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/categories`,
        newData,
        {
          headers,
        }
      ),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {},
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const addCategoryMutationSubmitHandler = async (values) => {
    try {
      addCategoryMutation.mutate(
        {
          nameEnglish: englishName,
          nameAmharic: amharicName,
          type: "1",
        },
        {
          onSuccess: () => {
            setShowModal(false);
            toast.success("success", {
              style: {
                backgroundColor: "#22c55e",
                color: "white",
              },
            });
            setShowModal(false);
          },
          onError: (err) => {
            console.log({ err });
            toast.error(err?.response?.data?.message ?? "category add failed");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
        Community Category
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add a category
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Blog Category</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className=" px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-base mb-1">
                      English Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setEnglishName(e.target.value);
                      }}
                    />
                    <label className="block text-black text-sm font-base mb-1">
                      Amharic Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setAmharicName(e.target.value);
                      }}
                    />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    disabled={addCategoryMutation.isLoading}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      addCategoryHandler();
                      setCategoryDatas();
                      // window.location.reload(false);
                    }}
                  >
                    {addCategoryMutation.isLoading
                      ? "saving.."
                      : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div class="relative shadow-md sm:rounded-lg">
        <table class="w-auto text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th class="px-6 py-3">English Name</th>
              <th class="px-6 py-3">Amharic Name</th>
              <th class="px-6 py-3">ID</th>
              <th class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryData?.data?.data?.data.map((category, id) => (
              <DeleteCommunityCategory
                category={category}
                id={id}
                setDeleteCategoryId={setDeleteCategoryId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryCommunity;
