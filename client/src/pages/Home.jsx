import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import LogoStrip from '../components/home/LogoStrip';
import FeedShowcase from '../components/home/FeedShowcase';
import FeatureRow from '../components/home/FeatureRow';
import CommunityGrid from '../components/home/CommunityGrid';
import StatsBand from '../components/home/StatsBand';
import TestimonialSection from '../components/home/TestimonialSection';
import PricingSection from '../components/home/PricingSection';
import CTASection from '../components/home/CTASection';
import { initScrollReveal } from '../utils/scrollAnimation';

const Home = () => {
    useEffect(() => {
        initScrollReveal();
    }, []);

    return (
        <div className="bg-cream min-h-screen relative">
            <div className="grain fixed inset-0 z-200 pointer-events-none opacity-[0.035] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}>
            </div>
            <Hero />
            <LogoStrip />
            <FeedShowcase />
            <FeatureRow />
            <CommunityGrid />
            <StatsBand />
            <TestimonialSection />
            <PricingSection />
            <CTASection />
        </div>
    );
};

export default Home;