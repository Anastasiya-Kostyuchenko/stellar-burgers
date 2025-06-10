import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { OrderInfo } from '../order-info';
import { Modal } from '../modal';

export const FeedModal: FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();

  if (!number) {
    return null;
  }

  return (
    <Modal title={`#${number}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};
