import axios from "axios";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import BannerDelete from "./BannerDelete";
import BannerEdit from "./BannerEdit";
const BannerTable = ({
  banner,
  id,
  setDeleteBannerId,
  setEditBannerId,
  setViewBannerId,
  setEditBanId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();

  return (
    <tr key={id} class="bg-white border-b ">
      <td class="px-6 py-4">
        <p>{banner?.title?.english}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <BannerDelete
                  banner={banner}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteBannerId={setDeleteBannerId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <BannerEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  banner={banner}
                  id={id}
                  setEditBannerId={setEditBannerId}
                  setEditBanId={setEditBanId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowViewModal(true);
                setViewBannerId(banner?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/banner/${banner.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button>
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditBannerId(banner?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteBannerId(banner?.id);
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

export default BannerTable;
