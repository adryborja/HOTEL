import React, { useState, useEffect } from 'react';

const RoomCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

   const images = [
       {
            src: "imagenes/Habitación Simple.jpeg",
            alt: "Habitación Simple",
        },
        {
            src: "imagenes/Habitación Doble.jpeg",
            alt: "Habitación Doble",
        },
        {
            src: "imagenes/Habitación Triple.jpeg",
            alt: "Habitación Triple",
        },
        {
            src: "imagenes/Suite.jpeg",
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