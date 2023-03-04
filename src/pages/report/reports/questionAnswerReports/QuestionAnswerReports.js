import axios from "axios";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../../context/auth";
import QuestionAnswerReportsAdd from "./QuestionAnswerReportsAdd";
import QuestionAnswerReportsTable from "./QuestionAnswerReportsTable";

const QuestionAnswerReports = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteQAReportId, setDeleteQAReportId] = useState(false);
  const [editQAReportId, setEditQAReportId] = useState(false);

  const [viewQAReportId, setViewQAReportId] = useState(false);
  const [editQARepId, setEditQARepId] = useState(false);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const QAReportData = useQuery(
    [
      "QAReportDataApi",
      showModal,
      deleteQAReportId,
      editQAReportId,
      editQARepId,
    ],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/question-answer-reports`,
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
        setDeleteQAReportId(null);
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
        Question Answer Reports
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Question Answer Report
        </button>
      </div>
      {showModal ? (
        <QuestionAnswerReportsAdd setShowModal={setShowModal} />
      ) : null}
      {QAReportData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {QAReportData.isLoading ? (
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
                  <th class="px-6 py-3">QA Report explanation</th>
                </tr>
              </thead>
              <tbody>
                {QAReportData?.data?.data?.data.map((QAReport, id) => (
                  <QuestionAnswerReportsTable
                    QAReport={QAReport}
                    id={id}
                    setDeleteQAReportId={setDeleteQAReportId}
                    setEditQAReportId={setEditQAReportId}
                    setEditQARepId={setEditQARepId}
                    setViewQAReportId={setViewQAReportId}
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

export default QuestionAnswerReports;
