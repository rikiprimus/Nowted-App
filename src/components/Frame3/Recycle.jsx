import React, { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { useApp } from "../../hooks/useApp";

const Recycle = () => {
  const { note, noteId, notes, RestoreNote, DeleteNote } = useApp();

  const handleRestore = () => {
    RestoreNote("trash", false);
  };
  const handleDelete = () => {
    DeleteNote();
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 p-12">
      {!noteId ? (
        <div className="flex flex-col items-center font-semibold text-2xl text-dark-1 dark:text-white">
          <FaRecycle size={70} />
          Pilih Note to Restore/Delete
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 ">
          <FaRecycle size={70} />
          <div className="w-[500px] text-center">
            <p className="font-semibold text-4xl text-white">
              Restore or Delete {note?.title}
            </p>
            <p>
              Don't want to lose this note? It's not too late! Just click the
              'Restore' button and it will be added back to your list. Or delete
              note !
            </p>
          </div>
          <div className="w-[380px] flex flex-row items-center gap-8">
            <button
              onClick={handleRestore}
              className="w-full bg-purple text-white rounded-lg py-2 hover:bg-opacity-85 active:bg-opacity-50"
            >
              Restore
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-[#FF0000] text-white rounded-lg py-2 hover:bg-opacity-85 active:bg-opacity-50"
            >
              Delete Permanent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recycle;
