import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Communities from './pages/Communities';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import { SocketProvider } from './context/SocketContext';

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;

  const hideFooterPages = ['/feed', '/profile', '/messages', '/explore', '/notifications', '/settings', '/communities'];
  const hideNavbarPages = ['/login', '/signup'];

  const showFooter = !hideFooterPages.includes(pathname) && !pathname.startsWith('/profile/') && !pathname.startsWith('/messages/');
  const showNavbar = !hideNavbarPages.includes(pathname);

  return (
    <div className="bg-cream min-h-screen relative">
      <div
        className="grain fixed inset-0 z-200 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(28, 27, 25, 0.08)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 20px 60px -20px rgba(28, 27, 25, 0.2)',
            fontSize: '14px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            color: '#1C1B19',
          },
          success: {
            icon: '✅',
            style: {
              border: '1px solid rgba(61, 92, 69, 0.2)',
            }
          },
          error: {
            icon: '❌',
            style: {
              border: '1px solid rgba(193, 89, 42, 0.2)',
            }
          },
        }}
      />

      {showNavbar && <Navbar />}

      <main className="bg-cream min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:userId" element={<Messages />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;