const Message = require("./models/Message");
const Conversation = require("./models/Conversation");

const userSockets = new Map();

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("user-connected", (userId) => {
      socket.userId = userId;
      userSockets.set(userId, socket.id);
      console.log(`✅ User ${userId} connected with socket ${socket.id}`);
      console.log(`📊 Active users:`, Array.from(userSockets.keys()));
      io.emit("user-online", { userId, status: "online" });
    });

    socket.on("send-message", async (data) => {
      try {
        const { conversationId, receiverId, text, image } = data;
        const senderId = socket.userId;

        console.log("📩 Send message request:", {
          conversationId,
          receiverId,
          senderId,
          text: text?.substring(0, 50),
        });

        if (!conversationId || !receiverId || !senderId) {
          console.error("❌ Missing required fields");
          socket.emit("message-error", { error: "Missing required fields" });
          return;
        }

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          console.error("❌ Conversation not found:", conversationId);
          socket.emit("message-error", { error: "Conversation not found" });
          return;
        }

        const message = await Message.create({
          conversation: conversationId,
          sender: senderId,
          receiver: receiverId,
          text: text || "",
          image: image || "",
        });

        console.log("✅ Message saved:", message._id);

        const populatedMessage = await Message.findById(message._id)
          .populate("sender", "name avatar")
          .populate("receiver", "name avatar");

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message._id,
          lastMessageText: text || "📷 Image",
          lastMessageAt: message.createdAt,
        });

        socket.emit("message-sent", populatedMessage);
        console.log("📤 Message confirmation sent to sender");

        const receiverSocketId = userSockets.get(receiverId);
        console.log(
          `📊 Receiver socket ID: ${receiverSocketId || "Not found"}`,
        );

        if (receiverSocketId) {
          console.log(`📤 Emitting 'new-message' to receiver: ${receiverId}`);
          io.to(receiverSocketId).emit("new-message", populatedMessage);
          console.log("✅ new-message event emitted to receiver");
        } else {
          console.log("📤 Receiver offline, message saved for later");
        }
      } catch (error) {
        console.error("❌ Send message error:", error);
        socket.emit("message-error", { error: error.message });
      }
    });

    socket.on("mark-read", async (data) => {
      try {
        const { conversationId, userId } = data;

        console.log("👁️ Marking messages as read:", { conversationId, userId });

        await Message.updateMany(
          {
            conversation: conversationId,
            receiver: userId,
            isRead: false,
          },
          {
            isRead: true,
            readAt: new Date(),
          },
        );

        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
          conversation.unreadCount.set(userId.toString(), 0);
          await conversation.save();
        }

        socket.emit("messages-read", { conversationId });
        console.log("✅ Messages marked as read");
      } catch (error) {
        console.error("❌ Mark read error:", error);
      }
    });

    socket.on("typing", (data) => {
      try {
        const { receiverId, conversationId } = data;
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("user-typing", {
            conversationId,
            userId: socket.userId,
          });
        }
      } catch (error) {
        console.error("❌ Typing error:", error);
      }
    });

    socket.on("stop-typing", (data) => {
      try {
        const { receiverId, conversationId } = data;
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("user-stopped-typing", {
            conversationId,
            userId: socket.userId,
          });
        }
      } catch (error) {
        console.error("❌ Stop typing error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Client disconnected:", socket.id);
      if (socket.userId) {
        userSockets.delete(socket.userId);
        io.emit("user-offline", { userId: socket.userId, status: "offline" });
        console.log(`👤 User ${socket.userId} is now offline`);
        console.log(`📊 Active users:`, Array.from(userSockets.keys()));
      }
    });

    socket.on("reconnect", () => {
      console.log("🔄 Client reconnected:", socket.id);
      if (socket.userId) {
        userSockets.set(socket.userId, socket.id);
        io.emit("user-online", { userId: socket.userId, status: "online" });
      }
    });
  });

  return { userSockets };
};

module.exports = { initializeSocket, userSockets };
