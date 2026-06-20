const AuthInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-[13px] font-semibold text-ink mb-1.5">
                    {label} {required && <span className="text-rust">*</span>}
                </label>
            )}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-5 py-3.5 rounded-xl bg-cream/50 border-2 text-[15px] text-ink placeholder:text-ink-soft/40 outline-none transition-all duration-200 ${error ? 'border-rust focus:border-rust' : 'border-transparent focus:border-ink/30'
                    }`}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-[13px] text-rust font-medium">{error}</p>
            )}
        </div>
    );
};

export default AuthInput;