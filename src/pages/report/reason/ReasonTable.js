import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import ReasonDelete from "./ReasonDelete";
import ReasonEdit from "./ReasonEdit";
const ReasonTable = ({
  reason,
  id,
  setDeleteReasonId,
  setEditReasonId,
  setViewReasonId,
  setEditReaId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{reason?.reason}</p>
      </td>
      <td class="px-6 py-4">
        <p>{reason?.description}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <ReasonDelete
                  reason={reason}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteReasonId={setDeleteReasonId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <ReasonEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  reason={reason}
                  id={id}
                  setEditReasonId={setEditReasonId}
                  setEditReaId={setEditReaId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditReasonId(reason?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteReasonId(reason?.id);
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

export default ReasonTable;
