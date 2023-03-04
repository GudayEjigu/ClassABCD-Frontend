import React from "react";

const BlogReportsTable = ({ blogReport, id }) => {
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{blogReport?.explanation}</p>
      </td>
    </tr>
  );
};

export default BlogReportsTable;
