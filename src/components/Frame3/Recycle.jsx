import { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { useApp } from "../../hooks/useApp";

const Recycle = () => {
  const { noteId, dataMore, RestoreNote, DeleteNote } = useApp();

  const [selectedNote, setSelectedNote] = useState(null);

  // Updates the selected note whenever noteId or dataMore changes.
  useEffect(() => {
    if (dataMore && noteId) {
      const foundNote = dataMore.find(note => note._id === noteId);
      setSelectedNote(foundNote || null);
    }
  }, [dataMore, noteId]);

  // Function to handle the restoration of the note.
  const handleRestore = () => {
    RestoreNote("trash", false);
  };

  // Function to handle the permanent deletion of the note.
  const handleDelete = () => {
    DeleteNote();
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 p-12">
      {!noteId ? (
        // Display when no note is selected.
        <div className="flex flex-col items-center font-semibold text-2xl text-dark-1 dark:text-white">
          <FaRecycle size={70} />
          Pilih Note to Restore/Delete
        </div>
      ) : (
        // Display when a note is selected.
        <div className="flex flex-col items-center gap-4 ">
          <FaRecycle size={70} />
          <div className="w-[500px] text-center">
            <p className="font-semibold text-4xl text-white">
              Restore or Delete
            </p>
            <p className="font-semibold text-4xl text-white">
              {selectedNote?.title}
            </p>
            <p>
              Don't want to lose this note? It's not too late! Just click the
              'Restore' button and it will be added back to your list. Or delete
              note!
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