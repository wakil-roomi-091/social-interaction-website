# 🌐 Socially — Community-First Social Network

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

</div>

> **A full-stack social media platform — a hybrid between Instagram, Discord, and Meetup. Built with React, Node.js, MongoDB, and Socket.io for real-time experiences.**

**Live Demo:** [Coming Soon]  
**API Documentation:** [Coming Soon]

---

## 📸 Screenshots

<div align="center">
  <img src="screenshots/feed.png" alt="Feed" width="45%" />
  <img src="screenshots/messages.png" alt="Messages" width="45%" />
  <br />
  <img src="screenshots/profile.png" alt="Profile" width="45%" />
  <img src="screenshots/notifications.png" alt="Notifications" width="45%" />
</div>

---

## ✨ Features

### 🔐 Authentication
- JWT-based signup & login
- Protected routes
- Persistent sessions with localStorage

### 📝 Posts
- Create posts with text + images/videos
- Edit and delete posts
- Like/Unlike with smooth animations
- Comment on posts (add/delete)
- Share posts (copy link)
- Save/Bookmark posts
- Cloudinary media upload

### 💬 Real-time Messaging
- Instant messaging with Socket.io
- Typing indicators
- Read receipts
- Unread message count badge
- Conversation history
- Online/offline status

### 📸 Stories
- Upload 24-hour stories
- View stories from followed users
- Reply to stories
- Story viewer with progress bar
- Auto-advance through stories

### 🔔 Notifications
- Real-time notifications for new posts
- Unread count badge
- Mark as read (single & all)
- Delete notifications
- Click to navigate to content

### 👤 Profiles
- Customizable user profiles
- Edit profile (name, bio, avatar)
- Follow/Unfollow system
- Post count, follower/following stats
- Profile tabs (posts, saved)
- Professional status indicators

### 🔍 Search
- Global search for users & posts
- Real-time search results
- Filter by category

### 🎨 Design System
- Warm paper tones (#F7F3EC)
- Professional glassmorphism effects
- Hard offset shadows on buttons
- Cards with borders (shadows on hover)
- Responsive on all devices
- No dark mode by default

### 🚀 Additional Features
- Community pages
- Explore page for discovery
- Settings page
- 12+ pages/components
- Responsive design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool |
| **Tailwind CSS v3** | Styling |
| **Lucide React** | Icons (No emojis!) |
| **React Hot Toast** | Notifications |
| **Socket.io Client** | Real-time events |
| **Axios** | API calls |
| **date-fns** | Date formatting |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **Socket.io** | Real-time server |
| **JWT** | Authentication |
| **Cloudinary** | Media upload |
| **bcryptjs** | Password hashing |

---


---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Cloudinary account (for media uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/socially.git
cd socially

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
