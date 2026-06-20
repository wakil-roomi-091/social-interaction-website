import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Auth API calls
export const authAPI = {
  signup: (userData) => api.post("/auth/signup", userData),
  login: (userData) => api.post("/auth/login", userData),
  getMe: () => api.get("/auth/me"),
};

// Posts API calls
export const postsAPI = {
  getAll: () => api.get("/posts"),
  getOne: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post("/posts", data),
  update: (id, data) => api.put(`/posts/${id}`, data), // ✅ NEW
  toggleLike: (id) => api.put(`/posts/${id}/like`),
  toggleSave: (id) => api.put(`/posts/${id}/save`),
  addComment: (id, text) => api.post(`/posts/${id}/comments`, { text }),
  deleteComment: (postId, commentId) =>
    api.delete(`/posts/${postId}/comments/${commentId}`),
  delete: (id) => api.delete(`/posts/${id}`),
};

// ✅ NEW: Upload API calls
export const uploadAPI = {
  uploadImage: (formData) =>
    api.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  uploadMultiple: (formData) =>
    api.post("/upload/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteImage: (publicId) =>
    api.delete("/upload/image", { data: { publicId } }),
};

// Search API calls
export const searchAPI = {
  search: (query) => api.get(`/search?q=${encodeURIComponent(query)}`),
  searchUsers: (query) =>
    api.get(`/search/users?q=${encodeURIComponent(query)}`),
  searchPosts: (query) =>
    api.get(`/search/posts?q=${encodeURIComponent(query)}`),
  searchCommunities: (query) =>
    api.get(`/search/communities?q=${encodeURIComponent(query)}`),
};

export const storyAPI = {
  getAll: () => api.get("/stories"),
  getOne: (id) => api.get(`/stories/${id}`),
  create: (formData) =>
    api.post("/stories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  view: (id) => api.put(`/stories/${id}/view`),
  delete: (id) => api.delete(`/stories/${id}`),
  // ✅ Reply to story
  reply: (id, text) => api.post(`/stories/${id}/reply`, { text }),
  getReplies: (id) => api.get(`/stories/${id}/replies`),
};

// ✅ Messages API calls
export const messageAPI = {
  getConversations: () => api.get("/messages/conversations"),
  getOrCreateConversation: (userId) =>
    api.post("/messages/conversation", { userId }),
  getMessages: (conversationId, params = {}) =>
    api.get(`/messages/${conversationId}`, { params }),
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
};

// Notification API calls
export const notificationAPI = {
  getAll: () => api.get("/notifications"),
  getUnreadCount: () => api.get("/notifications/unread-count"),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put("/notifications/read-all"),
  delete: (id) => api.delete(`/notifications/${id}`),
};

export default api;
