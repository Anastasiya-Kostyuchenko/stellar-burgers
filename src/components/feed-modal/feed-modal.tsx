import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info';

export const FeedModal: FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();

  if (!number) return null;

  return (
    <Modal title={`#${number}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};
