import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ExercisesDelete from "./ExercisesDelete";
import ExercisesEdit from "./ExercisesEdit";

const ExercisesTable = ({
  exercise,
  id,
  setDeleteExerciseId,
  setEditExerciseId,
  setViewExerciseId,
  setEditExeId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();
  return (
    <tr key={id} class="bg-white border-b">
      <td class="px-6 py-4">
        <p>{exercise?.exercise_name}</p>
      </td>

      <td class="px-6 py-4">
        <div className="flex justify-end">
          <div>
            {showDeleteModal ? (
              <>
                <ExercisesDelete
                  exercise={exercise}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteExerciseId={setDeleteExerciseId}
                />
              </>
            ) : null}
          </div>
          <div>
            {showEditModal ? (
              <>
                <ExercisesEdit
                  showEditModal={showEditModal}
                  setShowEditModal={setShowEditModal}
                  exercise={exercise}
                  id={id}
                  setEditExerciseId={setEditExerciseId}
                  setEditExeId={setEditExeId}
                />
              </>
            ) : null}
          </div>
          <div className="">
            <button
              onClick={() => {
                setShowViewModal(true);
                setViewExerciseId(exercise?.id);
              }}
            >
              <AiFillEye
                onClick={() => navigate(`/posts/${exercise.id}`)}
                className="text-gray-500 mr-2 text-2xl"
              />
            </button>
            <button
              onClick={() => {
                setShowEditModal(true);
                setEditExerciseId(exercise?.id);
              }}
            >
              <RiEdit2Fill className="text-gray-500 text-2xl" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteExerciseId(exercise?.id);
              }}
            >
              <RiDeleteBin2Fill className="text-gray-500 text-2xl" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ExercisesTable;
