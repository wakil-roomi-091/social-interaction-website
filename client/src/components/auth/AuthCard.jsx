import { Link } from 'react-router-dom';

const AuthCard = ({
    children,
    title,
    subtitle,
}) => {
    return (
        <div className="w-full max-w-[480px] bg-paper rounded-3xl border border-[rgba(28,27,25,0.06)] p-10 shadow-[0_40px_80px_-30px_rgba(28,27,25,0.12)]">
            {/* Logo */}
            <div className="text-center mb-8">
                <Link to="/" className="font-display text-[26px] font-bold text-ink inline-flex items-center gap-2.5 no-underline">
                    <span className="w-3 h-3 rounded-full bg-rust inline-block flex-shrink-0" />
                    Socially
                </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="font-display text-[30px] font-semibold text-ink leading-[1.1] mb-2">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-[15px] text-ink-soft">{subtitle}</p>
                )}
            </div>

            {/* Form Content */}
            {children}
        </div>
    );
};

export default AuthCard;