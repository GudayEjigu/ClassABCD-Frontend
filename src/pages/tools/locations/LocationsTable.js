import React, { useState } from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import LocationsDelete from "./LocationsDelete";
import LocationsEdit from "./LocationsEdit";

const LocationsTable = ({
  locations,
  id,
  setDeleteLocationsId,
  setEditLocationsId,
  setEditLocId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <tr key={id} class="bg-white border-b ">
      <td class="px-6 py-4">
        <p>{locations?.name?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{locations?.name?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <LocationsDelete
                  locations={locations}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteLocationsId={setDeleteLocationsId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <LocationsEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  locations={locations}
                  id={id}
                  setEditLocationsId={setEditLocationsId}
                  setEditLocId={setEditLocId}
                />
              </>
            ) : null}
          </div>
          <div className="w-32">
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditLocationsId(locations?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteLocationsId(locations?.id);
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

export default LocationsTable;
