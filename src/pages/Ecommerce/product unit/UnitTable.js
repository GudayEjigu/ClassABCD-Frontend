import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

import UnitDelete from "./UnitDelete";
import UnitEdit from "./UnitEdit";

const UnitTable = ({
  unit,
  id,
  setDeleteUnitId,
  setEditUnitId,
  setEditUniId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{unit?.name?.english}</p>
      </td>

      <td class="px-6 py-4">
        <p>{unit?.name?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <UnitDelete
                  unit={unit}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteUnitId={setDeleteUnitId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <UnitEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  unit={unit}
                  id={id}
                  setEditUnitId={setEditUnitId}
                  setEditUniId={setEditUniId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditUnitId(unit?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteUnitId(unit?.id);
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

export default UnitTable;
