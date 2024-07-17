import React from "react";
import useResizeBar from "../../hooks/useResizeBar"
import HtmlToString from "../../utils/HtmlToString";
import { FiTrash } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { format } from "date-fns";
import { useApp } from "../../hooks/useApp";

const FolderBar = () => {
  const { width, isResized } = useResizeBar(260, 500, 350);
  const { folderId, noteId, folders, notes, handleMenu, toggleEntity, DeleteFolder, openMenuFolder } = useApp();

  return (
    <div className="flex">
      <div style={{ width: `${width / 18}rem` }} className="bg-light-1 dark:bg-dark-1 space-y-6 pt-3 px-3 desktop:space-y-3 desktop:pt-9 desktop:px-5">
        <div className="w-full flex flex-col gap-5">
          <div className="relative flex items-center justify-between">
            <h1 className="text-xl desktop:text-2xl text-dark-1 dark:text-white text-center py-2">
              {folderId
                ? folders.find((folder) => folder?._id === folderId)?.name ||
                  "Folder not found"
                : "No folder selected"}
            </h1>
            <button className="p-2" onClick={() => handleMenu('folder')}>
              <BsThreeDots size={25} />
            </button>
            {openMenuFolder ? (
              <div className="absolute right-0 -bottom-[60px] z-10 bg-[#333333] w-[210px] space-y-5 rounded-lg p-4">
                <button
                  className="w-full flex items-center gap-4 text-white hover:text-opacity-70 active:text-opacity-45"
                  onClick={DeleteFolder}
                >
                  <FiTrash size={20} />
                  <p>Delete</p>
                </button>
              </div>
            ) : null}
          </div>
          <div className="w-full h-[680px] desktop:h-[808px] flex flex-col gap-5 overflow-y-auto custom-scrollbar">
            {notes?.length === 0 ? (
              <p className="text-center text-gray-500">
                Tidak ada note di folder
              </p>
            ) : (
              notes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => toggleEntity('note', item._id)}
                  className={`w-full h-[98px] bg-light-10 dark:bg-dark-3 space-y-2.5 rounded-md p-5 text-start hover:bg-light-20 active:bg-light-40 hover:dark:bg-dark-10 active:dark:bg-dark-20 ${
                    noteId === item._id
                      ? "bg-light-20 dark:bg-white dark:bg-opacity-10"
                      : null
                  }`}
                >
                  <p className="font-semibold text-lg text-dark-1 dark:text-white">
                    {item?.title}
                  </p>
                  <div className="w-full flex gap-3">
                    <p className="min-w-[75px]">
                      {format(new Date(item?.date), "dd/MM/yyyy")}
                    </p>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {HtmlToString(item?.content)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Handle grip */}
      <div
        className="w-1 bg-dark-3 cursor-col-resize hover:bg-dark-10 active:bg-dark-3"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
};

export default FolderBar