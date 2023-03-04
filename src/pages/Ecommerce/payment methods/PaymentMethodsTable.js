import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import PaymentMethodsDelete from "./PaymentMethodsDelete";
import PaymentMethodsEdit from "./PaymentMethodsEdit";

const PaymentMethodsTable = ({
  payment,
  id,
  setDeletePaymentId,
  setEditPaymentId,
  setViewPaymentId,
  setEditPayId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{payment?.name?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{payment?.name?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <PaymentMethodsDelete
                  payment={payment}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeletePaymentId={setDeletePaymentId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <PaymentMethodsEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  payment={payment}
                  id={id}
                  setEditPaymentId={setEditPaymentId}
                  setEditPayId={setEditPayId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            {/* <button
              onClick={() => {
                setShowViewModal(true);
                setViewGroupId(group?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/posts/${group.id}`)}
                className="text-blue-600 mr-2 text-2xl"
              />
            </button> */}
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditPaymentId(payment?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeletePaymentId(payment?.id);
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

export default PaymentMethodsTable;
