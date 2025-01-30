import React, { useState } from "react";
import HabitacionesForm from "./HabitacionesForm"; //Importar componente HabitacionesForm
import RoomCarousel from "./RoomCarousel"; //Importar componente RoomCarousel

//Estructura de habitación con TypeScript
interface Habitacion {
    id: number;
    tipo: string;
    precio: number;
}
//Propiedades que recibe el componente Habitaciones
interface HabitacionesProps {
    habitaciones: Habitacion[];
    setHabitaciones: React.Dispatch<React.SetStateAction<Habitacion[]>>;
}

//Componente Funcional Habitaciones con sus props
const Habitaciones: React.FC<HabitacionesProps> = ({ habitaciones, setHabitaciones }) => {
    //Estado para almacenar la habitación a editar
    const [editHabitacion, setEditHabitacion] = useState<Habitacion | null>(null);

    //Función para agregar una habitación a la lista
    const agregarHabitacion = (tipo: string, precio: number) => {
        setHabitaciones((prev) => [
            ...prev, //Se mantiene el estado anterior
            { id: prev.length + 1, tipo, precio }, //Se agrega la nueva habitación con un ID único
        ]);
    };

    //Función para actualizar una habitación existente en la lista
    const actualizarHabitacion = (id: number, tipo: string, precio: number) => {
        setHabitaciones((prev) =>
            prev.map((h) => (h.id === id ? { id, tipo, precio } : h)) //Se actualiza la habitación con el ID correspondiente
        );
        setEditHabitacion(null); //Terminar la edición
    };

    //Función para eliminar una habitación de la lista según su ID
    const eliminarHabitacion = (id: number) => {
        setHabitaciones((prev) => prev.filter((h) => h.id !== id)); //Se filtran las habitaciones que no coincidan con el ID
    };

    //Función para iniciar la edición de una habitación
    const iniciarEdicion = (id: number) => {
        const habitacion = habitaciones.find((h) => h.id === id); //Buscar la habitación por ID
        if (habitacion) setEditHabitacion(habitacion); //Si se encuentra, se inicia la edición
    };

    //Función para cancelar la edición de una habitación
    const cancelarEdicion = () => {
        setEditHabitacion(null);
    };

    return (
        <div className="habitaciones-container">
           
            <h1 className="text-xl font-bold mt-6">Gestión de Habitaciones</h1>
            {/* Sección del carrusel de imágenes */}
            <section className="hero-section">
            <RoomCarousel />
            </section>
            {/* Componente para agregar o editar habitaciones */}
            <HabitacionesForm
                agregarHabitacion={agregarHabitacion}
                actualizarHabitacion={actualizarHabitacion}
                editHabitacion={editHabitacion}
                cancelarEdicion={cancelarEdicion}
                
            />
            {/* Listado de habitaciones */}
            <h2 className="text-lg font-semibold mt-4">Listado de Habitaciones</h2>
            <table border={1} className="w-full mt-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Precio por noche</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeo de las habitaciones para mostrarlas en la tabla */}
                    {habitaciones.map((habitacion) => (
                        <tr key={habitacion.id}>
                            <td>{habitacion.id}</td>
                            <td>{habitacion.tipo}</td>
                            <td>${habitacion.precio.toFixed(2)}</td>
                            <td>
                                {/* Botones para editar y eliminar habitaciones */}
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => iniciarEdicion(habitacion.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => eliminarHabitacion(habitacion.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Habitaciones;
