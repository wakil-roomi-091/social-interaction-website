import { Link } from 'react-router-dom';

const BackButton = ({ to, label = 'Back' }) => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isLoggedIn = token && user;

    // If no 'to' prop is provided, determine destination based on login status
    const destination = to || (isLoggedIn ? '/feed' : '/');

    return (
        <Link
            to={destination}
            className="absolute top-8 left-[5%] flex items-center gap-2 text-[14px] font-medium text-ink-soft/70 hover:text-ink transition-colors duration-200 no-underline group z-10"
        >
            <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {label}
        </Link>
    );
};

export default BackButton;