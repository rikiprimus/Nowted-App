import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchBySomething, create, update, deleted } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [openFolder, setOpenFolder] = useState(null);
  const [editIndexFolder, setEditIndexFolder] = useState(null);
  const [editedNameFolder, setEditedNameFolder] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [openMore, setOpenMore] = useState(null);
  const [dataMore, setDataMore] = useState([]);
  const [filter, setFilter] = useState(null);
  const [noteSelect, setNoteSelect] = useState(null);
  const [openTrashNote, setOpenTrashNote] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUserId(userData?._id);
    }
  }, []);

  const fetchRecentNotes = async () => {
    try {
      const response = await fetchBySomething('/user/recent', `${userId}`);
      setRecentNotes(response);
    } catch (error) {
      console.error('Error fetching recent notes:', error);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetchBySomething('/folder');
      setFolders(response);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const fetchNotesByUserFolder = async () => {
    try {
      const response = await fetchBySomething('/note/user', `${userId}/${openFolder}`);
      setNotes(response?.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchNotesByFilter = async () => {
    try {
      const response = await fetchBySomething('/note', `${userId}?filter=${filter}`);
      setDataMore(response?.data);
    } catch (error) {
      console.error('Error fetching notes by filter:', error);
    }
  };

  const createEntity = async (type, data) => {
    try {
      let result = null;
      if (type === 'note') {
        result = await create('/note/create', { user_id: userId });
        fetchRecentNotes();
      } else if (type === 'folder') {
        result = await create('/folder/create');
        fetchFolders();
      }
      // Handle more create logic if needed
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
    }
  };

  const deleteEntity = async (type, id) => {
    try {
      let entityId = null;
      if (type === 'note') {
        entityId = noteSelect?._id;
        await deleted('/note', entityId);
        fetchRecentNotes();
      } else if (type === 'folder') {
        entityId = id;
        await deleted('/folder', entityId);
        fetchFolders();
      }
      // Handle more delete logic if needed
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const updateEntity = async (type, id, data) => {
    try {
      if (type === 'note') {
        await update('/note', id, data);
        fetchRecentNotes();
      } else if (type === 'folder') {
        await update('/folder', id, data);
        fetchFolders();
      }
      // Handle more update logic if needed
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const toggleEntity = (type, id) => {
    if (type === 'folder') {
      setOpenFolder(openFolder === id ? null : id);
    } else if (type === 'note') {
      // Handle note toggle logic if needed
    } else if (type === 'more') {
      setOpenMore(openMore === id ? null : id);
    }
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleDoubleClickEntity = (type, index) => {
    if (type === 'folder') {
      setEditIndexFolder(index);
      setEditedNameFolder(folders[index].name);
    } else if (type === 'note') {
      // Handle note double click logic if needed
    } else if (type === 'more') {
      // Handle more double click logic if needed
    }
  };

  const handleInputChangeEntity = (type, e) => {
    if (type === 'folder') {
      setEditedNameFolder(e.target.value);
    } else if (type === 'note') {
      // Handle note input change logic if needed
    } else if (type === 'more') {
      // Handle more input change logic if needed
    }
  };

  const handleToggleTrashNote = (index) => {
    setOpenTrashNote(openTrashNote === index ? null : index);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    if (openFolder !== null) {
      fetchNotesByUserFolder();
    }
  }, [openFolder]);

  useEffect(() => {
    if (filter !== null) {
      fetchNotesByFilter();
    }
  }, [filter]);

  return (
    <AppContext.Provider
      value={{
        userId,
        notes,
        recentNotes,
        folders,
        openFolder,
        editIndexFolder,
        editedNameFolder,
        openMenu,
        openMore,
        dataMore,
        filter,
        noteSelect,
        openTrashNote,

        createEntity,
        deleteEntity,
        updateEntity,
        toggleEntity,
        handleMenu,
        handleDoubleClickEntity,
        handleInputChangeEntity,
        handleToggleTrashNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
