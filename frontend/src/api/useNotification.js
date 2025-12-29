import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const connectProviderSocket = (email, onMessage) => {
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(
      `/topic/provider/${email}`,
      (msg) => onMessage(JSON.parse(msg.body))
    );
  });

  return stompClient;
};
