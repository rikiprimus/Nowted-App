import React from "react";
import SwitchButton from "../SwitchButton";
import { useTheme } from "../../utils/ThemeContext";
import logowhite from "../../assets/logowhite.svg";
import logodark from "../../assets/logodark.svg";
import { IoSearch } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import { RiFolderAddLine } from "react-icons/ri";
import {
  FaRegFolder,
  FaRegFolderOpen,
  FaRegStar,
  FaPlus,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FiTrash } from "react-icons/fi";
import { LuArchive } from "react-icons/lu";

import { moreMenu } from "../../constants/lib";
import { useApp } from "../../hooks/useApp";

const SideBar = () => {
  const { theme } = useTheme();
  const {
    noteId,
    folderId,

    recentNotes,
    folders,

    createEntity,
    updateFolder,

    toggleEntity,
    handleDoubleClick,
    handleInputChangeFolder,

    editIndexFolder,
    editedNameFolder,
    openMore,
  } = useApp();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateFolder()
    }
  };

  return (
    <div className="min-w-[250px] flex-col space-y-3 pt-3 desktop:space-y-5 desktop:min-w-[330px] desktop:pt-8">
      {/* logo */}
      <div className="flex flex-row items-center justify-between px-5">
        {theme === "dark" ? (
          <img src={logowhite} alt="Nowted App" className="cursor-pointer" />
        ) : (
          <img src={logodark} alt="Nowted App" className="cursor-pointer" />
        )}
        <IoSearch size={25} />
      </div>
      {/* new note */}
      <div className="w-full p-5">
        <button
          onClick={() => createEntity("note")}
          className="w-full flex items-center justify-center gap-4 p-2 bg-light-10 dark:bg-dark-10 dark:text-white rounded-lg hover:bg-light-40 hover:dark:bg-dark-40 active:opacity-50"
        >
          <FaPlus size={20} />
          <p>New Note</p>
        </button>
      </div>
      {/* recent */}
      <div className="flex flex-col">
        <p className="font-semibold text-[14px] font-mamali pb-0 px-5 desktop:pb-2">
          Recents
        </p>
        <div className="flex flex-col">
          {recentNotes?.map((item, index) => (
            <button
              key={index}
              className={`flex flex-row items-center justify-start gap-5 py-2 px-5 hover:bg-purple hover:text-white active:bg-opacity-50 active:text-dark-40 ${
                noteId === item?.note_id?._id
                  ? "bg-light-3 dark:bg-dark-3 dark:text-white"
                  : null
              } desktop:py-2.5`}
              onClick={() => toggleEntity("note", item.note_id._id)}
            >
              {noteId === index ? (
                <CiEdit size={20} />
              ) : (
                <CgFileDocument size={20} />
              )}
              <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[215px]">
                {item?.note_id.title}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* folders */}
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between pb-0 px-5 desktop:pb-2">
          <p className="font-semibold text-[14px]">Folders</p>
          <button onClick={() => createEntity('folder')}>
            <RiFolderAddLine
              size={20}
              className="hover:text-white active:text-opacity-50"
            />
          </button>
        </div>
        <div className="flex flex-col">
          {folders.slice(0, 5).map((item, index) => (
            <button
              key={index}
              className={`flex flex-row items-center justify-start gap-5 py-2 px-5 hover:bg-purple hover:text-white active:bg-opacity-50 active:text-dark-40 ${
                folderId === item._id
                  ? "bg-light-3 dark:bg-dark-3 dark:text-white"
                  : null
              } desktop:py-2.5`}
              onClick={() => toggleEntity("folder", item?._id)}
              disabled={editIndexFolder === index}
            >
              {folderId === item._id ? (
                <FaRegFolderOpen size={20} />
              ) : (
                <FaRegFolder size={20} />
              )}

              {editIndexFolder === index ? (
                <input
                  type="text"
                  className="overflow-hidden text-ellipsis whitespace-nowrap w-full outline-none bg-dark-background"
                  value={editedNameFolder}
                  onChange={handleInputChangeFolder}
                  onBlur={() => updateFolder()}
                  onKeyPress={(e) => handleKeyPress(e)}
                  autoFocus
                />
              ) : (
                <p
                  className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[215px] w-full h-[24px] text-start cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(index)}
                >
                  {item?.name}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* more */}
      <div className="flex flex-col">
        <p className="font-semibold text-[14px] pb-0 px-5 desktop:pb-2">More</p>
        <div className="flex flex-col">
          {moreMenu?.map((item, index) => (
            <button
              key={index}
              className={`flex flex-row items-center justify-start gap-5 py-2 px-5 hover:bg-purple hover:text-white active:bg-opacity-50 active:text-dark-40 ${
                openMore === index ? "bg-dark-3 text-white" : null
              } desktop:py-2.5`}
              onClick={() => toggleEntity('more', index)}
            >
              {item.icon === "favorite" && <FaRegStar size={20} />}
              {item.icon === "trash" && <FiTrash size={20} />}
              {item.icon === "archive" && <LuArchive size={20} />}
              <span>{item.name} </span>
            </button>
          ))}
        </div>
      </div>
      <SwitchButton />
    </div>
  );
};

export default SideBar;
