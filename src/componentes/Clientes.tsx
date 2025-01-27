import React, { useState } from "react";
import ClientesForm from "./ClientesForm";

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
    const [editCliente, setEditCliente] = useState<Cliente | null>(null);

    const agregarCliente = (nombre: string, correo: string) => {
        setClientes((prevClientes) => [
            ...prevClientes,
            { id: prevClientes.length + 1, nombre, correo },
        ]);
    };

    const actualizarCliente = (id: number, nombre: string, correo: string) => {
        setClientes((prevClientes) =>
            prevClientes.map((cliente) =>
                cliente.id === id ? { id, nombre, correo } : cliente
            )
        );
        setEditCliente(null);
    };

    const eliminarCliente = (id: number) => {
        setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
    };

    const iniciarEdicion = (id: number) => {
        const cliente = clientes.find((c) => c.id === id);
        if (cliente) setEditCliente(cliente);
    };

    const cancelarEdicion = () => {
        setEditCliente(null);
    };

    return (
        <div>
            <h1>Gestión de Clientes</h1>
            <ClientesForm
                agregarCliente={agregarCliente}
                actualizarCliente={actualizarCliente}
                editCliente={editCliente}
                cancelarEdicion={cancelarEdicion}
            />
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