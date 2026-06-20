import { useState } from 'react';
import BackButton from '../components/common/BackButton';
import ExploreSearch from '../components/explore/ExploreSearch';
import ExploreFilters from '../components/explore/ExploreFilters';
import ExploreGrid from '../components/explore/ExploreGrid';

const Explore = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Photos', 'Videos', 'Articles', 'Communities', 'People'];

    const items = [
        {
            id: 1,
            img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=750&fit=crop',
            tag: 'Art & Design',
            title: 'Creative Collective',
            meta: 'by Maya Chen · 4.2k likes',
            size: 'tall',
        },
        {
            id: 2,
            img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=450&fit=crop',
            tag: 'Music',
            title: 'Live Sessions',
            meta: 'by Theo Marsh · 2.8k likes',
            size: 'short',
        },
        {
            id: 3,
            img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=550&fit=crop',
            tag: 'Sports',
            title: 'Weekend Leagues',
            meta: 'by Marcus Webb · 6.1k likes',
            size: 'med',
        },
        {
            id: 4,
            img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
            tag: 'Food',
            title: 'Home Cooks Club',
            meta: 'by Noor Al-Sayed · 3.4k likes',
            size: 'short',
        },
        {
            id: 5,
            img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=750&fit=crop',
            tag: 'Travel',
            title: 'Wanderers',
            meta: 'by Alina Kovac · 8.9k likes',
            size: 'tall',
        },
        {
            id: 6,
            img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=450&fit=crop',
            tag: 'Music',
            title: 'Studio Sessions',
            meta: 'by Theo Marsh · 1.9k likes',
            size: 'short',
        },
        {
            id: 7,
            img: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&h=550&fit=crop',
            tag: 'Food',
            title: 'Sunday Cooking',
            meta: 'by Noor Al-Sayed · 2.6k likes',
            size: 'med',
        },
        {
            id: 8,
            img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=750&fit=crop',
            tag: 'Travel',
            title: 'Mountain Trails',
            meta: 'by Sana Raza · 5.3k likes',
            size: 'tall',
        },
    ];

    const filteredItems = activeFilter === 'All'
        ? items
        : items.filter(item => item.tag.toLowerCase().includes(activeFilter.toLowerCase()));

    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1400px] mx-auto px-[5%] py-8 relative">

                {/* Back Button */}
                <BackButton label="Back " />

                <div className="mt-12">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-display text-3xl font-semibold text-ink mb-1">
                            Explore
                        </h1>
                        <p className="text-ink-soft text-sm">
                            Discover trending posts, communities, and people
                        </p>
                    </div>

                    {/* Search Bar */}
                    <ExploreSearch />

                    {/* Filters */}
                    <ExploreFilters
                        filters={filters}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />

                    {/* Grid */}
                    <ExploreGrid items={filteredItems} />
                </div>
            </div>
        </div>
    );
};

export default Explore;