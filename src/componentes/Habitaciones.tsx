import React, { useState } from "react";

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
    const [tipo, setTipo] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);

    const agregarHabitacion = () => {
        if (!tipo.trim()) {
            alert("El tipo de habitación no puede estar vacío");
            return;
        }

        const precioNumber = parseFloat(precio);
        if (isNaN(precioNumber) || precioNumber <= 0) {
            alert("El precio debe ser un número positivo");
            return;
        }

        if (editId) {
            setHabitaciones((prevHabitaciones) =>
                prevHabitaciones.map((h) =>
                    h.id === editId ? { id: h.id, tipo, precio: precioNumber } : h
                )
            );
            setEditId(null);
        } else {
            setHabitaciones((prevHabitaciones) => [
                ...prevHabitaciones,
                { id: prevHabitaciones.length + 1, tipo, precio: precioNumber },
            ]);
        }

        setTipo("");
        setPrecio("");
    };

    const eliminarHabitacion = (id: number) => {
        setHabitaciones((prevHabitaciones) => prevHabitaciones.filter((h) => h.id !== id));
    };

    const iniciarEdicion = (id: number) => {
        const habitacion = habitaciones.find((h) => h.id === id);
        if (habitacion) {
            setTipo(habitacion.tipo);
            setPrecio(habitacion.precio.toString());
            setEditId(habitacion.id);
        }
    };

    return (
        <div>
            <h1>Gestión de Habitaciones</h1>
            <div>
                <input
                    type="text"
                    placeholder="Tipo de habitación (individual, doble, suite, etc.)"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Precio por noche"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <button onClick={agregarHabitacion}>
                    {editId ? "Actualizar Habitación" : "Agregar Habitación"}
                </button>
            </div>
            <h2>Listado de Habitaciones</h2>
            <table border={1}>
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
                                <button onClick={() => iniciarEdicion(habitacion.id)}>Editar</button>
                                <button onClick={() => eliminarHabitacion(habitacion.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Habitaciones;