import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchBySomething,
  create,
  update,
  deleted,
  getCookie,
} from "../services/api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State management for user, folders, notes, and UI controls
  const [userId, setUserId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [editIndexFolder, setEditIndexFolder] = useState(null);
  const [editedNameFolder, setEditedNameFolder] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [note, setNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [openMore, setOpenMore] = useState(null);
  const [dataMore, setDataMore] = useState([]);
  const [filter, setFilter] = useState(null);
  const [openMenuFolder, setOpenMenuFolder] = useState(false);
  const [openMenuNote, setOpenMenuNote] = useState(false);
  const [error, setError] = useState({ message: null, functionName: null });

  useEffect(() => {
    if (error.message) {
      console.error(`Error in ${error.functionName}: ${error.message}`);
    }
  }, [error]);

  // Getting User ID from cookie
  useEffect(() => {
    const dataUser = getCookie("user");
    setUserId(dataUser?._id);
  }, []);

  // Fetching recent notes that were opened
  const fetchRecentNotes = async () => {
    try {
      const response = await fetchBySomething("/user/recent", `${userId}`);
      setRecentNotes(response);
    } catch (error) {
      setError({ message: error, functionName: 'fetchRecentNotes' });
    }
  };

  // Fetching notes by ID
  const fetchNotesById = async () => {
    if (noteId) {
      try {
        const response = await fetchBySomething("/note", `${noteId}/${userId}`);
        setNote(response?.data);
        fetchRecentNotes();
      } catch (error) {
        setError({ message: error, functionName: 'fetchNotesById' });
      }
    }
  };

  // Calling fetch functions based on userId and noteId changes
  useEffect(() => {
    if (userId) {
      fetchNotesById();
      fetchRecentNotes();
    }
  }, [userId, noteId]);

  // Fetching all folders
  const fetchFolders = async () => {
    try {
      const response = await fetchBySomething("/folder/user", userId);
      setFolders(response?.data);
    } catch (error) {
      setError({ message: error, functionName: 'fetchFolders' });
    }
  };

  // Calling fetch folders based on userId changes
  useEffect(() => {
    if (userId) {
      fetchFolders();
    }
  }, [userId]);

  // Fetching all notes based on selected folder
  const fetchNotesByFolder = async () => {
    try {
      const response = await fetchBySomething(
        "/note/user",
        `${userId}/${folderId}`
      );
      setNotes(response?.data);
    } catch (error) {
      setError({ message: error, functionName: 'fetchNotesByFolder' });
    }
  };

  // Calling fetch notes by folder if folderId exists
  useEffect(() => {
    setNotes([]);
    if (folderId) {
      fetchNotesByFolder();
    }
  }, [folderId]);

  // Fetching notes by filter
  const fetchNotesByFilter = async () => {
    setDataMore([]);
    try {
      const response = await fetchBySomething(
        "/note",
        `${userId}?filter=${filter}`
      );
      setDataMore(response?.data);
    } catch (error) {
      setError({ message: error, functionName: 'fetchNotesByFilter' });
    }
  };

  // Setting filter based on openMore index and calling fetch notes by filter
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
    if (filter) {
      fetchNotesByFilter();
    }
  }, [filter]);

  // Function to create an entity (note or folder)
  const createEntity = async (type) => {
    try {
      if (type === "note") {
        const response = await create("/note/create", { user_id: userId });
        setNoteId(response?.data?._id);
      } else if (type === "folder") {
        await create("/folder/create", { user_id: userId });
        fetchFolders();
      }
    } catch (error) {
      setError({ message: error, functionName: 'createEntity' });
    }
  };

  // Function to update a folder
  const updateFolder = async () => {
    try {
      await update("/folder", folderId, { name: editedNameFolder });
      fetchFolders();
    } catch (error) {
      setError({ message: error, functionName: 'updateFolder' });
    }
    setEditIndexFolder(null);
  };

  // Function to update a note
  const updateNote = async (noteId, data) => {
    try {
      await update("/note", noteId, data);
      fetchRecentNotes();
      fetchNotesByFolder();
    } catch (error) {
      setError({ message: error, functionName: 'updateNote' });
    }
    setOpenMenuNote(false);
  };

  // Function to delete a folder
  const DeleteFolder = async () => {
    try {
      await deleted(`/folder`, folderId);
      setFolderId(null);
      setOpenMenuFolder(false);
      fetchFolders();
    } catch (error) {
      setError({ message: error, functionName: 'DeleteFolder' });
    }
  };

  // Function to restore a note
  const RestoreNote = async (item, data) => {
    try {
      await update("/note", noteId, { [item]: data });
      setDataMore([]);
      fetchNotesByFilter();
    } catch (error) {
      setError({ message: error, functionName: 'RestoreNote' });
    }
  };

  // Function to delete a note
  const DeleteNote = async () => {
    try {
      await deleted(`/note`, noteId);
      setNoteId(null);
      setDataMore([]);
      fetchNotesByFilter();
    } catch (error) {
      setError({ message: error, functionName: 'DeleteNote' });
    }
  };

  // Handle folder input change
  const handleInputChangeFolder = (e) => {
    setEditedNameFolder(e.target.value);
  };

  // Toggle entity selection
  const toggleEntity = (type, id) => {
    setOpenMenuFolder(false);
    setOpenMenuNote(false);
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

  // Handle double click on folder to edit
  const handleDoubleClick = (index) => {
    setEditIndexFolder(index);
    setEditedNameFolder(folders[index].name);
  };

  // Handle menu toggling for folder and note
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

        // state
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