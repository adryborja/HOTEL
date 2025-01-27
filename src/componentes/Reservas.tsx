import React, { useState } from "react";
import ReservasForm from "./ReservasForm";

interface Cliente {
    id: number;
    nombre: string;
}

interface Habitacion {
    id: number;
    tipo: string;
    precio: number;
}

interface Reserva {
    id: number;
    clienteId: number;
    habitaciones: number[];
    fechaInicio: string;
    fechaFin: string;
}

interface ReservasProps {
    reservas: Reserva[];
    setReservas: React.Dispatch<React.SetStateAction<Reserva[]>>;
    clientes: Cliente[];
    habitaciones: Habitacion[];
}

const Reservas: React.FC<ReservasProps> = ({ reservas, setReservas, clientes, habitaciones }) => {
    const [editReserva, setEditReserva] = useState<Reserva | null>(null);

    const agregarReserva = (clienteId: number, habitacionesSeleccionadas: number[], fechaInicio: string, fechaFin: string) => {
        setReservas((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                clienteId,
                habitaciones: habitacionesSeleccionadas,
                fechaInicio,
                fechaFin,
            },
        ]);
    };

    const actualizarReserva = (id: number, clienteId: number, habitacionesSeleccionadas: number[], fechaInicio: string, fechaFin: string) => {
        setReservas((prev) =>
            prev.map((reserva) =>
                reserva.id === id
                    ? { id, clienteId, habitaciones: habitacionesSeleccionadas, fechaInicio, fechaFin }
                    : reserva
            )
        );
        setEditReserva(null);
    };

    const eliminarReserva = (id: number) => {
        setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
    };

    const iniciarEdicion = (id: number) => {
        const reserva = reservas.find((r) => r.id === id);
        if (reserva) setEditReserva(reserva);
    };

    const cancelarEdicion = () => {
        setEditReserva(null);
    };

    return (
        <div>
            <h1>Gestión de Reservas</h1>
            <ReservasForm
                agregarReserva={agregarReserva}
                actualizarReserva={actualizarReserva}
                editReserva={editReserva}
                cancelarEdicion={cancelarEdicion}
                clientes={clientes}
                habitaciones={habitaciones}
                reservas={reservas}
            />
            <h2>Listado de Reservas</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Habitaciones</th>
                        <th>Fechas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{clientes.find((c) => c.id === reserva.clienteId)?.nombre}</td>
                            <td>
                                {reserva.habitaciones
                                    .map((id) => habitaciones.find((h) => h.id === id)?.tipo || "")
                                    .join(", ")}
                            </td>
                            <td>
                                {reserva.fechaInicio} - {reserva.fechaFin}
                            </td>
                            <td>
                                <button onClick={() => iniciarEdicion(reserva.id)}>Editar</button>
                                <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservas;