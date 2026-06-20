const ProfileGrid = ({ images }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {images.map((src, i) => (
                <div
                    key={i}
                    className="aspect-square rounded-md overflow-hidden cursor-pointer group"
                >
                    <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            ))}
        </div>
    );
};

export default ProfileGrid;