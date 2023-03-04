import React, { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../../context/auth";
import QuestionReportsAdd from "./QuestionReportsAdd";
import QuestionReportsTable from "./QuestionReportsTable";
const QuestionReports = () => {
  const [showModal, setShowModal] = useState(false);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const questionReportData = useQuery(
    ["questionReportDataApi", showModal],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/question-reports`,
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
        Question Reports
      </h2>
      {/* modal */}
      <div className="flex justify-end p-2">
        <button
          className=" block text-white bg-[#636ab1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 text-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Blog Report
        </button>
      </div>
      {showModal ? <QuestionReportsAdd setShowModal={setShowModal} /> : null}
      {questionReportData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {questionReportData.isLoading ? (
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
                  <th class="px-6 py-3">Question Report explanation</th>
                </tr>
              </thead>
              <tbody>
                {questionReportData?.data?.data?.data.map(
                  (questionReport, id) => (
                    <QuestionReportsTable
                      questionReport={questionReport}
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

export default QuestionReports;
