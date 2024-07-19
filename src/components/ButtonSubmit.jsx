import ReactLoading from "react-loading";

const ButtonSubmit = ({ children, loading }) => {
  return (
    <button
      type="submit"
      className="w-full p-2 text-white bg-purple hover:bg-opacity-90 active:opacity-50 rounded-lg"
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading type="bubbles" color="#fff" height={25} width={25} alt="Loading" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonSubmit;
