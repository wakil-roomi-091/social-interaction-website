const Button = ({
    children,
    variant = 'primary',
    size = 'default',
    loading = false,
    className = '',
    ...props
}) => {
    const sizes = {
        small: 'px-5 py-2 text-sm',
        default: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    };

    const variants = {
        primary: 'bg-ink text-cream rounded-full hover:bg-rust',
        outline: 'bg-transparent text-ink border-2 border-ink rounded-full hover:bg-ink hover:text-cream',
        big: 'bg-ink text-cream rounded-full hover:bg-rust',
        bigOutline: 'bg-transparent text-ink border-2 border-ink rounded-full hover:bg-ink hover:text-cream',
    };

    const hardShadow = (variant === 'big' || variant === 'bigOutline')
        ? 'hover:shadow-[0_10px_0_0_#1C1B19] active:translate-y-1 active:shadow-[0_5px_0_0_#1C1B19]'
        : '';

    return (
        <button
            className={`inline-flex items-center justify-center font-body font-semibold transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${hardShadow} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;