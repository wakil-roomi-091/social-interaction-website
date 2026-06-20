import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SOCKET_URL = "http://localhost:5000";

let socket = null;

export const initializeSocket = (userId) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      userId,
    },
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
    socket.emit("user-connected", userId);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  // ✅ Simple toast for new messages
  socket.on("new-message", (message) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Only show for messages from others
    if (message.sender?._id !== user._id) {
      toast.success(`New message from ${message.sender?.name || "Someone"}`);
    }
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
