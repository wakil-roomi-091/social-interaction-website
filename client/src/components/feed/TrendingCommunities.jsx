const TrendItem = ({ tag, count }) => {
  return (
    <div className="cursor-pointer">
      <div className="text-sm font-bold text-moss">{tag}</div>
      <div className="text-xs text-ink-soft">{count}</div>
    </div>
  );
};

const TrendingCommunities = () => {
  const trends = [
    { tag: 'Home Cooks Club', count: '4.2k members' },
    { tag: 'Weekend Hikers', count: '2.8k members' },
    { tag: 'Ceramics Collective', count: '3.9k members' },
    { tag: 'Live Music Lahore', count: '1.4k members' },
  ];

  return (
    <div className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-4">
        Trending communities
      </div>
      <div className="space-y-3">
        {trends.map((item, index) => (
          <TrendItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TrendingCommunities;