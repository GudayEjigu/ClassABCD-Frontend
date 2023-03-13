import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ManageExpertDelete from "./ManageExpertDelete";
import ManageExpertEdit from "./ManageExpertEdit";
const ManageExpertTable = ({
  expert,
  id,
  setDeleteProductId,
  setEditProductId,
  setViewProductId,
  setEditExpId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{expert?.user?.name}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{expert?.user?.phone}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{expert?.speciality?.speciality}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{expert?.patient_count}</p>
      </td>
      <td class="px-6 py-4">
        <p>{expert?.babies_count}</p>
      </td>
      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <ManageExpertDelete
                  expert={expert}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteProductId={setDeleteProductId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <ManageExpertEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  expert={expert}
                  id={id}
                  setEditProductId={setEditProductId}
                  setEditExpId={setEditExpId}
                />
              </>
            ) : null}
          </div>
          <div className="w-24">
            <button
              onClick={() => {
                setShowViewModal(true);
                setViewProductId(expert?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/experts/${expert.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button>
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditProductId(expert?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteProductId(expert?.id);
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

export default ManageExpertTable;
