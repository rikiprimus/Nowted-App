import { useEffect } from "react";
import SideBar from "../components/Frame1/SideBar";
import FolderBar from "../components/Frame2/FolderBar";
import SecondBar from "../components/Frame2/SecondBar";
import Note from "../components/Frame3/Note";
import { useApp } from "../hooks/useApp";
import Recycle from "../components/Frame3/Recycle";

const Home = () => {
  // Destructuring the state and functions from the custom hook
  const { folderId, openMore, setFolderId, setOpenMore, filter } = useApp();

  // Effect to clear folderId when openMore is set
  useEffect(() => {
    if (openMore !== null) {
      setFolderId(null);
    }
  }, [openMore]);

  // Effect to clear openMore when folderId is set
  useEffect(() => {
    if (folderId !== null) {
      setOpenMore(null);
    }
  }, [folderId]);

  return (
    <div className="w-full h-screen flex bg-light-background dark:bg-dark-background text-light-60 dark:text-dark-60">
      {/* Sidebar component */}
      <SideBar />
      {/* Conditionally rendering FolderBar based on folderId */}
      {folderId !== null && <FolderBar />}
      {/* Conditionally rendering SecondBar based on openMore */}
      {openMore !== null && <SecondBar type={openMore} />}
      {/* Conditionally rendering Recycle or Note component based on filter */}
      {filter === 'trash' ? (
        <Recycle />
      ) : (
        <Note />
      )}
    </div>
  );
};

export default Home;
