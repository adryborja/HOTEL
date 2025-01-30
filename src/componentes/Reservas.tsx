import React, { useState } from "react";
import ReservasForm from "./ReservasForm";

//Estructura de cliente con TypeScript
interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
}

//Estructura de habitación con TypeScript
interface Habitacion {
    id: number;
    tipo: string;
    precio: number;
}

//Estructura de reserva con TypeScript
interface Reserva {
    id: number;
    clienteId: number;
    habitaciones: number[];
    fechaInicio: string;
    fechaFin: string;
}

//Propiedades que recibe el componente Reservas
interface ReservasProps {
    reservas: Reserva[];
    setReservas: React.Dispatch<React.SetStateAction<Reserva[]>>;
    clientes: Cliente[];
    habitaciones: Habitacion[];
}
//Componente Funcional Reservas con sus props
const Reservas: React.FC<ReservasProps> = ({ reservas, setReservas, clientes, habitaciones }) => {
    //Estado para almacenar la reserva a editar
    const [editReserva, setEditReserva] = useState<Reserva | null>(null);
    //Función para agregar una reserva a la lista
    const agregarReserva = (clienteId: number, habitacionesSeleccionadas: number[], fechaInicio: string, fechaFin: string) => {
        setReservas((prev) => [
            ...prev,
            {
                id: prev.length + 1, //Se asigna un ID único
                clienteId,
                habitaciones: habitacionesSeleccionadas,
                fechaInicio,
                fechaFin,
            },
        ]);
    };
    //Función para actualizar una reserva existente en la lista
    const actualizarReserva = (id: number, clienteId: number, habitacionesSeleccionadas: number[], fechaInicio: string, fechaFin: string) => {
        setReservas((prev) =>
            prev.map((reserva) =>
                reserva.id === id
                    ? { id, clienteId, habitaciones: habitacionesSeleccionadas, fechaInicio, fechaFin }
                    : reserva
            )
        );
        setEditReserva(null); //Terminar la edición
    };

    //Función para eliminar una reserva de la lista
    const eliminarReserva = (id: number) => {
        setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
    };

    //Función para iniciar la edición de una reserva
    const iniciarEdicion = (id: number) => {
        const reserva = reservas.find((r) => r.id === id);
        if (reserva) setEditReserva(reserva);
    };
    //Función para cancelar la edición de una reserva
    const cancelarEdicion = () => {
        setEditReserva(null);
    };

    return (
        <div>
            <h1>Gestión de Reservas</h1>
            {/* Formulario de reservas */}
            <ReservasForm
                agregarReserva={agregarReserva}
                actualizarReserva={actualizarReserva}
                editReserva={editReserva}
                cancelarEdicion={cancelarEdicion}
                clientes={clientes}
                habitaciones={habitaciones}
                reservas={reservas}
            />
            {/* Tabla con el listado de reservas */}
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
                            <td>
                            {/* Mostrar el nombre y apellido del cliente, busca el cliente por su ID*/}
                            {`${clientes.find((c) => c.id === reserva.clienteId)?.nombre || ""} ${
                            clientes.find((c) => c.id === reserva.clienteId)?.apellido || ""
                            }`.trim()}
                            
                            </td>
                            <td>
                                {/* Mostrar los tipos de habitaciones reservadas, busca las habitaciones por su ID*/}
                                {reserva.habitaciones
                                    .map((id) => habitaciones.find((h) => h.id === id)?.tipo || "")
                                    .join(", ")}
                            </td>
                            <td>
                                {reserva.fechaInicio} - {reserva.fechaFin}
                            </td>
                            <td>
                                {/* Botones para editar y eliminar reservas */}
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