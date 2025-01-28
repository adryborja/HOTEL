import React, { useState, useEffect } from 'react';

const RoomCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

   const images = [
       {
            src: "https://i.pinimg.com/736x/5f/0a/2b/5f0a2b1614ffd855c333591799321b4e.jpg",
            alt: "Habitación Individual",
        },
        {
            src: "https://i.pinimg.com/736x/97/27/32/9727321f52cb31518107d5f84c117583.jpg",
            alt: "Habitación Individual",
        },
        {
            src: "https://i.pinimg.com/736x/95/e4/da/95e4dafc454791704b2ee4adf42460b6.jpg",
            alt: "Habitación doble",
        },
        {
            src: "https://i.pinimg.com/736x/95/e4/da/95e4dafc454791704b2ee4adf42460b6.jpg",
            alt: "Habitación Triple",
        },
        {
            src: "https://i.pinimg.com/736x/fb/c8/7d/fbc87d2f2694d842638a386cf46d07e5.jpg",
            alt: "Suite ejecutiva",
        },
        {
            src: "https://i.pinimg.com/736x/8c/38/f3/8c38f3c9fb4ac555b4e00a44b4f1238e.jpg",
            alt: "Habitación Individual",
        },
        {
            src: "https://i.pinimg.com/736x/16/0c/e8/160ce878e8c6af60565706da384d1708.jpg",
            alt: "Habitación Individual",
        },
         {
            src: "https://i.pinimg.com/736x/5a/e2/27/5ae2279d49413b8da3e37b2a89b9fdbe.jpg",
            alt: "Habitación Individual",
        },
        {
            src: "https://i.pinimg.com/736x/52/bc/b9/52bcb9c2ab726a5749dfc212110b006c.jpg",
            alt: "Habitación Individual",
        },
         {
            src: "https://i.pinimg.com/736x/9b/eb/3a/9beb3a5d01da08f64efd12995dbf0c4b.jpg",
            alt: "Habitación Individual",
        },
         
    ];

    useEffect(() => {
       const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-[800px] mx-auto">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <img
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    currentIndex === index
                                        ? 'bg-white w-4'
                                        : 'bg-white/50 hover:bg-white/75'
                                }`}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCarousel;