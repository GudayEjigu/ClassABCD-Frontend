import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import WeekDelete from "./WeekDelete";
import WeekEdit from "./WeekEdit";
const WeekTable = ({
  week,
  id,
  setDeleteWeekId,
  setEditWeekId,
  setEditWeeId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b ">
      <td class="px-6 py-4">
        <p>{week?.name?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{week?.name?.amharic}</p>
      </td>
      <td class="px-6 py-4">
        <p>{week?.description?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{week?.description?.amharic}</p>
      </td>
      <td class="px-2 py-4">
        <p>{week?.week_number}</p>
      </td>

      <td class="px-6 py-4 flex justify-end ">
        <div className="w-20">
          <div>
            {showDeleteModal ? (
              <>
                <WeekDelete
                  week={week}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteWeekId={setDeleteWeekId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <WeekEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  week={week}
                  id={id}
                  setEditWeekId={setEditWeekId}
                  setEditWeeId={setEditWeeId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditWeekId(week?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteWeekId(week?.id);
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

export default WeekTable;
