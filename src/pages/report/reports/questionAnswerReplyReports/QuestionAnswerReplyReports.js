import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../../context/auth";

import QuestionAnswerReplyReportsTable from "./QuestionAnswerReplyReportsTable";

const QuestionAnswerReplyReports = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteQARReportId, setDeleteQARReportId] = useState(false);
  const [editQARReportId, setEditQARReportId] = useState(false);

  const [viewQARReportId, setViewQARReportId] = useState(false);
  const [editQARRepId, setEditQARRepId] = useState(false);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const QARReportData = useQuery(
    [
      "QARReportDataApi",
      showModal,
      deleteQARReportId,
      editQARReportId,
      editQARRepId,
    ],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/question-answer-reply-reports`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        setDeleteQARReportId(null);
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
        Question Answer Reply Reports
      </h2>

      {QARReportData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {QARReportData.isLoading ? (
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
                  <th class="px-6 py-3">QAR Report explanation</th>
                </tr>
              </thead>
              <tbody>
                {QARReportData?.data?.data?.data.map((QARReport, id) => (
                  <QuestionAnswerReplyReportsTable
                    QAReport={QARReport}
                    id={id}
                    setDeleteQARReportId={setDeleteQARReportId}
                    setEditQARReportId={setEditQARReportId}
                    setEditQARRepId={setEditQARRepId}
                    setViewQARReportId={setViewQARReportId}
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

export default QuestionAnswerReplyReports;
