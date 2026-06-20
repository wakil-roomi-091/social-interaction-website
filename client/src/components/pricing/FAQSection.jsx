const FAQSection = ({ faqs, openFaq, setOpenFaq }) => {
    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-semibold text-ink mb-7 text-center">
                Common questions
            </h3>
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div
                        key={faq.q}
                        className="bg-paper border border-[#1C1B19]/[0.12] rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                            className="w-full flex items-center justify-between text-left px-6 py-4.5 cursor-pointer"
                        >
                            <span className="font-semibold text-sm text-ink">{faq.q}</span>
                            <span
                                className={`text-ink-soft text-lg transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-45' : ''
                                    }`}
                            >
                                +
                            </span>
                        </button>
                        {openFaq === i && (
                            <div className="px-6 pb-5 text-sm text-ink-soft leading-relaxed">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;