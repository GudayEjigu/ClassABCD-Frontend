import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AppointmentDelete from "./AppointmentDelete";
import AppointmentEdit from "./AppointmentEdit";
const AppointmentTable = ({
  appointment,
  id,
  setDeleteAppointmentId,
  setEditAppointmentId,
  setViewAppointmentId,
  setEditGroId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{appointment?.doctor_id}</p>
      </td>
      <td class="px-6 py-4">
        <p>{appointment?.patient_id}</p>
      </td>
      <td class="px-6 py-4">
        <p>{appointment?.start_time}</p>
      </td>
      <td class="px-6 py-4">
        <p>{appointment?.end_time}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <AppointmentDelete
                  appointment={appointment}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteAppointmentId={setDeleteAppointmentId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <AppointmentEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  appointment={appointment}
                  id={id}
                  setEditAppointmentId={setEditAppointmentId}
                  setEditGroId={setEditGroId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditAppointmentId(appointment?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteAppointmentId(appointment?.id);
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

export default AppointmentTable;
