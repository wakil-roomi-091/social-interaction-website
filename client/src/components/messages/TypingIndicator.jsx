const Dot = ({ delay }) => {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-ink-soft inline-block animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 bg-cream-deep rounded-2xl rounded-bl-md px-4 py-3 w-fit">
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </div>
  );
};

export default TypingIndicator;