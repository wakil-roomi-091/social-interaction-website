const ProfileBadge = ({ count = 0 }) => {
    return (
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-butter flex flex-col items-center justify-center text-center rotate-6 shadow-[0_12px_28px_-8px_rgba(28,27,25,0.3)] font-display">
            <div className="text-lg font-extrabold leading-none text-ink">{count}</div>
            <div className="text-[8px] font-semibold uppercase tracking-wider mt-0.5 font-body text-ink">
                Posts
            </div>
        </div>
    );
};

export default ProfileBadge;