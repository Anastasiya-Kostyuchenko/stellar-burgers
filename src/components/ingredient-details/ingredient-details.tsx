import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientId } from '../../services/slices/ingredientSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const id = useParams();
  const ingredientData = useSelector((state) => getIngredientId(state, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
