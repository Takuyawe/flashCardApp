import { useState } from 'react';
import { Modal } from '../modal/Modal';
import { AddCategory } from './AddCategory';

export const AddCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="grid place-content-center h-8 w-8 rounded-md border-2 border-base-dark">
        <i className="ri-add-line text-2xl" />
      </button>
      <Modal isOpen={isOpen}>
        <AddCategory closeModal={closeModal} />
      </Modal>
    </>
  );
};
