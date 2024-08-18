import { useState } from "react";
import ModalContent from "florent-g-my-modal";
import { createPortal } from "react-dom";

const ModaleButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md shadow-md transition duration-300"
      >
        Show Modal
      </button>
      {showModal &&
        createPortal(
          <ModalContent
            closeModal={() => setShowModal(false)}
            content="Ici le  texttexttexttext"
            className="bg-rose-200 text-amber-900 p-10 rounded relative mb-[10vh] select-none"
          />,
          document.body
        )}
    </>
  );
};

export default ModaleButton;
