import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

export const useWebSocketNotifications = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user) return;

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/user/queue/notifications", (msg) => {
        addNotification(JSON.parse(msg.body));
      });
    };

    client.activate();
    return () => client.deactivate();
  }, [user]);
};
