import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

export const useWebSocketNotifications = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user?.email) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: () => {},

      onConnect: () => {
        console.log("✅ WebSocket connected");

        // 🔔 JOB PROVIDER notifications
        client.subscribe(`/topic/provider/${user.email}`, (msg) => {
          addNotification(JSON.parse(msg.body));
        });

        // 🔔 JOB SEEKER notifications
        client.subscribe(`/topic/seeker/${user.email}`, (msg) => {
          addNotification(JSON.parse(msg.body));
        });
      },

      onStompError: (frame) => {
        console.error("STOMP error", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [user]);
};
