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
            alt: "Habitación Doble",
        },
        {
            src: "https://i.pinimg.com/736x/95/e4/da/95e4dafc454791704b2ee4adf42460b6.jpg",
            alt: "Habitación Triple",
        },
        {
            src: "https://i.pinimg.com/736x/95/e4/da/95e4dafc454791704b2ee4adf42460b6.jpg",
            alt: "Habitación Siute",
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
                
                     
                
            </div>
        </div>
    );
};

export default RoomCarousel;