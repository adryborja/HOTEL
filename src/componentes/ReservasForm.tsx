import React, { useState, useEffect } from "react";

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

interface ReservasFormProps {
    agregarReserva: (clienteId: number, habitaciones: number[], fechaInicio: string, fechaFin: string) => void;
    actualizarReserva: (id: number, clienteId: number, habitaciones: number[], fechaInicio: string, fechaFin: string) => void;
    editReserva: Reserva | null;
    cancelarEdicion: () => void;
    clientes: Cliente[];
    habitaciones: Habitacion[];
    reservas: Reserva[];
}

const ReservasForm: React.FC<ReservasFormProps> = ({
    agregarReserva,
    actualizarReserva,
    editReserva,
    cancelarEdicion,
    clientes,
    habitaciones,
    reservas,
}) => {
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState<number[]>([]);
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");

    // Fecha mínima: día actual
    const fechaMinimaString = new Date().toISOString().split("T")[0]; // Convertir a formato YYYY-MM-DD

    useEffect(() => {
        if (editReserva) {
            setClienteId(editReserva.clienteId);
            setHabitacionesSeleccionadas(editReserva.habitaciones);
            setFechaInicio(editReserva.fechaInicio);
            setFechaFin(editReserva.fechaFin);
        } else {
            setClienteId(null);
            setHabitacionesSeleccionadas([]);
            setFechaInicio("");
            setFechaFin("");
        }
    }, [editReserva]);

    const manejarSubmit = () => {
        if (!clienteId || habitacionesSeleccionadas.length === 0 || !fechaInicio || !fechaFin) {
            alert("Por favor complete todos los campos");
            return;
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Eliminar horario para comparar solo la fecha

        if (inicio < hoy) {
            alert("La fecha de inicio no puede ser anterior al día actual.");
            return;
        }

        if (fin < hoy) {
            alert("La fecha de fin no puede ser anterior al día actual.");
            return;
        }

        if (inicio >= fin) {
            alert("La fecha de inicio debe ser anterior a la fecha de fin.");
            return;
        }

        for (const habitacionId of habitacionesSeleccionadas) {
            const conflictos = reservas.filter(
                (reserva) =>
                    reserva.habitaciones.includes(habitacionId) &&
                    ((inicio >= new Date(reserva.fechaInicio) && inicio < new Date(reserva.fechaFin)) ||
                        (fin > new Date(reserva.fechaInicio) && fin <= new Date(reserva.fechaFin)) ||
                        (inicio <= new Date(reserva.fechaInicio) && fin >= new Date(reserva.fechaFin)))
            );

            if (conflictos.length > 0) {
                alert(`La habitación con ID ${habitacionId} ya está reservada en las fechas seleccionadas.`);
                return;
            }
        }

        if (editReserva) {
            actualizarReserva(editReserva.id, clienteId!, habitacionesSeleccionadas, fechaInicio, fechaFin);
        } else {
            agregarReserva(clienteId!, habitacionesSeleccionadas, fechaInicio, fechaFin);
        }
    };

    return (
        <div>
            <select value={clienteId || ""} onChange={(e) => setClienteId(Number(e.target.value) || null)}>
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
                                    e.target.checked ? [...prev, id] : prev.filter((hId) => hId !== id)
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
                min={fechaMinimaString} // Establecer la fecha mínima como hoy
            />
            <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                min={fechaMinimaString} // Establecer la fecha mínima como hoy
            />
            <button onClick={manejarSubmit}>{editReserva ? "Actualizar Reserva" : "Agregar Reserva"}</button>
            {editReserva && <button onClick={cancelarEdicion}>Cancelar</button>}
        </div>
    );
};

export default ReservasForm;