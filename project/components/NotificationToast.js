import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '@/redux/cryptoSlice';

export default function NotificationToast() {
  const { notification } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-700 p-4 rounded-lg shadow-lg">
      <p className="text-sm">
        {notification.type === 'price_alert'
          ? `${notification.id} price updated to $${notification.priceUsd}`
          : `Weather alert: ${notification.message}`}
      </p>
      <button
        className="mt-2 text-blue-400 hover:text-blue-500"
        onClick={() => dispatch(clearNotification())}
      >
        Dismiss
      </button>
    </div>
  );
}