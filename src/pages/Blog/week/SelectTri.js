import React from "react";

const SelectTri = ({
  trisemester,
  id,
  setWeekTrisemesterId,
  trimesterSelectHandler,
}) => {
  return (
    <div key={id}>
      {" "}
      <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={setWeekTrisemesterId(trisemester?.id)}
      >
        <option selected>Select Trimester English Name</option>

        <>
          {}
          <option key={id}>{trisemester?.name?.english}</option>
        </>
      </select>
    </div>
  );
};

export default SelectTri;
