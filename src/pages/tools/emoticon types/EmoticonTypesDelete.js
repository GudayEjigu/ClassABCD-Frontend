import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const EmoticonTypesDelete = ({
  emoticonType,
  setDeleteEmoticonTypeId,
  setShowDeleteModal,
}) => {
  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const EmoticonTypesDeleteMutation = useMutation(
    async (deleteEmoticonType) =>
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL +
          `admin/emoticon-types/${deleteEmoticonType?.id}`,
        {
          headers,
          enabled: !!token,
        }
      ),
    {
      retry: false,
    }
  );

  const EmoticonTypesDeleteHandler = async (newData) => {
    try {
      EmoticonTypesDeleteMutation.mutate(
        {
          id: newData,
        },
        {
          onSuccess: (responseData) => {
            setDeleteEmoticonTypeId(null);
          },
          onError: (responseData) => {
            toast({
              title:
                responseData?.response?.data?.data || "Category not deleted!",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    } catch (err) {}
  };
  return (
    <div>
      {" "}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Delete Blog Category</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="text-2xl text-bold">
                Are you sure you want to delete?
              </p>
              <br />
              <p>Name:</p>
              <p>{emoticonType?.name}</p>
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
                  setDeleteEmoticonTypeId(1);
                  EmoticonTypesDeleteHandler(emoticonType?.id);
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
    </div>
  );
};

export default EmoticonTypesDelete;