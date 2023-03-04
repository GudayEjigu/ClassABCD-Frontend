import React, { useState } from "react";

import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

import { toast } from "react-toastify";

import { useAuth } from "../context/auth";
import { ImageList } from "@mui/material";
const DeleteCategoryModal = ({
  category,
  id,
  setDeleteCategoryId,
  setEditCategoryId,
  setEditBlogId,
}) => {
  const [englishName, setEnglishName] = useState();
  const [amharicName, setAmharicName] = useState();
  const [image, setImage] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategoryIds, setEditCategoryIds] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const DeleteCategoryMutation = useMutation(
    async (deleteCategory) =>
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL +
          `admin/categories/${deleteCategory?.id}`,
        {
          headers,
          enabled: !!token,
        }
      ),
    {
      retry: false,
    }
  );

  const DeleteCategoryHandler = async (newData) => {
    try {
      DeleteCategoryMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: (responseData) => {
            setDeleteCategoryId(null);
            toast({
              title: "Category deleted successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          },
          onError: (responseData) => {
            toast({
              title:
                responseData?.response?.data?.message ||
                "Category not deleted!",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    } catch (err) {}
  };

  const config = {
    headers,
  };
  const params = new URLSearchParams();

  const editCategoryMutation = useMutation(
    async (editCategory) =>
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL +
          `admin/categories/${editCategory?.id}`,
        params,
        config
      )
  );

  const editCategoryHandler = async (newData) => {
    console.log({ englishName });

    // const config = {
    //   headers,
    // };
    // axios.patch(
    //   process.env.REACT_APP_BACKEND_URL + `admin/categories/${editCategoryIds}`,
    //   params,
    //   config
    // );
    //editCategoryMutation.mutate()
    try {
      params.append("nameEnglish", englishName);
      params.append("nameAmharic", amharicName);
      params.append("type", 2);
      editCategoryMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: () => {
            setShowEditModal(false);
            setEditBlogId(null);
            toast.success("success", {
              style: {
                backgroundColor: "#22c55e",
                color: "white",
              },
            });
            setShowEditModal(false);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr key={id} class="bg-white border-b">
      <>
        <td class="px-6 py-4">
          <p>{category?.name?.english}</p>
        </td>
        <td class="px-6 py-4">
          <p>{category?.name?.amharic}</p>
        </td>

        <td class="px-6 py-4">
          <div className="flex justify-end">
            <div>
              {showDeleteModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Delete Blog Category
                          </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="text-2xl text-bold">
                            Are you sure you want to delete?
                          </p>
                          <br />
                          <p>English name:</p>
                          <p>{category?.name?.english}</p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              setShowDeleteModal(false);
                              DeleteCategoryHandler(category?.id);
                              //window.location.reload(false);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>

            <div>
              {showEditModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Blog Category
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowEditModal(false)}
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
                              defaultValue={category?.name?.english}
                              onChange={(e) => {
                                setEnglishName(e.target.value);
                              }}
                            />
                            <label className="block text-black text-sm font-base mb-1">
                              Amharic Name
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                              defaultValue={category?.name?.amharic}
                              onChange={(e) => {
                                setAmharicName(e.target.value);
                              }}
                            />
                            <label className="block text-black text-sm font-base mb-1">
                              Image
                            </label>
                            <ImageList
                              className="ml-4  mr-6  border-2 shadow-lg rounded"
                              sx={{ width: 550, height: 250 }}
                              cols={3}
                              rowHeight={200}
                            >
                              <img
                                src={`${category?.category_image}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${category?.category_image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt="image"
                                loading="lazy"
                              />
                            </ImageList>
                          </form>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-gray-900 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowEditModal(false)}
                          >
                            Close
                          </button>
                          <button
                            disabled={editCategoryMutation.isLoading}
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              setEditCategoryIds(category?.id);
                              setEditCategoryId(category?.id);
                              editCategoryHandler(category.id);
                              setEditBlogId(1);
                              // window.location.reload(false);
                            }}
                          >
                            {editCategoryMutation.isLoading
                              ? "Editing.."
                              : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditCategoryId(category.id);
                setEnglishName(category?.name?.english);
                setAmharicName(category?.name?.amharic);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteCategoryId(category.id);
              }}
            >
              <RiDeleteBin2Fill className="text-gray-500 text-2xl" />
            </button>
          </div>
        </td>
      </>
    </tr>
  );
};

export default DeleteCategoryModal;
