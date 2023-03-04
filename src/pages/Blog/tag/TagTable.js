import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import DeleteTag from "./DeleteTag";
import EditTag from "./EditTag";

const TagTable = ({ tag, id, setDeleteTagId, setEditTagId, setEditTaId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b ">
      <td class="px-6 py-4">
        <p>{tag?.name?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{tag?.name?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <DeleteTag
                  tag={tag}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteTagId={setDeleteTagId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <EditTag
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  tag={tag}
                  id={id}
                  setEditTagId={setEditTagId}
                  setEditTaId={setEditTaId}
                />
              </>
            ) : null}
          </div>
          <div className="w-32">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditTagId(tag?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteTagId(tag?.id);
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

export default TagTable;
