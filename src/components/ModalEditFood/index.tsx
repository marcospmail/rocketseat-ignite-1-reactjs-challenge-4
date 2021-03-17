import { useEffect, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import Input from '../Input';

import { Food } from '../../types';

import { Form } from './styles';
import { FormHandles } from '@unform/core';

interface ModalEditFoodProps {
  editingFood?: Food
  isOpen: boolean
  setIsOpen: () => void
  handleUpdateFood: (food: Food) => void
}

function ModalEditFood({ isOpen, editingFood, setIsOpen, handleUpdateFood }: ModalEditFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: Food) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  useEffect(() => {
    console.log('isOpen', isOpen)
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood} >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;
