import React, { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import BlogCommentReportsTable from "./BlogCommentReportsTable";
import { useAuth } from "../../../../context/auth";

const BlogCommentReports = () => {
  const [showModal, setShowModal] = useState(false);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const blogCommentReportData = useQuery(
    ["blogCommentReportDataApi", showModal],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/blog-comment-reports`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {},
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
        Blog Comment Reports
      </h2>

      {blogCommentReportData.isLoading ? (
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
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">Blog Comment Report explanation</th>
                </tr>
              </thead>
              <tbody>
                {blogCommentReportData?.data?.data?.data.map(
                  (blogCommentReport, id) => (
                    <BlogCommentReportsTable
                      blogCommentReport={blogCommentReport}
                      id={id}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCommentReports;
