import React from "react";

const QuestionAnswerReplyReportsTable = ({ QARReport, id }) => {
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{QARReport?.explanation}</p>
      </td>
    </tr>
  );
};

export default QuestionAnswerReplyReportsTable;
