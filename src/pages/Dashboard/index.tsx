import { Component } from 'react';

import { TFood } from '../../@types/Food';

import { api } from '../../services/api';

import { Header }        from '../../components/Header';
import { Food }          from '../../components/Food';
import { ModalAddFood }  from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface DashboardState {
  foods:         TFood[];
  editingFood:   TFood;
  modalOpen:     boolean;
  editModalOpen: boolean;
}

export class Dashboard extends Component<{}, DashboardState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      foods:         [] as TFood[],
      editingFood:   {} as TFood,
      modalOpen:     false,
      editModalOpen: false,
    };

    this.handleAddFood    = this.handleAddFood.bind(this);
    this.handleUpdateFood = this.handleUpdateFood.bind(this);
    this.handleDeleteFood = this.handleDeleteFood.bind(this);
    this.toggleModal      = this.toggleModal.bind(this);
    this.toggleEditModal  = this.toggleEditModal.bind(this);
    this.handleEditFood   = this.handleEditFood.bind(this);
  }

  async componentDidMount() {
    const response = await api.get<TFood[]>('/foods');

    this.setState({foods: response.data});
  }

  handleAddFood = async (food: TFood) => {
    const { foods } = this.state;

    try {
      const response = await api.post<TFood>('/foods', {
        ...food,
        available: true,
      });

      this.setState({foods: [...foods, response.data]});
    }
    catch (err) {
      console.log(err);
    }
  }

  handleUpdateFood = async (food: TFood) => {
    const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put<TFood>(
        `/foods/${editingFood.id}`,
        {...editingFood, ...food},
      );

      const foodsUpdated = foods.map(f => (
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      ));

      this.setState({foods: foodsUpdated});
    }
    catch (err) {
      console.log(err);
    }
  }

  handleDeleteFood = async (id: number) => {
    const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => (food.id !== id));

    this.setState({foods: foodsFiltered});
  }

  toggleModal = () => {
    const { modalOpen } = this.state;

    this.setState({modalOpen: !modalOpen});
  }

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({editModalOpen: !editModalOpen});
  }

  handleEditFood = (food: TFood) => {
    this.setState({editingFood: food, editModalOpen: true});
  }

  render() {
    const { modalOpen, 
            editModalOpen, 
            editingFood, 
            foods } = this.state;

    return (
      <>
        <Header openModal={this.toggleModal} />

        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={this.toggleModal}
          handleAddFood={this.handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={this.toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={this.handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {(foods.length > 0) && foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={this.handleDeleteFood}
              handleEditFood={this.handleEditFood}
            />
          ))}
        </FoodsContainer>
      </>
    );
  }
};
