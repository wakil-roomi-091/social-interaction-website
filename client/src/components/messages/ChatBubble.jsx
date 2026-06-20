import { useState } from 'react';
import ImageLightbox from '../common/ImageLightbox';

const ChatBubble = ({ message }) => {
    const isMe = message.from === 'me';
    const [showLightbox, setShowLightbox] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowLightbox(true);
    };

    return (
        <>
            <div
                className={`max-w-[70%] px-4 py-2.5 text-sm leading-relaxed ${isMe
                        ? 'ml-auto bg-moss text-cream rounded-2xl rounded-br-md'
                        : 'bg-cream-deep text-ink rounded-2xl rounded-bl-md'
                    }`}
            >
                {message.image && (
                    <img
                        src={message.image}
                        alt="Message"
                        className="rounded-lg max-w-[200px] cursor-pointer mb-1"
                        onClick={() => handleImageClick(message.image)}
                    />
                )}
                {message.text && (
                    <div className="whitespace-pre-wrap break-words">
                        {message.text}
                    </div>
                )}
                {/* ✅ Timestamp - bottom-right, small, professional */}
                <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-cream/60' : 'text-ink-soft/60'
                    }`}>
                    {message.time || ''}
                </div>
            </div>

            <ImageLightbox
                isOpen={showLightbox}
                onClose={() => {
                    setShowLightbox(false);
                    setSelectedImage(null);
                }}
                images={[selectedImage]}
                currentIndex={0}
                alt="Message image"
            />
        </>
    );
};

export default ChatBubble;