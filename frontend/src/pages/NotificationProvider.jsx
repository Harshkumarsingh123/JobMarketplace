import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/user/queue/notifications`,
        (msg) => {
          const notification = JSON.parse(msg.body);
          addNotification(notification);
        }
      );
    });

    return () => stompClient.disconnect();
  }, [user]);

  const addNotification = (notification) => {
    setNotifications((prev) => [
      { ...notification, read: false },
      ...prev,
    ]);
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllRead, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
