import React, { useState } from "react";

interface Cliente {
    id: number;
    nombre: string;
    correo: string;
}

interface ClientesProps {
    clientes: Cliente[];
    setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}

const Clientes: React.FC<ClientesProps> = ({ clientes, setClientes }) => {
    const [nombre, setNombre] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);

    const agregarCliente = () => {
        if (!nombre.trim()) {
            alert("El nombre no puede estar vacío");
            return;
        }

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert("El correo no tiene un formato válido");
            return;
        }

        if (editId) {
            setClientes((prevClientes) =>
                prevClientes.map((c) =>
                    c.id === editId ? { id: c.id, nombre, correo } : c
                )
            );
            setEditId(null);
        } else {
            setClientes((prevClientes) => [
                ...prevClientes,
                { id: prevClientes.length + 1, nombre, correo },
            ]);
        }

        setNombre("");
        setCorreo("");
    };

    const eliminarCliente = (id: number) => {
        setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
    };

    const iniciarEdicion = (id: number) => {
        const cliente = clientes.find((c) => c.id === id);
        if (cliente) {
            setNombre(cliente.nombre);
            setCorreo(cliente.correo);
            setEditId(cliente.id);
        }
    };

    return (
        <div>
            <h1>Gestión de Clientes</h1>
            <div>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <button onClick={agregarCliente}>
                    {editId ? "Actualizar Cliente" : "Agregar Cliente"}
                </button>
            </div>
            <h2>Listado de Clientes</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.correo}</td>
                            <td>
                                <button onClick={() => iniciarEdicion(cliente.id)}>Editar</button>
                                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;