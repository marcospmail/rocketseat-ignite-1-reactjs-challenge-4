import { useEffect, useState } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import FoodComp from '../../components/Food';

import { Food } from '../../types/index';

import { FoodsContainer } from './styles';

function Dashboard() {
  const [foods, setFoods] = useState<Food[]>([])
  const [editingFood, setEditingFood] = useState<Food>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  useEffect(() => {
    async function fetchFoods() {
      const response = await api.get('/foods');
      setFoods(response.data)
    }

    fetchFoods()
  }, [])

  const handleAddFood = async (food: Food) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: Food) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(oldModalOpen => !oldModalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(editModalOpen => !editModalOpen)
  }

  const handleEditFood = (food: Food) => {
    setEditingFood(food)
    setEditModalOpen(true)
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
        {foods &&
          foods.map(food => (
            <FoodComp
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
};

export default Dashboard;
