import React, { useState, useEffect } from "react";

// Estructura de cliente con TypeScript
interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
}

// Estructura de habitación con TypeScript
interface Habitacion {
    id: number;
    tipo: string;
    precio: number;
}

// Estructura de reserva con TypeScript
interface Reserva {
    id: number;
    clienteId: number;
    habitaciones: number[];
    fechaInicio: string;
    fechaFin: string;
}

// Propiedades que recibe el componente ReservasForm
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
    // Estados para almacenar los datos de la reserva
    const [clienteId, setClienteId] = useState<number | null>(null);
    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState<number[]>([]);
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");

    // Fecha mínima: día actual
    const fechaMinimaString = new Date().toISOString().split("T")[0]; // Convertir a formato YYYY-MM-DD

    // Actualizar los datos de la reserva a editar
    useEffect(() => {
        if (editReserva) {
            // Si hay una reserva para editar, se actualizan los campos
            setClienteId(editReserva.clienteId);
            setHabitacionesSeleccionadas(editReserva.habitaciones);
            setFechaInicio(editReserva.fechaInicio);
            setFechaFin(editReserva.fechaFin);
        } else {
            // Si no hay reserva para editar, se limpian los campos
            setClienteId(null);
            setHabitacionesSeleccionadas([]);
            setFechaInicio("");
            setFechaFin("");
        }
    }, [editReserva]); // Se ejecuta cuando editReserva cambia

    // Función para manejar el envío del formulario
    const manejarSubmit = () => {
        // Validar que los campos no estén vacíos
        if (!clienteId || habitacionesSeleccionadas.length === 0 || !fechaInicio || !fechaFin) {
            alert("Por favor complete todos los campos");
            return;
        }
        // Validar que la fecha de inicio sea anterior a la fecha de fin
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Eliminar horario para comparar solo la fecha

        // Validar que la fecha de inicio y fin no sean anteriores al día actual
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

        // Validar que las habitaciones no estén reservadas en las fechas seleccionadas
        for (const habitacionId of habitacionesSeleccionadas) {
            const conflictos = reservas.filter(
                (reserva) =>
                    reserva.id !== editReserva?.id && // No comparar con la reserva actual si se está editando
                    reserva.habitaciones.includes(habitacionId) && // La habitación está en la reserva
                    ((inicio >= new Date(reserva.fechaInicio) && inicio < new Date(reserva.fechaFin)) || // Fecha de inicio en reserva
                        (fin > new Date(reserva.fechaInicio) && fin <= new Date(reserva.fechaFin)) || // Fecha de fin en reserva
                        (inicio <= new Date(reserva.fechaInicio) && fin >= new Date(reserva.fechaFin))) // Reserva dentro del rango
            );
            // Si hay conflictos, mostrar un mensaje y no permitir la reserva
            if (conflictos.length > 0) {
                alert(`La habitación con ID ${habitacionId} ya está reservada en las fechas seleccionadas.`);
                return;
            }
        }
        // Si se está editando una reserva, se actualiza
        if (editReserva) {
            actualizarReserva(editReserva.id, clienteId!, habitacionesSeleccionadas, fechaInicio, fechaFin);
        } else {
            // Si no se está editando, se agrega una nueva reserva
            agregarReserva(clienteId!, habitacionesSeleccionadas, fechaInicio, fechaFin);
        }
    };

    return (
        <div>
            {/* Formulario para reservas */}
            <select value={clienteId || ""} onChange={(e) => setClienteId(Number(e.target.value) || null)}>
                <option value="">-- Seleccione un cliente --</option>
                {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                        {`${cliente.nombre} ${cliente.apellido}`}
                    </option>
                ))}
            </select>

            <fieldset>
                <legend>Seleccione habitaciones</legend>
                 {/* Mapeo de las habitaciones para mostrarlas en la lista */}
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

            {/* Campos para la fecha de inicio y fin */}
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
            
            {/* Botones para enviar el formulario y cancelar la edición */}
            <button onClick={manejarSubmit}>{editReserva ? "Actualizar Reserva" : "Agregar Reserva"}</button>
            {editReserva && <button onClick={cancelarEdicion}>Cancelar</button>}
        </div>
    );
};

export default ReservasForm;