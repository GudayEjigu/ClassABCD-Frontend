import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const QuestionAnswerReportsTable = ({ QAReport, id }) => {
  const navigate = useNavigate();
  return (
    <tr
      key={id}
      class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
    >
      <td class="px-6 py-4">
        <p>{QAReport?.explanation}</p>
      </td>
    </tr>
  );
};

export default QuestionAnswerReportsTable;
