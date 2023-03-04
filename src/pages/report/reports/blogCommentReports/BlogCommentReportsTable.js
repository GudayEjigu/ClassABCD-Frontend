import React from "react";

const BlogCommentReportsTable = ({ blogCommentReport, id }) => {
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{blogCommentReport?.explanation}</p>
      </td>
    </tr>
  );
};

export default BlogCommentReportsTable;
