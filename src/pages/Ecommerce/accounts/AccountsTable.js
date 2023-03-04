import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import AccountsDelete from "./AccountsDelete";
import AccountsEdit from "./AccountsEdit";
const AccountsTable = ({
  account,
  id,
  setDeleteAccountId,
  setEditAccountId,
  setEditAccId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{account?.account_name?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <p>{account?.account_name?.english}</p>
      </td>

      <td class="px-6 py-4">
        <p>{account?.account_type}</p>
      </td>
      <td class="px-6 py-4">
        <p>{account?.account_number}</p>
      </td>

      <td class="px-6 py-4">
        <p>{account?.status}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <AccountsDelete
                  account={account}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteAccountId={setDeleteAccountId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <AccountsEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  account={account}
                  id={id}
                  setEditAccountId={setEditAccountId}
                  setEditAccId={setEditAccId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditAccountId(account?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteAccountId(account?.id);
              }}
            >
              <RiDeleteBin2Fill className="text-gray-500 text-2xl" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AccountsTable;
