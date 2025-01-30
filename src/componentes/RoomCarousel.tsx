import React, { useState, useEffect } from 'react';

const RoomCarousel: React.FC = () => {
    // Estado para almacenar el índice de la imagen actual
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array de imágenes con sus rutas y descripciones
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

    // Cambiar la imagen cada 2 segundos
    useEffect(() => {
        // Función para cambiar la imagen actual
       const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1 // Volver al inicio si se llega al final
            );
        }, 2000);
        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [images.length]);


    return (
        // Contenedor del carrusel
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