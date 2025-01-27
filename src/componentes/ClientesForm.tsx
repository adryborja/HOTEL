import React, { useState, useEffect } from "react";

interface ClienteFormProps {
    agregarCliente: (nombre: string, apellido: string, correo: string) => void;
    actualizarCliente: (id: number, nombre: string, apellido: string, correo: string) => void;
    editCliente: { id: number; nombre: string; apellido: string; correo: string } | null;
    cancelarEdicion: () => void;
}

const ClientesForm: React.FC<ClienteFormProps> = ({
    agregarCliente,
    actualizarCliente,
    editCliente,
    cancelarEdicion,
}) => {
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");

    useEffect(() => {
        if (editCliente) {
            setNombre(editCliente.nombre);
            setApellido(editCliente.apellido);
            setCorreo(editCliente.correo);
        } else {
            setNombre("");
            setApellido("");
            setCorreo("");
        }
    }, [editCliente]);

    const manejarSubmit = () => {
        if (!nombre.trim() ||!apellido.trim() || !correo.trim()) {
            alert("Por favor complete todos los campos");
            return;
        }

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert("El correo no tiene un formato válido");
            return;
        }

        if (editCliente) {
            actualizarCliente(editCliente.id, nombre, apellido, correo);
        } else {
            agregarCliente(nombre, apellido, correo);
        }

        setNombre("");
        setApellido("");
        setCorreo("");
    };

    return (
        <div>
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
            <button onClick={manejarSubmit}>
                {editCliente ? "Actualizar Cliente" : "Agregar Cliente"}
            </button>
            {editCliente && <button onClick={cancelarEdicion}>Cancelar</button>}
        </div>
    );
};

export default ClientesForm;