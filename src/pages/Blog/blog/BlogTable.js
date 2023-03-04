import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BlogDelete from "./BlogDelete";
import BlogEdit from "./BlogEdit";

const BlogTable = ({
  blog,
  id,
  setDeleteBlogId,
  setEditBlogId,
  setEditBloId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6  py-4">
        <p>{blog?.title?.english}</p>
      </td>
      <td class="px-6 py-4">
        <p>{blog?.title?.amharic}</p>
      </td>

      <td class="px-6 py-4">
        <p>{blog?.category?.name?.english}</p>
      </td>

      <td class="px-6 py-4">
        <p>{blog?.diffForHumans}</p>
      </td>
      <td class="px-6 py-4">
        <p>{blog?.likes_count}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <BlogDelete
                  blog={blog}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteBlogId={setDeleteBlogId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <BlogEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  blog={blog}
                  id={id}
                  setEditBlogId={setEditBlogId}
                  setEditBloId={setEditBloId}
                />
              </>
            ) : null}
          </div>
          <div className="w-32">
            <button>
              <AiFillEye
                onClick={() => navigate(`/blog-view/${blog.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button>
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditBlogId(blog?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 mr-2 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteBlogId(blog?.id);
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

export default BlogTable;
