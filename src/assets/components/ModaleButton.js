import { useState } from "react";
import ModalContent from "florent-g-my-modal";
import { createPortal } from "react-dom";

const ModaleButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="submit"
        onClick={() => setShowModal(true)}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md shadow-md transition duration-300"
      >
        Save
      </button>
      {showModal &&
        createPortal(
          <ModalContent
            closeModal={() => setShowModal(false)}
            content="Employee Created!"
            className="bg-green-200 text-green-900 p-10 rounded relative mb-[10vh] select-none"
          />,
          document.body
        )}
    </>
  );
};

export default ModaleButton;
