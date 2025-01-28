import React, { useState } from "react";
import HabitacionesForm from "./HabitacionesForm";
import RoomCarousel from "./RoomCarousel";

interface Habitacion {
    id: number;
    tipo: string;
    precio: number;
}

interface HabitacionesProps {
    habitaciones: Habitacion[];
    setHabitaciones: React.Dispatch<React.SetStateAction<Habitacion[]>>;
}

const Habitaciones: React.FC<HabitacionesProps> = ({ habitaciones, setHabitaciones }) => {
    const [editHabitacion, setEditHabitacion] = useState<Habitacion | null>(null);

    const agregarHabitacion = (tipo: string, precio: number) => {
        setHabitaciones((prev) => [
            ...prev,
            { id: prev.length + 1, tipo, precio },
        ]);
    };

    const actualizarHabitacion = (id: number, tipo: string, precio: number) => {
        setHabitaciones((prev) =>
            prev.map((h) => (h.id === id ? { id, tipo, precio } : h))
        );
        setEditHabitacion(null);
    };

    const eliminarHabitacion = (id: number) => {
        setHabitaciones((prev) => prev.filter((h) => h.id !== id));
    };

    const iniciarEdicion = (id: number) => {
        const habitacion = habitaciones.find((h) => h.id === id);
        if (habitacion) setEditHabitacion(habitacion);
    };

    const cancelarEdicion = () => {
        setEditHabitacion(null);
    };

    return (
        <div className="habitaciones-container">
           
            <h1 className="text-xl font-bold mt-6">Gestión de Habitaciones</h1>
            <section className="hero-section">
            <RoomCarousel />
            </section>
            <HabitacionesForm
                agregarHabitacion={agregarHabitacion}
                actualizarHabitacion={actualizarHabitacion}
                editHabitacion={editHabitacion}
                cancelarEdicion={cancelarEdicion}
                
            />
          
            <h2 className="text-lg font-semibold mt-4">Listado de Habitaciones</h2>
            <table border={1} className="w-full mt-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {habitaciones.map((habitacion) => (
                        <tr key={habitacion.id}>
                            <td>{habitacion.id}</td>
                            <td>{habitacion.tipo}</td>
                            <td>${habitacion.precio.toFixed(2)}</td>
                            <td>
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
