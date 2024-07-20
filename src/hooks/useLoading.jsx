import { useState } from 'react';
import ReactLoading from 'react-loading';

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

  const LoadingComponent = () => (
    loading ? (
      <div className="flex justify-center items-center">
        <ReactLoading type="bubbles" color="#fff" height={25} width={25} alt="Loading" />
      </div>
    ) : null
  );

  return [loading, withLoading, LoadingComponent];
};

export default useLoading;
