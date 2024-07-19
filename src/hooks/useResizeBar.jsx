import { useState, useEffect, useRef } from "react";

// Custom hook to handle the resizing of a bar with minimum and maximum width constraints
const useResizeBar = (minWidth, maxWidth, defaultWidth) => {
  // State to store the current width of the bar
  const [width, setWidth] = useState(defaultWidth);
  // Ref to track if the bar is being resized
  const isResized = useRef(false);

  // Effect to handle mouse movements and resizing logic
  useEffect(() => {
    // Function to handle mouse move events
    const handleMouseMove = (e) => {
      // If not resizing, exit the function
      if (!isResized.current) {
        return;
      }

      // Update the width based on mouse movement
      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX;

        // Check if the new width is within the allowed range
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        // Return the new width if in range, otherwise return the previous width
        return isWidthInRange ? newWidth : previousWidth;
      });
    };

    // Function to handle mouse up events
    const handleMouseUp = () => {
      isResized.current = false;
    };

    // Add event listeners for mouse move and mouse up
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup event listeners on component unmount or dependency change
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [minWidth, maxWidth, defaultWidth]);

  // Return the current width and the isResized ref
  return {
    width,
    isResized,
  };
};

export default useResizeBar;