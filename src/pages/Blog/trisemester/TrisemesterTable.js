import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import DeleteTrisemester from "./DeleteTrisemester";
import EditTrisemester from "./EditTrisemester";

const TrisemesterTable = ({
  trisemester,
  id,
  setDeleteTrisemesterId,
  setEditTrisemesterId,
  setEditTriId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <tr key={id} class="bg-white border-b ">
      <td class="px-6 py-4">
        <p>{trisemester?.name?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{trisemester?.name?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <p>{trisemester?.description?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{trisemester?.description?.amharic}</p>
      </td>
      <td class="px-6 py-4">
        <p>{trisemester?.order}</p>
      </td>

      <td class=" py-4 flex justify-end  ">
        <div>
          <div>
            {showDeleteModal ? (
              <>
                <DeleteTrisemester
                  trisemester={trisemester}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteTrisemesterId={setDeleteTrisemesterId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <EditTrisemester
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  trisemester={trisemester}
                  id={id}
                  setEditTrisemesterId={setEditTrisemesterId}
                  setEditTriId={setEditTriId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditTrisemesterId(trisemester.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteTrisemesterId(trisemester.id);
              }}
            >
              <RiDeleteBin2Fill className="text-gray-500 mr-6  text-2xl" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TrisemesterTable;
