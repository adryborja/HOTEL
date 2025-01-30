import React, { useState } from "react";
import ClientesForm from "./ClientesForm";

//Estructura de cliente con TypeScript
interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
}

//Propiedades que recibe el componente Clientes
interface ClientesProps {
    clientes: Cliente[];
    setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}

//Componente Funcional Clientes con sus props
const Clientes: React.FC<ClientesProps> = ({ clientes, setClientes }) => {
    //Estado para almacenar el cliente a editar
    const [editCliente, setEditCliente] = useState<Cliente | null>(null);
    //Función para agregar un cliente a la lista
    const agregarCliente = (nombre: string, apellido: string, correo: string) => {
        setClientes((prevClientes) => [
            ...prevClientes,
            { id: prevClientes.length + 1, nombre, apellido, correo },
        ]);
    };

    //Función para actualizar un cliente existente en la lista
    const actualizarCliente = (id: number, nombre: string, apellido: string, correo: string) => {
        setClientes((prevClientes) =>
            prevClientes.map((cliente) =>
                cliente.id === id ? { id, nombre, apellido, correo } : cliente
            )
        );
        setEditCliente(null); //Terminar la edición
    };

    //Función para eliminar un cliente de la lista
    const eliminarCliente = (id: number) => {
        setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
    };

    //Función para iniciar la edición de un cliente
    const iniciarEdicion = (id: number) => {
        const cliente = clientes.find((c) => c.id === id);
        if (cliente) setEditCliente(cliente);
    };

    //Función para cancelar la edición de un cliente
    const cancelarEdicion = () => {
        setEditCliente(null);
    };

    return (
        <div>
            {/* Componente para agregar o editar clientes */}
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
                    {/* Iteramos sobre la lista de clientes y mostramos sus datos*/}
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{`${cliente.nombre} ${cliente.apellido}`}</td>
                            <td>{cliente.correo}</td>
                            <td>
                                {/* Botones para editar o eliminar un cliente */}
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