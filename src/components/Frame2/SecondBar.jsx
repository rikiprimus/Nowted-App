import { useEffect, useState } from "react";
import useResizeBar from "../../hooks/useResizeBar";
import HtmlToString from "../../utils/HtmlToString";
import { format } from "date-fns";
import { useApp } from "../../hooks/useApp";

const SecondBar = ({ type }) => {
  // Custom hook for handling the resize functionality of the sidebar
  const { width, isResized } = useResizeBar(260, 500, 350);

  // Extracting relevant data and functions from the useApp hook
  const { noteId, dataMore, toggleEntity } = useApp();

  // State for the title based on the type prop
  const [title, setTitle] = useState("");

  // Effect to update the title based on the type prop
  useEffect(() => {
    if (type === 0) {
      setTitle("Favorite");
    } else if (type === 1) {
      setTitle("Trash");
    } else if (type === 2) {
      setTitle("Archived");
    }
  }, [type]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        style={{ width: `${width / 18}rem` }}
        className="bg-light-1 dark:bg-dark-1 space-y-6 pt-3 px-3 desktop:space-y-3 desktop:pt-9 desktop:px-5"
      >
        <div className="w-full flex flex-col gap-5">
          {/* Title Header */}
          <div className="relative flex items-center justify-between">
            <h1 className="text-2xl text-dark-1 dark:text-white text-center py-2">
              {title}
            </h1>
          </div>

          {/* Content List */}
          <div className="w-full h-[680px] desktop:h-[808px] flex flex-col gap-5 overflow-y-auto custom-scrollbar">
            {dataMore?.length === 0 ? (
              <p className="text-center text-gray-500">
                No data in {title}
              </p>
            ) : (
              dataMore?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => toggleEntity('note', item._id)}
                  className={`w-full h-[98px] bg-light-10 dark:bg-dark-3 space-y-2.5 rounded-md p-5 text-start hover:bg-light-20 active:bg-light-40 hover:dark:bg-dark-10 active:dark:bg-dark-20 ${
                    noteId === item._id
                      ? "bg-light-20 dark:bg-white dark:bg-opacity-10"
                      : null
                  }`}
                >
                  <p className="font-semibold text-lg text-dark-1 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
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

      {/* Resize Grip */}
      <div
        className="w-1 bg-dark-3 cursor-col-resize hover:bg-dark-10 active:bg-dark-3"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
};

export default SecondBar;