import { useState } from 'react';
import { Modal } from '../modal/Modal';
import { AddCategory } from './AddCategory';
import { Categories } from '~/types';

type Props = {
  categories: Categories;
};

export const AddCategoryButton = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 rounded-md border-2 border-base-dark">
        <i className="ri-add-line text-3xl" />
      </button>
      <Modal isOpen={isOpen}>
        <AddCategory categories={categories} closeModal={closeModal} />
      </Modal>
    </>
  );
};
