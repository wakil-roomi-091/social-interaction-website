import React from "react";

const productLinks = [
    { label: "Feed", href: "#showcase" },
    { label: "Features", href: "#features" },
    { label: "Communities", href: "#community" },
    { label: "Pricing", href: "#pricing" },
];

const companyLinks = [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
];

const resourceLinks = [
    { label: "Help Center", href: "#" },
    { label: "Community Guidelines", href: "#" },
    { label: "Safety Center", href: "#" },
    { label: "Developers", href: "#" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
];

const cities = ["Peshawar", "San Francisco", "Lagos", "Seoul"];

const socials = [
    {
        label: "X (Twitter)",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px]">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.13c-.42.05-1.34.05-2.16.91C2.6 5.7 2.4 7.2 2.4 7.2S2.25 8.94 2.25 10.68v1.62c0 1.74.15 3.48.15 3.48s.21 1.5.85 2.16c.82.89 1.9.86 2.38.96 1.73.16 7.37.21 7.37.21s3.6-.01 6.58-.14c.42-.06 1.34-.06 2.16-.92.64-.66.86-2.16.86-2.16s.15-1.74.15-3.48v-1.62c0-1.74-.15-3.48-.15-3.48zM9.95 14.5V8.8l5.6 2.85z" />
            </svg>
        ),
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-cream-deep border-t border-ink/[0.06]">
            <div className="max-w-[1400px] mx-auto px-[5%] pt-20 pb-8">

                {/* Link Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-x-8 gap-y-10 pb-12 border-b border-ink/[0.08]">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-6 lg:col-span-4">
                        <a
                            href="#"
                            className="font-display text-[26px] font-bold text-ink flex items-center gap-2.5 no-underline mb-4"
                        >
                            <span className="w-3 h-3 rounded-full bg-rust inline-block flex-shrink-0" />
                            Socially
                        </a>
                        <p className="text-[15px] text-ink-soft leading-relaxed max-w-[300px] mb-6">
                            A social network built around real people, real communities,
                            and real conversations.
                        </p>
                        <div className="flex items-center gap-2.5">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-full bg-ink/5 text-ink-soft flex items-center justify-center transition-all duration-200 hover:bg-ink hover:text-cream"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterColumn title="Product" links={productLinks} className="lg:col-span-2" />
                    <FooterColumn title="Company" links={companyLinks} className="lg:col-span-2" />
                    <FooterColumn title="Resources" links={resourceLinks} className="lg:col-span-2" />
                    <FooterColumn title="Legal" links={legalLinks} className="lg:col-span-2" />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                    <p className="text-[13.5px] text-ink-soft/70">
                        © {currentYear} Socially, Inc. Made with care.
                    </p>
                    <div className="flex items-center gap-2.5 text-[13px] text-ink-soft/70">
                        {cities.map((city, i) => (
                            <React.Fragment key={city}>
                                {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-ink-soft/30" />}
                                <span>{city}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

function FooterColumn({ title, links, className = "" }) {
    return (
        <div className={`col-span-1 md:col-span-2 ${className}`}>
            <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-ink/45 mb-4">
                {title}
            </h4>
            <ul className="list-none flex flex-col gap-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <a
                            href={link.href}
                            className="text-[14.5px] text-ink-soft no-underline transition-colors duration-200 hover:text-rust"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Footer;