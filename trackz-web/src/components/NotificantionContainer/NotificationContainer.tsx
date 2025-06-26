import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './NotificationContainer.module.css';

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div className={styles.container}>
      {notifications.map(notification => (
        <div key={notification.id} className={`${styles.toast} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;