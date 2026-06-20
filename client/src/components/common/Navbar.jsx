import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isLoggedIn = token && user;
  const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Check if we should show search bar (only when logged in and on main pages)
  const showSearch = isLoggedIn && ['/feed', '/explore', '/communities', '/profile'].some(path =>
    location.pathname === path || location.pathname.startsWith('/profile/')
  );

  return (
    <nav
      className={`sticky top-0 z-[999] flex items-center justify-between px-[5%] py-[18px] transition-all duration-300 border-b ${isScrolled
          ? 'bg-[rgba(247,243,236,0.85)] backdrop-blur-[16px] border-[rgba(28,27,25,0.08)] shadow-[0_4px_20px_rgba(28,27,25,0.06)]'
          : 'bg-[rgba(247,243,236,0.95)] border-[rgba(28,27,25,0.12)]'
        }`}
    >
      {/* Logo */}
      <Link
        to={isLoggedIn ? '/feed' : '/'}
        className="font-display text-[26px] font-bold text-ink tracking-[-0.5px] flex items-center gap-2 no-underline flex-shrink-0"
      >
        <span className="w-[10px] h-[10px] rounded-full bg-rust inline-block -translate-y-2"></span>
        Socially
      </Link>

      {/* Navigation Links (Logged Out) */}
      {!isLoggedIn && (
        <ul className="hidden md:flex gap-9 list-none m-0 p-0">
          <li><Link to="/features" className="text-ink-soft text-[15px] font-medium no-underline transition-colors duration-200 hover:text-ink relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:bg-rust after:transition-all after:duration-250 hover:after:w-full">Features</Link></li>
          <li><Link to="/explore" className="text-ink-soft text-[15px] font-medium no-underline transition-colors duration-200 hover:text-ink relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:bg-rust after:transition-all after:duration-250 hover:after:w-full">Explore</Link></li>
          <li><Link to="/communities" className="text-ink-soft text-[15px] font-medium no-underline transition-colors duration-200 hover:text-ink relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:bg-rust after:transition-all after:duration-250 hover:after:w-full">Communities</Link></li>
          <li><Link to="/pricing" className="text-ink-soft text-[15px] font-medium no-underline transition-colors duration-200 hover:text-ink relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:bg-rust after:transition-all after:duration-250 hover:after:w-full">Pricing</Link></li>
        </ul>
      )}

      {/* Search Bar - Only when logged in and on main pages */}
      {showSearch && (
        <div className="flex-1 max-w-2xl mx-6 hidden md:block">
          <SearchBar />
        </div>
      )}

      {/* Right Section */}
      <div className="flex gap-2.5 items-center flex-shrink-0">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="flex items-center gap-2 text-[15px] font-medium text-ink-soft hover:text-ink transition-colors duration-200 no-underline">
              <div className="w-8 h-8 rounded-full bg-moss text-cream flex items-center justify-center text-sm font-bold">
                {userData?.name?.charAt(0) || 'U'}
              </div>
            </Link>
            <button onClick={handleLogout} className="text-[15px] font-semibold text-ink-soft hover:text-rust transition-colors duration-200 no-underline cursor-pointer">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[15px] font-semibold text-ink no-underline px-1 py-2.5 transition-colors duration-200 hover:text-rust">Log in</Link>
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-pill text-[15px] font-bold border-2 border-ink bg-ink text-cream no-underline transition-all duration-250 hover:bg-rust hover:border-rust hover:-translate-y-0.5">Join free</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;