import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmoticonTypesDelete from "./EmoticonTypesDelete";
import EmoticonTypesEdit from "./EmoticonTypesEdit";
const EmoticonTypesTable = ({
  emoticonType,
  id,
  setDeleteEmoticonTypeId,
  setEditEmoticonTypeId,
  setViewEmoticonTypeId,
  setEditEmoTypId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{emoticonType?.name}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{emoticonType?.description}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <EmoticonTypesDelete
                  emoticonType={emoticonType}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteEmoticonTypeId={setDeleteEmoticonTypeId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <EmoticonTypesEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  emoticonType={emoticonType}
                  id={id}
                  setEditEmoticonTypeId={setEditEmoticonTypeId}
                  setEditEmoTypId={setEditEmoTypId}
                />
              </>
            ) : null}
          </div>
          <div className="w-24">
            {/*   <button
              onClick={() => {
                setShowViewModal(true);
                setViewEmoticonTypeId(emoticonType?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/emoticon-Types/${emoticonType.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button> */}
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditEmoticonTypeId(emoticonType?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteEmoticonTypeId(emoticonType?.id);
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

export default EmoticonTypesTable;
