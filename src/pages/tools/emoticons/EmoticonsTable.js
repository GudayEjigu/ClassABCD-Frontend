import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmoticonsDelete from "./EmoticonsDelete";
import EmoticonsEdit from "./EmoticonsEdit";
const EmoticonsTable = ({
  emoticon,
  id,
  setDeleteEmoticonId,
  setEditEmoticonId,
  setViewEmoticonId,
  setEditEmoId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{emoticon?.name}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{emoticon?.description}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{emoticon?.type}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{emoticon?.emoticon_type?.name}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{emoticon?.emoticon_type.description}</p>
      </td>
      <td class="px-6 py-4">
        <div className="flex pl-6 justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <EmoticonsDelete
                  emoticon={emoticon}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteEmoticonId={setDeleteEmoticonId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <EmoticonsEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  emoticon={emoticon}
                  id={id}
                  setEditEmoticonId={setEditEmoticonId}
                  setEditEmoId={setEditEmoId}
                />
              </>
            ) : null}
          </div>
          <div className="w-24">
            {/*  <button
              onClick={() => {
                setShowViewModal(true);
                setViewEmoticonId(emoticon?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/emoticons/${emoticon.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button> */}
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditEmoticonId(emoticon?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteEmoticonId(emoticon?.id);
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

export default EmoticonsTable;
