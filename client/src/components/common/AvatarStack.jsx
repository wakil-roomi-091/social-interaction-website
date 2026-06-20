import 'react';

const AvatarStack = ({ 
  avatars = [], 
  totalCount = null,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };
  
  const borderClasses = 'ring-2 ring-cream';
  
  const displayAvatars = avatars.slice(0, 4);
  const remainingCount = totalCount ? totalCount - displayAvatars.length : 0;
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex -space-x-3">
        {displayAvatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`User ${index + 1}`}
            className={`${sizeClasses[size]} ${borderClasses} rounded-full object-cover`}
          />
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="ml-3 font-body font-semibold text-sm text-ink-soft">
          +{remainingCount}+ joined
        </span>
      )}
    </div>
  );
};

export default AvatarStack;