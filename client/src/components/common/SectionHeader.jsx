import 'react';
import Tag from './Tag';

const SectionHeader = ({
    tag,
    tagColor = 'moss',
    title,
    description,
    titleEmphasis = null
}) => {
    // Handle italic emphasis in title
    const renderTitle = () => {
        if (!titleEmphasis) return title;

        const parts = title.split(titleEmphasis);
        return (
            <>
                {parts[0]}
                <span className="italic font-medium text-moss">{titleEmphasis}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
            {/* Left side - Tag + Title */}
            <div className="max-w-[60%]">
                <Tag text={tag} color={tagColor} />
                <h2 className="font-display font-semibold text-[clamp(36px,5vw,58px)] leading-[1.08] -tracking-[1.5px] text-ink mt-4">
                    {renderTitle()}
                </h2>
            </div>

            {/* Right side - Description */}
            <div className="max-w-[380px]">
                <p className="font-body text-[15px] md:text-[17px] leading-relaxed text-ink-soft">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SectionHeader;