import { useState } from 'react';
import BackButton from '../components/common/BackButton';
import PricingHeader from '../components/pricing/PricingHeader';
import PricingCards from '../components/pricing/PricingCards';
import CompareStrip from '../components/pricing/CompareStrip';
import FAQSection from '../components/pricing/FAQSection';

const plans = [
    {
        name: 'Personal',
        price: { monthly: 0, yearly: 0 },
        period: 'free, forever',
        features: [
            'Unlimited posts & stories',
            'Join unlimited communities',
            'Voice & video messaging',
            'Standard support',
        ],
        cta: 'Get started',
        highlight: false,
    },
    {
        name: 'Creator',
        price: { monthly: 12, yearly: 9 },
        period: 'per month, billed annually',
        features: [
            'Everything in Personal',
            'Audience insights & analytics',
            'Scheduled posts & stories',
            'Verified profile badge',
            'Priority support',
        ],
        cta: 'Start free trial',
        highlight: true,
        badge: 'Most popular',
    },
    {
        name: 'Community',
        price: { monthly: 39, yearly: 29 },
        period: 'per month, for community leaders',
        features: [
            'Everything in Creator',
            'Advanced moderation tools',
            'Custom community branding',
            'Team seats (up to 5)',
            'Dedicated account manager',
        ],
        cta: 'Talk to us',
        highlight: false,
    },
];

const faqs = [
    {
        q: 'Is the Personal plan really free forever?',
        a: 'Yes. Core feed, messaging, and unlimited community access are free with no time limit and no feature countdown.',
    },
    {
        q: 'Can I switch plans later?',
        a: 'Anytime. Upgrades apply immediately; downgrades take effect at the end of your current billing cycle.',
    },
    {
        q: 'What happens to my data if I cancel?',
        a: 'Your posts, messages, and communities stay exactly as they are — cancelling only removes paid creator tools.',
    },
    {
        q: 'Do you offer student or nonprofit discounts?',
        a: 'Yes, reach out to our team with a valid student ID or nonprofit registration for 50% off the Creator plan.',
    },
];

const Pricing = () => {
    const [yearly, setYearly] = useState(true);
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <div className="bg-cream font-body min-h-screen relative">
            <div className="max-w-[1400px] mx-auto px-[5%] py-8 relative">

                <BackButton to="/" label="Back to Home" />

                <div className="mt-12">
                    {/* Header */}
                    <PricingHeader yearly={yearly} setYearly={setYearly} />

                    {/* Pricing Cards */}
                    <PricingCards plans={plans} yearly={yearly} />

                    {/* Comparison Strip */}
                    <CompareStrip />

                    {/* FAQ Section */}
                    <FAQSection faqs={faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />
                </div>
            </div>
        </div>
    );
};

export default Pricing;