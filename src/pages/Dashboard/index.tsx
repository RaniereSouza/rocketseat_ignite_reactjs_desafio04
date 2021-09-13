// import { Component } from 'react';
import { useState, useEffect } from 'react';

import { TFood } from '../../@types/Food';

import { api } from '../../services/api';

import { Header }        from '../../components/Header';
import { Food }          from '../../components/Food';
import { ModalAddFood }  from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

/* interface DashboardState {
  foods:         TFood[];
  editingFood:   TFood;
  modalOpen:     boolean;
  editModalOpen: boolean;
} */

/* export class OldDashboard extends Component<{}, DashboardState> {
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
}; */

export const Dashboard = () => {
  const [ foods,         setFoods ]         = useState([] as TFood[]),
        [ editingFood,   setEditingFood ]   = useState({} as TFood),
        [ modalOpen,     setModalOpen ]     = useState(false),
        [ editModalOpen, setEditModalOpen ] = useState(false);

  useEffect(() => {
    api.get<TFood[]>('/foods').then(response => {
      setFoods(response.data);
    });
  }, []);

  const handleAddFood = async (food: Omit<TFood, 'id' | 'available'>) => {
    try {
      const response = await api.post<TFood>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: Omit<TFood, 'id' | 'available'>) => {
    try {
      const foodUpdated = await api.put<TFood>(
        `/foods/${editingFood.id}`,
        {...editingFood, ...food},
      );

      const foodsUpdated = foods.map(f => (
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      ));

      setFoods(foodsUpdated);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => (food.id !== id));

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: TFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {(foods.length > 0) && foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
};
