const TestimonialSection = () => {
    const testimonials = [
        {
            stars: '★★★★★',
            text: '"I run a small ceramics community here and it\'s grown to almost 4,000 members organically. No ads, no weird algorithm pushing us around. Just genuine engagement."',
            img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
            name: 'Hana Park',
            role: 'Ceramics Collective, Seoul'
        },
        {
            stars: '★★★★★',
            text: '"The voice messages are a game changer for our long-distance friend group. It feels like we\'re catching up over coffee instead of texting walls of text."',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
            name: 'Marcus Webb',
            role: 'Software Engineer, Lagos'
        },
        {
            stars: '★★★★★',
            text: '"Switched our entire university photography club over from group chats. Stories + the events tab basically replaced three other apps we were juggling."',
            img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
            name: 'Sana Raza',
            role: 'Student, Lahore'
        }
    ];

    return (
        <section className="px-[5%] py-0 max-w-[1400px] mx-auto">
            <div className="reveal bg-ink text-cream rounded-3xl px-[5%] py-20 relative overflow-hidden">
                {/* Blur decoration */}
                <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full bg-moss opacity-30 blur-[40px]"></div>

                <div className="relative z-10 max-w-[1300px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-15">
                        <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-butter justify-center mb-[18px]">
                            <span className="w-7 h-[2px] bg-butter"></span>
                            What people say
                        </div>
                        <h2 className="font-display text-[clamp(36px,5vw,58px)] font-semibold tracking-[-1.5px] leading-[1.08] text-cream">
                            Real reviews from<br /><span className="italic text-butter">real members</span>
                        </h2>
                    </div>

                    {/* Testimonial Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className="reveal bg-[rgba(247,243,236,0.06)] border border-[rgba(247,243,236,0.12)] rounded-2xl p-7 backdrop-blur-[10px]"
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="text-butter text-sm tracking-[2px] mb-4">{item.stars}</div>
                                <p className="text-[15px] leading-relaxed text-[rgba(247,243,236,0.85)] mb-6">{item.text}</p>
                                <div className="flex items-center gap-3">
                                    <img src={item.img} alt="" className="w-11 h-11 rounded-full object-cover" />
                                    <div>
                                        <div className="text-sm font-bold">{item.name}</div>
                                        <div className="text-xs text-[rgba(247,243,236,0.5)]">{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;