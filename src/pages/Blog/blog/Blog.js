import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";
import BlogAdd from "./BlogAdd";
import BlogTable from "./BlogTable";
const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(false);
  const [editBlogId, setEditBlogId] = useState(false);
  const [editBloId, setEditBloId] = useState(false);
  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const BlogData = useQuery(
    ["BlogDataApi", showModal, deleteBlogId, editBlogId, editBloId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/blogs`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  return (
    <div>
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
        Blog
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Blog
        </button>
      </div>
      {showModal ? <BlogAdd setShowModal={setShowModal} /> : null}
      {BlogData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {BlogData.isLoading ? (
        <div className="h-44 flex items-center justify-center min-h-0">
          <Bars
            height="40"
            width="40"
            color="#636ab1"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div class="relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs  text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="px-6  py-3">English title</th>
                  <th class="px-6 py-3">Amharic title</th>

                  <th class="px-6 py-3">English category name</th>

                  <th class="px-6 py-3">Created at</th>
                  <th class="px-6 py-3">Likes</th>

                  <th class="px-6 py-3 flex justify-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {BlogData?.data?.data?.data.map((blog, id) => (
                  <BlogTable
                    blog={blog}
                    id={id}
                    setDeleteBlogId={setDeleteBlogId}
                    setEditBlogId={setEditBlogId}
                    setEditBloId={setEditBloId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
