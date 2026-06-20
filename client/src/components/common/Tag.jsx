import 'react';

const Tag = ({ text, color = 'moss' }) => {
    const colorClasses = {
        moss: 'text-moss before:bg-moss',
        rust: 'text-rust before:bg-rust',
        butter: 'text-butter before:bg-butter',
    };

    return (
        <div className={`inline-flex items-center gap-2.5 font-body font-bold text-[13px] tracking-[2px] uppercase ${colorClasses[color]} before:content-[''] before:w-7 before:h-[2px]`}>
            {text}
        </div>
    );
};

export default Tag;