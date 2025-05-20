import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrder } from '../../services/slices/userOrderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.userOrder.orders);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
