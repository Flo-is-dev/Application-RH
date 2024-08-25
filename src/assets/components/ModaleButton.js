import { useState } from "react";
import ModalContent from "florent-g-my-modal";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const ModaleButton = ({ validateForm }) => {
  const [showModal, setShowModal] = useState(false);
  const formData = useSelector((state) => state.form.formData);

  const handleClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(
        `%c Success !! 💯 New Profile Created`,
        `color:purple;font-size: 16px;font-weight:bold;background-color:lightpink;padding:10px 30px;border-radius: 6px;border:3px solid white`
      );
      console.table(formData);
      setShowModal(true); // Affiche la modale seulement si le formulaire est valide
    }
  };

  return (
    <>
      <button
        type="submit"
        onClick={handleClick}
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
