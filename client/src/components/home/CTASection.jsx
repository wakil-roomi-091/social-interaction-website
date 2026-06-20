const CTASection = () => {
  return (
    <section className="px-[5%] py-[110px] max-w-[1400px] mx-auto">
      <div className="reveal rounded-3xl text-center relative overflow-hidden">
        
        {/* Background Image - Full coverage */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=800&fit=crop')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative z-10 px-[5%] py-[90px]">
          <h2 className="font-display text-[clamp(40px,6vw,72px)] font-semibold tracking-[-2px] leading-[1.05] text-white mb-5">
            Your people are<br />already <span className="italic text-butter">here</span>
          </h2>
          <p className="text-lg text-white/80 max-w-[480px] mx-auto mb-9">
            Join 4.2 million people who've found their corner of the internet. It takes less than a minute.
          </p>
          
          {/* CTA Form */}
          <form className="flex gap-3 max-w-[600px] mx-auto flex-wrap sm:flex-nowrap" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="flex-[3] px-6 py-4 rounded-pill bg-white/95 text-ink text-[16px] font-body placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-butter focus:bg-white transition-all"
            />
            <button 
              type="submit"
              className="flex-1 px-8 py-4 rounded-pill text-[16px] font-semibold bg-butter text-ink hover:bg-white hover:text-ink transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Get started →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;