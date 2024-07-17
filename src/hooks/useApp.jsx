import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  fetchAll,
  fetchBySomething,
  create,
  update,
  deleted,
  getCookie,
} from "../services/api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const [folderId, setFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [editIndexFolder, setEditIndexFolder] = useState(null);
  const [editedNameFolder, setEditedNameFolder] = useState("");

  const [note, setNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [recentNotes, setRecentNotes] = useState([]);

  const [openMore, setOpenMore] = useState(null);
  const [dataMore, setDataMore] = useState([]);
  const [openMoreNote, setOpenMoreNote] = useState(false);
  const [filter, setFilter] = useState(null);

  const [openMenuFolder, setOpenMenuFolder] = useState(false);
  const [openMenuNote, setOpenMenuNote] = useState(false);

  // mendapatkan data User id dari cookie
  useEffect(() => {
    const dataUser = getCookie("user");
    setUserId(dataUser?._id);
  }, []);

  // mendapatkan data Recent Note yang pernah di buka
  const fetchRecentNotes = async () => {
    try {
      const response = await fetchBySomething("/user/recent", `${userId}`);
      setRecentNotes(response);
    } catch (error) {
      console.error("Error fetching recent notes:", error);
    }
  };

  const fetchNotesById = async () => {
    if (noteId) {
      try {
        const response = await fetchBySomething("/note", `${noteId}/${userId}`);
        setNote(response?.data)
        fetchRecentNotes();
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  };

  // melakukan pemanggilan fungsi fetch recent berdasarkan perubahan userId dan noteId
  useEffect(() => {
    if (userId) {
      fetchNotesById();
      fetchRecentNotes();
    }
  }, [userId, noteId]);

  // mendapatkan semua data folder
  const fetchFolders = async () => {
    try {
      const response = await fetchAll("/folder");
      setFolders(response);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  // melakukan pemanggilan fungsi fetch recent berdasarkan perubahan userId & Tambahkan juga melakukan fetch folder setiap melakukan create !!!
  useEffect(() => {
    fetchFolders();
  }, [userId]);

  // mendapatkan semua data notes berdasarkan folder yang dipilih
  const fetchNotesByFolder = async () => {
    try {
      const response = await fetchBySomething(
        "/note/user",
        `${userId}/${folderId}`
      );
      setNotes(response?.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // memanggil fungsi note by folder bila folderId ada
  useEffect(() => {
    setNotes([]);
    if (folderId) {
      fetchNotesByFolder();
    }
  }, [folderId]);

  // memanggil fungsi note by filter
  const fetchNotesByFilter = async () => {
    setDataMore([])
    try {
      const response = await fetchBySomething(
        "/note",
        `${userId}?filter=${filter}`
      );
      setDataMore(response?.data);
    } catch (error) {
      console.error("Error fetching notes by filter:", error);
    }
  };

  // memberikan nilai filter berdasarkan index openMore lalu memanggil fungsi notes by filter
  useEffect(() => {
    let filter = null;

    switch (openMore) {
      case 0:
        filter = "favorite";
        break;
      case 1:
        filter = "trash";
        break;
      case 2:
        filter = "archived";
        break;
      default:
        filter = null;
        break;
    }

    setFilter(filter);
  }, [openMore]);

  useEffect(() => {
    if(filter) {
      fetchNotesByFilter();
    }
  }, [filter])

  // fungsi untuk membuat sebuah data berdasarkan type note atau folder
  const createEntity = async (type) => {
    try {
      if (type === "note") {
        const response = await create("/note/create", { user_id: userId });
        setNoteId(response?.data?._id);
      } else if (type === "folder") {
        await create("/folder/create");
        fetchFolders();
      }
      console.log(`berhasil membuat ${type}`);
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
    }
  };

  const updateFolder = async () => {
    try {
      await update("/folder", folderId, { name: editedNameFolder });
      fetchFolders();
    } catch (error) {
      console.error(`Error updating folder :`, error);
    }

    setEditIndexFolder(null);
  };

  const updateNote = async (id, data) => {
    try {
      await update("/note", id, data);
      fetchRecentNotes();
    } catch (error) {
      console.error(`Error updating note:`, error);
    }
  };

  const DeleteFolder = async () => {
    try {
      await deleted(`/folder`, folderId);
      setFolderId(null);
      setOpenMenuFolder(false);
      fetchFolders();
    } catch (error) {
      console.error("Error delete Folder:", error);
    }
  };

  // ========================================================================
  // Fetch by Filter, Restore & Delete Note function
  // ========================================================================

  const RestoreNote = async (item, data) => {
    try {
      await update("/note", noteId, { [item]: data });
      setDataMore([]);
      fetchNotesByFilter();
    } catch (error) {
      console.error("Error restore Note:", error);
    }
  };

  const DeleteNote = async () => {
    try {
      await deleted(`/note`, noteId);
      setDataMore([]);
      fetchNotesByFilter();
    } catch (error) {
      console.error("Error delete Note:", error);
    }
  };

  // ========================================================================
  // handle / toggle function
  // ========================================================================

  const handleInputChangeFolder = (e) => {
    setEditedNameFolder(e.target.value);
  };

  const toggleEntity = (type, id) => {
    // setOpenMore(null);
    if (type === "folder") {
      setFolderId(folderId === id ? null : id);
    } else if (type === "note") {
      setNoteId(noteId === id ? null : id);
    } else if (type === "more") {
      setFolderId(null);
      setNoteId(null);
      setOpenMore(openMore === id ? null : id);
    }
  };

  const handleDoubleClick = (index) => {
    setEditIndexFolder(index);
    setEditedNameFolder(folders[index].name);
  };

  const handleMenu = (type) => {
    if (type === "folder") {
      setOpenMenuFolder(!openMenuFolder);
    } else if (type === "note") {
      setOpenMenuNote(!openMenuNote);
    }
  };

  return (
    <AppContext.Provider
      value={{
        // id
        userId,
        folderId,
        setFolderId,
        noteId,
        setNoteId,
        openMore,
        setOpenMore,

        //state
        recentNotes,
        folders,
        note,
        setNote,
        notes,
        dataMore,
        editIndexFolder,
        editedNameFolder,
        openMenuFolder,
        openMenuNote,
        filter,
        openMoreNote,

        // function
        createEntity,
        updateFolder,
        updateNote,
        DeleteFolder,
        RestoreNote,
        DeleteNote,

        // handle tag
        handleInputChangeFolder,
        handleDoubleClick,
        toggleEntity,
        handleMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
