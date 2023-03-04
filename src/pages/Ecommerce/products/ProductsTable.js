import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductsDelete from "./ProductsDelete";
import ProductsEdit from "./ProductsEdit";
const ProductsTable = ({
  product,
  id,
  setDeleteProductId,
  setEditProductId,
  setViewProductId,
  setEditProId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{product?.name?.english}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{product?.description?.english}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{product?.brand}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{product?.category?.name?.english}</p>
      </td>{" "}
      <td class="px-6 py-4">
        <p>{product?.owner?.name}</p>
      </td>
      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <ProductsDelete
                  product={product}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteProductId={setDeleteProductId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <ProductsEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  product={product}
                  id={id}
                  setEditProductId={setEditProductId}
                  setEditProId={setEditProId}
                />
              </>
            ) : null}
          </div>
          <div className="w-24">
            <button
              onClick={() => {
                setShowViewModal(true);
                setViewProductId(product?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/products/${product.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button>
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditProductId(product?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteProductId(product?.id);
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

export default ProductsTable;
