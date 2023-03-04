import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import GroupDelete from "./GroupDelete";
import GroupEdit from "./GroupEdit";

const GroupTable = ({
  group,
  id,
  setDeleteGroupId,
  setEditGroupId,
  setViewGroupId,
  setEditGroId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{group?.group_name}</p>
      </td>

      <td class=" py-4 flex justify-end">
        <div>
          {showDeleteModal ? (
            <>
              <GroupDelete
                group={group}
                setShowDeleteModal={setShowDeleteModal}
                setDeleteGroupId={setDeleteGroupId}
              />
            </>
          ) : null}
        </div>
        <div>
          {showEditModal ? (
            <>
              <GroupEdit
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                group={group}
                id={id}
                setEditGroupId={setEditGroupId}
                setEditGroId={setEditGroId}
              />
            </>
          ) : null}
        </div>
        <div className="w-32">
          <button
            onClick={() => {
              setShowViewModal(true);
              setViewGroupId(group?.id);
            }}
          >
            <AiFillEye
              onClick={() => navigate(`/posts/${group.id}`)}
              className="text-gray-500 mr-2 text-2xl"
            />
          </button>
          <button
            onClick={() => {
              setShowEditModal(true);
              setEditGroupId(group?.id);
            }}
          >
            <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
          </button>
          <button
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteGroupId(group?.id);
            }}
          >
            <RiDeleteBin2Fill className="text-gray-500 text-2xl" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default GroupTable;
