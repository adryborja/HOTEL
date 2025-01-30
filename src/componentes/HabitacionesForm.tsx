import React, { useState, useEffect } from "react";

//Propiedades que recibe el componente HabitacionForm
interface HabitacionFormProps {
    agregarHabitacion: (tipo: string, precio: number) => void;
    actualizarHabitacion: (id: number, tipo: string, precio: number) => void;
    editHabitacion: { id: number; tipo: string; precio: number } | null;
    cancelarEdicion: () => void;
}
//Componente Funcional HabitacionForm con sus props
const HabitacionesForm: React.FC<HabitacionFormProps> = ({
    agregarHabitacion,
    actualizarHabitacion,
    editHabitacion,
    cancelarEdicion,
}) => {
    //Estados para almacenar los datos de la habitación
    const [tipo, setTipo] = useState<string>("");
    //Estado para almacenar el precio de la habitación (como string)
    const [precio, setPrecio] = useState<string>("");

    //Actualizar los datos de la habitación a editar
    useEffect(() => {
        if (editHabitacion) {
            //Si hay una habitación para editar, se actualizan los campos
            setTipo(editHabitacion.tipo);
            setPrecio(editHabitacion.precio.toString());
        } else {
            //Si no hay habitación para editar, se limpian los campos
            setTipo("");
            setPrecio("");
        }
    }, [editHabitacion]); //Se ejecuta cuando editHabitacion cambia

    //Función para manejar el envío del formulario
    const manejarSubmit = () => {
        //Validar que los campos no estén vacíos
        if (!tipo.trim() || !precio.trim()) {
            alert("Por favor complete todos los campos");
            return;
        }
        //Validar que el precio sea un número positivo
        const precioNumber = parseFloat(precio);
        if (isNaN(precioNumber) || precioNumber <= 0) {
            alert("El precio debe ser un número positivo");
            return;
        }

        //Si se está editando una habitación, se actualiza
        if (editHabitacion) {
            actualizarHabitacion(editHabitacion.id, tipo, precioNumber);
        } else {
            //Si no se está editando, se agrega una nueva habitación
            agregarHabitacion(tipo, precioNumber);
        }

        //Limpiar los campos después de agregar o editar una habitación
        setTipo("");
        setPrecio("");
    };


    return (
        <div>
           {/* Formulario para habitaciones */}
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
            {/* Botones para agregar o actualizar habitaciones */}
            <button onClick={manejarSubmit}>
                {editHabitacion ? "Actualizar Habitación" : "Agregar Habitación"}
            </button>
            {/* Botón para cancelar la edición */}
            {editHabitacion && <button onClick={cancelarEdicion}>Cancelar</button>}
        </div>
    );
};

export default HabitacionesForm;