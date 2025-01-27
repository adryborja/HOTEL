import React, { useState } from "react";

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
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState<number[]>([]);
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);

    const agregarReserva = () => {
        if (!clienteId) {
            alert("Debe seleccionar un cliente");
            return;
        }

        if (habitacionesSeleccionadas.length === 0) {
            alert("Debe seleccionar al menos una habitación");
            return;
        }

        if (!fechaInicio || !fechaFin) {
            alert("Debe seleccionar las fechas de la reserva");
            return;
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        if (inicio >= fin) {
            alert("La fecha de inicio debe ser anterior a la fecha de fin");
            return;
        }

        if (editId) {
            setReservas((prevReservas) =>
                prevReservas.map((r) =>
                    r.id === editId
                        ? {
                              id: r.id,
                              clienteId: clienteId!,
                              habitaciones: habitacionesSeleccionadas,
                              fechaInicio,
                              fechaFin,
                          }
                        : r
                )
            );
            setEditId(null);
        } else {
            setReservas((prevReservas) => [
                ...prevReservas,
                {
                    id: prevReservas.length + 1,
                    clienteId: clienteId!,
                    habitaciones: habitacionesSeleccionadas,
                    fechaInicio,
                    fechaFin,
                },
            ]);
        }

        // Limpiar formulario
        setClienteId(null);
        setHabitacionesSeleccionadas([]);
        setFechaInicio("");
        setFechaFin("");
    };

    const eliminarReserva = (id: number) => {
        setReservas((prevReservas) => prevReservas.filter((r) => r.id !== id));
    };

    const iniciarEdicion = (id: number) => {
        const reserva = reservas.find((r) => r.id === id);
        if (reserva) {
            setClienteId(reserva.clienteId);
            setHabitacionesSeleccionadas(reserva.habitaciones);
            setFechaInicio(reserva.fechaInicio);
            setFechaFin(reserva.fechaFin);
            setEditId(reserva.id);
        }
    };

    return (
        <div>
            <h1>Gestión de Reservas</h1>
            <div>
                <select
                    value={clienteId || ""}
                    onChange={(e) => setClienteId(Number(e.target.value) || null)}
                >
                    <option value="">-- Seleccione un cliente --</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                        </option>
                    ))}
                </select>

                <fieldset>
                    <legend>Seleccione habitaciones</legend>
                    {habitaciones.map((habitacion) => (
                        <label key={habitacion.id}>
                            <input
                                type="checkbox"
                                value={habitacion.id}
                                checked={habitacionesSeleccionadas.includes(habitacion.id)}
                                onChange={(e) => {
                                    const id = Number(e.target.value);
                                    setHabitacionesSeleccionadas((prev) =>
                                        e.target.checked
                                            ? [...prev, id]
                                            : prev.filter((hId) => hId !== id)
                                    );
                                }}
                            />
                            {habitacion.tipo} (${habitacion.precio.toFixed(2)})
                        </label>
                    ))}
                </fieldset>

                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
                <button onClick={agregarReserva}>
                    {editId ? "Actualizar Reserva" : "Agregar Reserva"}
                </button>
            </div>

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
                                    .map((id) =>
                                        habitaciones.find((h) => h.id === id)?.tipo || ""
                                    )
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