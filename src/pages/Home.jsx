import React, { useEffect } from "react";
import SideBar from "../components/Frame1/SideBar";
import FolderBar from "../components/Frame2/FolderBar";
import SecondBar from "../components/Frame2/SecondBar";
import Note from "../components/Frame3/Note";
import { useApp } from "../hooks/useApp";
import Recycle from "../components/Frame3/Recycle";

const Home = () => {
  const { folderId, openMore, setFolderId, setOpenMore, filter } = useApp();

  useEffect(() => {
    if (openMore !== null) {
      setFolderId(null);
    }
  }, [openMore]);

  useEffect(() => {
    if (folderId !== null) {
      setOpenMore(null);
    }
  }, [folderId]);

  return (
    <div className="w-full h-screen flex bg-light-background dark:bg-dark-background text-light-60 dark:text-dark-60">
      <SideBar />
      {folderId !== null && <FolderBar />}
      {openMore !== null && <SecondBar type={openMore}  />}
      {filter === 'trash' ? (
        <Recycle />
      ) : (
        <Note />
      )}
    </div>
  );
};

export default Home;
