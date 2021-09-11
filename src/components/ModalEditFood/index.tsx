// import { Component, createRef, RefObject } from 'react';
import { createRef }     from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';

import { TFood } from '../../@types/Food';

import { Modal } from '../Modal';
import { Input } from '../Input';

import { Form } from './styles';

interface ModalEditFoodProps {
  isOpen:           boolean;
  editingFood:      TFood;
  setIsOpen:        () => void;
  handleUpdateFood: (food: Omit<TFood, 'id' | 'available'>) => Promise<void>;
}

/* export class OldModalEditFood extends Component<ModalEditFoodProps> {
  formRef: RefObject<FormHandles>;

  constructor(props: ModalEditFoodProps) {
    super(props);

    this.formRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (data: TFood) => {
    const { setIsOpen, handleUpdateFood } = this.props;

    await handleUpdateFood(data);
    setIsOpen();
  };

  render() {
    const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>

          <Input name="image"       placeholder="Cole o link aqui" />
          <Input name="name"        placeholder="Ex: Moda Italiana" />
          <Input name="price"       placeholder="Ex: 19.90" />
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
}; */

export const ModalEditFood = ({ isOpen, setIsOpen, editingFood, handleUpdateFood }: Readonly<ModalEditFoodProps>) => {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (data: Omit<TFood, 'id' | 'available'>) => {
    await handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>

        <Input name="image"       placeholder="Cole o link aqui" />
        <Input name="name"        placeholder="Ex: Moda Italiana" />
        <Input name="price"       placeholder="Ex: 19.90" />
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
};
