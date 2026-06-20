import BackButton from '../components/common/BackButton';
import FeaturesHeader from '../components/features/FeaturesHeader';
import FeatureRow from '../components/features/FeatureRow';
import MoreFeaturesGrid from '../components/features/MoreFeaturesGrid';
import FeaturesCTA from '../components/features/FeaturesCTA';

const mainFeatures = [
    {
        num: '01',
        title: 'Conversations that feel like talking to a friend, not a chatbot',
        text: 'Voice notes, instant replies, group chats that don\'t get lost in the noise. Built for the way people actually message each other day to day.',
        points: [
            'Voice messages with waveform playback',
            'Read receipts you can turn off',
            'Group chats up to 250 people',
            'End-to-end encrypted by default',
        ],
        img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&h=600&fit=crop',
        stat: { icon: '💬', num: '2.1M', label: 'Messages sent daily' },
    },
    {
        num: '02',
        title: 'Find the corner of the internet that\'s actually for you',
        text: 'From neighborhood meetups to niche hobby groups spanning continents — communities on Socially are run by their members, not algorithms.',
        points: [
            '12,000+ active communities',
            'Local events & meetups built in',
            'Member-run moderation tools',
            'Custom community branding',
        ],
        img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700&h=600&fit=crop',
        stat: { icon: '🌍', num: '140+', label: 'Countries represented' },
        reverse: true,
    },
    {
        num: '03',
        title: 'Share the moment while it\'s still happening',
        text: 'Stories disappear after 24 hours, just like the real ones. Or go live and let your community drop in — no production setup required.',
        points: [
            '24-hour disappearing stories',
            'One-tap live broadcasting',
            'Save favorites to highlights',
            'Up to 1080p stream quality',
        ],
        img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&h=600&fit=crop',
        stat: { icon: '⚡', num: '38min', label: 'Avg. daily time saved' },
    },
];

const moreFeatures = [
    {
        icon: '🤖',
        title: 'Smart recommendations',
        text: 'Suggestions based on what you actually engage with, not what keeps you scrolling longest.',
    },
    {
        icon: '📊',
        title: 'Creator analytics',
        text: 'See which posts land and why, without needing a marketing degree to read the dashboard.',
    },
    {
        icon: '📅',
        title: 'Post scheduling',
        text: 'Plan a week of content in one sitting. Bulk-schedule posts and stories ahead of time.',
    },
    {
        icon: '🔒',
        title: 'Privacy controls',
        text: 'Granular settings for who sees your posts, stories, and online status — not all-or-nothing.',
    },
    {
        icon: '🎙',
        title: 'Voice rooms',
        text: 'Drop-in audio spaces for communities — no link, no calendar invite, just join.',
    },
    {
        icon: '✓',
        title: 'Verified profiles',
        text: 'A simple verification process for creators and community leaders, not a paywall badge.',
    },
];

const Features = () => {
    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1400px] mx-auto px-[5%] py-8 relative">

                <BackButton to="/" label="Back to Home" />

                <div className="mt-12">
                    {/* Header */}
                    <FeaturesHeader />

                    {/* Main Feature Rows */}
                    {mainFeatures.map((feature, index) => (
                        <FeatureRow
                            key={feature.num}
                            feature={feature}
                            isLast={index === mainFeatures.length - 1}
                        />
                    ))}

                    {/* More Features Grid */}
                    <MoreFeaturesGrid features={moreFeatures} />

                    {/* CTA Strip */}
                    <FeaturesCTA />
                </div>
            </div>
        </div>
    );
};

export default Features;