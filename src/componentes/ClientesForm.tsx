import React, { useState, useEffect } from "react";

//Propiedades que recibe el componente ClientesForm
interface ClienteFormProps {
    agregarCliente: (nombre: string, apellido: string, correo: string) => void;
    actualizarCliente: (id: number, nombre: string, apellido: string, correo: string) => void;
    editCliente: { id: number; nombre: string; apellido: string; correo: string } | null;
    cancelarEdicion: () => void;
}

//Componente Funcional ClientesForm con sus props
const ClientesForm: React.FC<ClienteFormProps> = ({
    agregarCliente,
    actualizarCliente,
    editCliente,
    cancelarEdicion,
}) => {
    //Estados para almacenar los datos del cliente
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");

    //Actualizar los datos del cliente a editar
    useEffect(() => {
        if (editCliente) {
            //Si hay un cliente para editar, se actualizan los campos
            setNombre(editCliente.nombre);
            setApellido(editCliente.apellido);
            setCorreo(editCliente.correo);
        } else {
            //Si no hay cliente para editar, se limpian los campos
            setNombre("");
            setApellido("");
            setCorreo("");
        }
    }, [editCliente]); //Se ejecuta cuando editCliente cambia

    //Función para manejar el envío del formulario
    const manejarSubmit = () => {
        //Validar que los campos no estén vacíos
        if (!nombre.trim() ||!apellido.trim() || !correo.trim()) {
            alert("Por favor complete todos los campos");
            return;
        }

        //Validar el formato del correo
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert("El correo no tiene un formato válido");
            return;
        }

        if (editCliente) {
            //Si se está editando un cliente, se actualiza
            actualizarCliente(editCliente.id, nombre, apellido, correo);
        } else {
            //Si no se está editando, se agrega un nuevo cliente
            agregarCliente(nombre, apellido, correo);
        }

        //Limpiar los campos después de agregar o editar un cliente
        setNombre("");
        setApellido("");
        setCorreo("");
    };

    return (
        <div>
            {/* Formulario para clientes */}
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input type="text" 
                placeholder="Apellido"
                value={apellido}
                onChange={(e)=> setApellido(e.target.value)}/>
            <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            {/* Botones para agregar o editar un cliente */}
            <button onClick={manejarSubmit}>
                {editCliente ? "Actualizar Cliente" : "Agregar Cliente"}
            </button>
            {/* Botón para cancelar la edición */}
            {editCliente && <button onClick={cancelarEdicion}>Cancelar</button>}
        </div>
    );
};

export default ClientesForm;