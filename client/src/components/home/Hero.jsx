const Hero = () => {
  return (
    <section className="reveal pt-[70px] pb-10 px-[5%] relative max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[60px] items-center">
        
        {/* Left Column - Text Content */}
        <div className="min-w-0 lg:min-w-[480px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[2px] uppercase text-rust mb-6">
            <span className="w-7 h-[2px] bg-rust"></span>
            A social network worth your time
          </div>
          
          {/* Hero Title */}
          <h1 className="font-display text-[clamp(48px,7vw,92px)] font-semibold leading-[1.02] tracking-[-2px] text-ink mb-6">
            Where real life<br />becomes <span className="italic font-medium text-moss">your feed</span>
          </h1>
          
          {/* Description */}
          <p className="text-[19px] text-ink-soft leading-[1.7] max-w-[480px] mb-9">
            No algorithms chasing your attention. No ads disguised as content. Just the people, communities, and moments that actually matter to you.
          </p>
          
          {/* Buttons */}
          <div className="flex gap-3.5 mb-10 flex-wrap">
            <a 
              href="#cta" 
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-pill text-base font-bold border-2 border-ink bg-ink text-cream no-underline transition-all duration-250 hover:bg-rust hover:border-rust hover:-translate-y-0.5 hover:shadow-[0_10px_0_0_#1C1B19]"
            >
              Create your account
            </a>
            <a 
              href="#showcase" 
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-pill text-base font-bold border-2 border-ink bg-transparent text-ink no-underline transition-all duration-250 hover:bg-paper hover:-translate-y-0.5 hover:shadow-[0_10px_0_0_#1C1B19]"
            >
              See how it works
            </a>
          </div>
          
          {/* Avatars + Social Proof */}
          <div className="flex items-center gap-3.5">
            <div className="flex">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
                alt="" 
                className="w-[42px] h-[42px] rounded-full border-3 border-cream object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00d5a4ee9bb1?w=100&h=100&fit=crop&crop=faces" 
                alt="" 
                className="w-[42px] h-[42px] rounded-full border-3 border-cream object-cover -ml-3"
              />
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" 
                alt="" 
                className="w-[42px] h-[42px] rounded-full border-3 border-cream object-cover -ml-3"
              />
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces" 
                alt="" 
                className="w-[42px] h-[42px] rounded-full border-3 border-cream object-cover -ml-3"
              />
            </div>
            <div className="text-sm text-ink-soft">
              <strong className="text-ink font-bold">40,000+</strong> people joined this month
            </div>
          </div>
        </div>
        
        {/* Right Column - Hero Visual Collage */}
        <div className="relative h-[560px]">
          {/* Main Image */}
          <div className="absolute top-0 right-0 w-[78%] h-[440px] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(28,27,25,0.35)] rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=1100&fit=crop" 
              alt="Friends laughing together outdoors"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Yellow Badge - Top Left */}
          <div className="absolute top-10 -left-2.5 w-24 h-24 bg-butter rounded-full flex flex-col items-center justify-center text-center -rotate-12 shadow-[0_12px_28px_-8px_rgba(28,27,25,0.3)]">
            <div className="font-display text-2xl font-extrabold leading-none">12k</div>
            <div className="text-[9px] font-semibold uppercase tracking-[1px] mt-0.5 font-body">Communities</div>
          </div>
          
          {/* White Card - Bottom Left */}
          <div className="absolute bottom-7 left-0 bg-paper rounded-2xl py-3.5 px-4 shadow-[0_16px_40px_-10px_rgba(28,27,25,0.25)] flex items-center gap-3 -rotate-3 max-w-[220px] animate-[floatSlow_6s_ease-in-out_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces" 
              alt=""
              className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0"
            />
            <div>
              <div className="text-[13px] font-bold">Maya posted a new story</div>
              <div className="text-[12px] text-ink-soft">2 minutes ago</div>
            </div>
          </div>
          
          {/* Likes Chip - Top Right */}
          <div className="absolute top-[90px] -right-4 bg-paper rounded-xl py-2.5 px-3.5 shadow-[0_16px_40px_-10px_rgba(28,27,25,0.25)] text-[13px] font-bold flex items-center gap-1.5 rotate-4 animate-[floatSlow_5s_ease-in-out_infinite_reverse]">
            ❤️ 2,481 likes
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;