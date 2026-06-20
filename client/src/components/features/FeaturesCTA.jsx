import { Link } from 'react-router-dom';

const FeaturesCTA = () => {
    return (
        <div className="pb-24">
            <div className="bg-cream-deep rounded-xl px-8 py-14 text-center">
                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-1px] text-ink mb-3">
                    See it for yourself
                </h2>
                <p className="text-ink-soft text-base mb-7 max-w-md mx-auto">
                    Every feature here is live today, not a roadmap promise.
                </p>
                <Link
                    to="/signup"
                    className="inline-block px-8 py-4 rounded-pill bg-ink text-cream font-bold text-base hover:bg-rust transition-colors"
                >
                    Create your account →
                </Link>
            </div>
        </div>
    );
};

export default FeaturesCTA;