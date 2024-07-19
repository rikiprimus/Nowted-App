import { useEffect, useState, useRef } from "react";
import {
  FaRegFolder,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { LuArchive, LuCalendarDays } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import Datepicker from "../Datepicker";
import { useApp } from "../../hooks/useApp";
import TextEditor from "../TextEditor";

const Note = () => {
  const today = new Date();
  const {
    note,
    noteId,
    setNoteId,
    folders,
    openMenuNote,
    handleMenu,
    updateNote,
    toggleEntity,
  } = useApp();
  
  // State array to store note credentials data. Used to store and send data.
  const [credentials, setCredentials] = useState({
    folder_id: "",
    title: "",
    date: today,
    favorite: false,
    trash: false,
    archived: false,
  });

  // Update credentials every time the note changes.
  useEffect(() => {
    if (note) {
      setCredentials({
        folder_id: note?.folder_id || "",
        title: note?.title || "",
        date: note?.date || today,
        favorite: note?.favorite || false,
        trash: note?.trash || false,
        archived: note?.archived || false,
      });
    }
  }, [note]);

  // Clear the note when switching folders.
  useEffect(() => {
    setNoteId(null);
  }, [folders]);

  // Handle updates to the note.
  const handleChange = (key, value) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [key]: value,
    }));
    if (key !== "title") {
      updateNote(noteId, { [key]: value });
    }
  };

  // Handle blur events to update the note.
  const handleBlur = (key, value) => {
    updateNote(noteId, { [key]: value });
  };

  return (
    <div className="w-full space-y-8 p-8 desktop:p-12">
      {noteId === null ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[500px] flex flex-col items-center gap-4">
            <p className="font-semibold text-3xl text-dark-1 dark:text-white">
              Pilih note untuk dilihat
            </p>
            <p className="text-center">
              Pilih note dari daftar di sebelah kiri untuk melihat isinya, atau
              buat note baru untuk ditambahkan ke folder Anda
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* Title */}
          <div className="relative flex items-center justify-between">
            <input
              type="text"
              className="font-bold bg-light-background dark:bg-dark-background text-3xl text-dark-1 dark:text-white"
              value={credentials.title}
              onChange={(e) => handleChange("title", e.target.value)}
              onBlur={(e) => handleBlur("title", e.target.value)}
            />
            <button
              onClick={() => handleMenu("note")}
              className="border-2 rounded-full p-1 text-light-40 dark:text-dark-40 hover:text-light-60 hover:dark:text-dark-60 active:opacity-40"
            >
              <BsThreeDots size={25} />
            </button>
            {openMenuNote && (
              <div className="absolute right-0 -bottom-[180px] z-10 bg-[#333333] w-[210px] space-y-5 rounded-lg p-4">
                <button
                  onClick={() =>
                    handleChange("favorite", !credentials.favorite)
                  }
                  className="w-full flex items-center gap-4 text-white hover:text-opacity-70 active:text-opacity-45"
                >
                  {credentials.favorite ? (
                    <FaStar size={20} />
                  ) : (
                    <FaRegStar size={20} />
                  )}
                  <p>Add to Favorite</p>
                </button>
                <button
                  onClick={() =>
                    handleChange("archived", !credentials.archived)
                  }
                  className="w-full flex items-center gap-4 text-white hover:text-opacity-70 active:text-opacity-45"
                >
                  <LuArchive size={20} />
                  <p>Archived</p>
                </button>
                <div className="w-full border-[1px] border-dark-10"></div>
                <button
                  onClick={() => handleChange("trash", !credentials.trash)}
                  className="w-full flex items-center gap-4 text-white hover:text-opacity-70 active:text-opacity-45"
                >
                  <FiTrash size={20} />
                  <p>Delete</p>
                </button>
              </div>
            )}
          </div>
          {/* Date & Folder */}
          <div>
            <div className="flex space-x-6 py-3">
              <LuCalendarDays size={20} />
              <div className="flex space-x-[82px]">
                <p>Date</p>
                <Datepicker
                  date={credentials?.date}
                  onDateChange={(date) => handleChange("date", date)}
                />
              </div>
            </div>
            <div className="w-full border-[1px] border-light-10 dark:border-dark-10"></div>
            <div className="flex space-x-6 py-3">
              <FaRegFolder size={20} />
              <div className="w-[350px] flex space-x-[67px]">
                <p>Folder</p>
                <select
                  value={credentials?.folder_id}
                  onChange={(e) => {
                    handleChange("folder_id", e.target.value);
                    toggleEntity("folder", e.target.value);
                  }}
                  className="w-full bg-light-background dark:bg-dark-background text-dark-1 dark:text-white font-bold underline px-1 outline-none border-blue-500"
                >
                  <option value="">Pilih folder</option>
                  {folders.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Text Editor */}
          <div>
            <TextEditor />
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;