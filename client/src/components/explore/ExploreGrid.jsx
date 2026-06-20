import ExploreCard from './ExploreCard';

const sizeClasses = {
    tall: 'h-[420px]',
    med: 'h-[300px]',
    short: 'h-[220px]',
};

const ExploreGrid = ({ items }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
                <ExploreCard
                    key={item.id}
                    item={item}
                    sizeClass={sizeClasses[item.size]}
                />
            ))}
        </div>
    );
};

export default ExploreGrid;