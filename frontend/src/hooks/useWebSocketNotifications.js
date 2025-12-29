import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

const WS_URL = "ws://localhost:8080/ws"; // 🔥 native websocket

export const useWebSocketNotifications = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user) return;

    const client = new Client({
      brokerURL: WS_URL, 
      reconnectDelay: 5000,
      debug: () => {},
    });

    client.onConnect = () => {
      const topic =
        user.role === "JOB_PROVIDER"
          ? `/topic/provider/${user.email}`
          : `/topic/seeker/${user.email}`;

      client.subscribe(topic, (msg) => {
        addNotification(JSON.parse(msg.body));
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker error:", frame.headers["message"]);
    };

    client.activate();

    return () => client.deactivate();
  }, [user]);
};
