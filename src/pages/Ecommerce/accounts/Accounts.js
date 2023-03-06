import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import AccountsAdd from "./AccountsAdd";
import AccountsTable from "./AccountsTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accounts = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState(false);
  const [editAccountId, setEditAccountId] = useState(false);
  const [editAccId, setEditAccId] = useState(false);
  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const AccountData = useQuery(
    ["AccountDataApi", showModal, deleteAccountId, editAccountId, editAccId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/accounts`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        if (deleteAccountId == 1) {
          toast.success("Delete Success");
        }
        setDeleteAccountId(null);
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
        Account
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Account
        </button>
      </div>
      {showModal ? <AccountsAdd setShowModal={setShowModal} /> : null}
      {AccountData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {AccountData.isLoading ? (
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
                  <th class="px-6 py-3">Account Amharic Name</th>
                  <th class="px-6 py-3">Account English Name</th>
                  <th class="px-6 py-3">Account type</th>
                  <th class="px-6 py-3">Account Number</th>
                  <th class="px-6 py-3">status </th>

                  <th class="px-6 py-3 flex justify-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {AccountData?.data?.data?.data.map((account, id) => (
                  <AccountsTable
                    account={account}
                    id={id}
                    setDeleteAccountId={setDeleteAccountId}
                    setEditAccountId={setEditAccountId}
                    setEditAccId={setEditAccId}
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

export default Accounts;
