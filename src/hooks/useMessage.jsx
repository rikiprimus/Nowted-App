import { useState, useEffect } from "react";

const useMessage = () => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (message) {
      // Set a timer to clear the message after 5 seconds
      const timer = setTimeout(() => {
        setMessage(null);
        setType(null);
      }, 5000);

      // Clear the timer if the message changes or the component unmounts
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Function to manually clear the message
  const clearMessage = () => {
    setMessage(null);
    setType(null);
  };

  const showMessage = (msg, msgType) => {
    setMessage(msg);
    setType(msgType);
  };

  return { message, type, showMessage, clearMessage };
};

export default useMessage;
