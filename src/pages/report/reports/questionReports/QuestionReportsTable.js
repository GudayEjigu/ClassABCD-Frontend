import React from "react";

const QuestionReportsTable = ({ QReport, id }) => {
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{QReport?.explanation}</p>
      </td>
    </tr>
  );
};

export default QuestionReportsTable;
