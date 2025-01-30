import React, { useState, useEffect } from "react";

interface HabitacionFormProps {
    agregarHabitacion: (tipo: string, precio: number) => void;
    actualizarHabitacion: (id: number, tipo: string, precio: number) => void;
    editHabitacion: { id: number; tipo: string; precio: number } | null;
    cancelarEdicion: () => void;
}

const HabitacionesForm: React.FC<HabitacionFormProps> = ({
    agregarHabitacion,
    actualizarHabitacion,
    editHabitacion,
    cancelarEdicion,
}) => {
    const [tipo, setTipo] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");

    useEffect(() => {
        if (editHabitacion) {
            setTipo(editHabitacion.tipo);
            setPrecio(editHabitacion.precio.toString());
        } else {
            setTipo("");
            setPrecio("");
        }
    }, [editHabitacion]);

    const manejarSubmit = () => {
        if (!tipo.trim() || !precio.trim()) {
            alert("Por favor complete todos los campos");
            return;
        }

        const precioNumber = parseFloat(precio);
        if (isNaN(precioNumber) || precioNumber <= 0) {
            alert("El precio debe ser un número positivo");
            return;
        }

        if (editHabitacion) {
            actualizarHabitacion(editHabitacion.id, tipo, precioNumber);
        } else {
            agregarHabitacion(tipo, precioNumber);
        }

        setTipo("");
        setPrecio("");
    };

    return (
        <div>
           
            <select name="" id="" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                 <option value={0}>-- Tipo de habitación --</option>
                <option value="Simple">Simple</option>
                <option value="Doble">Doble</option>
                <option value="Triple">Triple</option>
                <option value="Suite">Suite</option>
            </select>
            <input
                type="text"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />
            <button onClick={manejarSubmit}>
                {editHabitacion ? "Actualizar Habitación" : "Agregar Habitación"}
            </button>
            {editHabitacion && <button onClick={cancelarEdicion}>Cancelar</button>}
        </div>
    );
};

export default HabitacionesForm;