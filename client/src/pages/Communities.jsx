import { useState } from 'react';
import BackButton from '../components/common/BackButton';
import CommunitiesHeader from '../components/communities/CommunitiesHeader';
import CommunitiesFilter from '../components/communities/CommunitiesFilter';
import FeaturedCommunity from '../components/communities/FeaturedCommunity';
import DiscoverGrid from '../components/communities/DiscoverGrid';
import MyCommunitiesSidebar from '../components/communities/MyCommunitiesSidebar';
import QuoteCard from '../components/communities/QuoteCard';
import CreateCommunityCard from '../components/communities/CreateCommunityCard';

const categories = ['All', 'Art & Design', 'Music', 'Sports', 'Food', 'Travel', 'Tech'];

const myCommunities = [
    {
        img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
        name: 'Creative Collective',
        members: '4.2k members',
        unread: 12,
    },
    {
        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop',
        name: 'Home Cooks Club',
        members: '3.4k members',
        unread: 3,
    },
    {
        img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop',
        name: 'Weekend Hikers',
        members: '2.8k members',
        unread: 0,
    },
];

const featured = {
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1100&h=500&fit=crop',
    tag: 'Featured this week',
    name: 'Live Music Sessions',
    desc: 'A community for people who\'d rather hear a song played badly live than perfectly through speakers. Weekly listening rooms, gear talk, and local show meetups.',
    members: '8,940',
    posts: '312',
};

const discover = [
    {
        img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
        tag: 'Sports',
        name: 'Weekend Leagues',
        desc: 'Pickup basketball and football games organized every Saturday.',
        members: '2.1k',
    },
    {
        img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        tag: 'Travel',
        name: 'Wanderers',
        desc: 'Trip planning, hidden gems, and travel buddies across 40 countries.',
        members: '8.9k',
    },
    {
        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        tag: 'Music',
        name: 'Studio Sessions',
        desc: 'Producers and musicians sharing works-in-progress and feedback.',
        members: '1.9k',
    },
    {
        img: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=400&h=300&fit=crop',
        tag: 'Food',
        name: 'Sunday Cooking',
        desc: 'Slow recipes, kitchen wins, and the occasional dinner-party disaster.',
        members: '2.6k',
    },
    {
        img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop',
        tag: 'Lifestyle',
        name: 'Rooftop Society',
        desc: 'Golden-hour meetups for people who like a view with their evening.',
        members: '1.4k',
    },
    {
        img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
        tag: 'Local',
        name: 'City Meetups',
        desc: 'Casual, low-pressure gatherings for people new to the city.',
        members: '3.7k',
    },
];

const Communities = () => {
    const [activeCat, setActiveCat] = useState('All');

    const filteredDiscover = activeCat === 'All'
        ? discover
        : discover.filter(c => c.tag === activeCat);

    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1400px] mx-auto px-[5%] py-8 relative">

                <BackButton label="Back" />

                <div className="mt-12">
                    {/* Header */}
                    <CommunitiesHeader />

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

                        {/* Main Column */}
                        <div>
                            {/* Category filters */}
                            <CommunitiesFilter
                                categories={categories}
                                activeCat={activeCat}
                                setActiveCat={setActiveCat}
                            />

                            {/* Featured Community */}
                            <FeaturedCommunity featured={featured} />

                            {/* Discover Grid */}
                            <DiscoverGrid items={filteredDiscover} />
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-5">
                            <MyCommunitiesSidebar communities={myCommunities} />
                            <QuoteCard />
                            <CreateCommunityCard />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communities;