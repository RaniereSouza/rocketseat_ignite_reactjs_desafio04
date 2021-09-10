import { Component, createRef, RefObject } from 'react';
import { FiCheckSquare }                   from 'react-icons/fi';

import { FormHandles } from '@unform/core';

import { TFood } from '../../@types/Food';

import { Modal } from '../Modal';
import { Input } from '../Input';

import { Form } from './styles';

interface ModalAddFoodProps {
  isOpen:        boolean;
  setIsOpen:     () => void;
  handleAddFood: (food: TFood) => Promise<void>;
}

export class ModalAddFood extends Component<ModalAddFoodProps> {
  formRef: RefObject<FormHandles>;

  constructor(props: ModalAddFoodProps) {
    super(props);

    this.formRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (data: TFood) => {
    const { setIsOpen, handleAddFood } = this.props;

    await handleAddFood(data);
    setIsOpen();
  };

  render() {
    const { isOpen, setIsOpen } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit}>
          <h1>Novo Prato</h1>

          <Input name="image"       placeholder="Cole o link aqui" />
          <Input name="name"        placeholder="Ex: Moda Italiana" />
          <Input name="price"       placeholder="Ex: 19.90" />
          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
};
