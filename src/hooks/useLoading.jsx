import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async (asyncFunction) => {
    setLoading(true); // Start loading
    try {
      await asyncFunction(); // Execute the async function
    } finally {
      setLoading(false); // End loading
    }
  };

  return [loading, withLoading];
};

export default useLoading;
