import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface FoodObj {
  id: number
  available: boolean;
  image: string;
  name: string;
  description: string;
  price: string;
}

interface FoodProps {
  food: FoodObj;
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodObj) => void;
}

const Food = ({
  food,
  handleDelete,
  handleEditFood,
}: FoodProps): JSX.Element => {
  const { available, id } = food;
  const [isAvailable, setIsAvailable] = useState<boolean>(available);

  const toggleAvailable = async () => {
    await api.put(`/foods/${id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  const setEditingFood = () => {
    handleEditFood(food);
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.image} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(id)}
            data-testid={`remove-food-${id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${id}`} className="switch">
            <input
              id={`available-switch-${id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;