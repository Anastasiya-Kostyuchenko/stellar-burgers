import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearAll,
  getConstructorSelector
} from '../../services/slices/constructor/constructorSlice';
import {
  clearOrder,
  getOrderDetails,
  getOrderState
} from '../../services/slices/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { getIsAuthCheckedSelector } from '../../services/slices/user/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuthCheckedSelector);
  const constructorItems = useSelector(getConstructorSelector);
  const { order, loading } = useSelector(getOrderState);

  const onOrderClick = () => {
    if (!isAuth) return navigate('/login');

    if (!constructorItems.bun || loading) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];
    dispatch(getOrderDetails(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearAll());
    navigate('/');
  };

  useEffect(() => {
    if (order?.status === 'done') {
      dispatch(clearAll());
    }
  }, [order?.status, dispatch]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
