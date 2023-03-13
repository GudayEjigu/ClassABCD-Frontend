import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import SpecialityDelete from "./SpecialityDelete";
import SpecialityEdit from "./SpecialityEdit";

const SpecialityTable = ({
  speciality,
  id,
  setDeleteSpecialityId,
  setEditSpecialityId,
  setEditSpecId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b ">
      <td class="px-6 py-4">
        <p>{speciality?.speciality}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <SpecialityDelete
                  speciality={speciality}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteSpecialityId={setDeleteSpecialityId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <SpecialityEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  speciality={speciality}
                  id={id}
                  setEditSpecialityId={setEditSpecialityId}
                  setEditSpecId={setEditSpecId}
                />
              </>
            ) : null}
          </div>
          <div className="w-32">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditSpecialityId(speciality?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteSpecialityId(speciality?.id);
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

export default SpecialityTable;
