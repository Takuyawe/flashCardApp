import { useState } from "react";
import { Modal } from "../modal/Modal";
import { AddCategory } from "./AddCategory";

export const AddCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 rounded-md border-2 border-base-dark"
      >
        <i className="ri-add-line text-3xl" />
      </button>
      <Modal isOpen={isOpen}>
        <AddCategory closeModal={closeModal} />
      </Modal>
    </>
  );
};
