import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./componentes/NavBar";
import Inicio from "./componentes/Inicio";
import Clientes from "./componentes/Clientes";
import Habitaciones from "./componentes/Habitaciones";
import Reservas from "./componentes/Reservas";

// Estructura de cliente con TypeScript
interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
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

const App: React.FC = () => {
    // Estados para almacenar los datos de clientes, habitaciones y reservas
    const [clientes, setClientes] = useState<Cliente[]>(() => {
        const storedClientes = localStorage.getItem("clientes");
        return storedClientes ? JSON.parse(storedClientes) : [];
    });

    // Estados para almacenar los datos de clientes, habitaciones y reservas
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>(() => {
        const storedHabitaciones = localStorage.getItem("habitaciones");
        return storedHabitaciones ? JSON.parse(storedHabitaciones) : [];
    });
    //Recuperar las reservas almacenadas en el LocalStorage
    const [reservas, setReservas] = useState<Reserva[]>(() => {
        const storedReservas = localStorage.getItem("reservas");
        return storedReservas ? JSON.parse(storedReservas) : [];
    });

    //Guardar los clientes en el LocalStorage
    useEffect(() => {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }, [clientes]);

    //Guardar las habitaciones en el LocalStorage
    useEffect(() => {
        localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
    }, [habitaciones]);

    //Guardar las reservas en el LocalStorage
    useEffect(() => {
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }, [reservas]);

    return (
        <Router> {/* Iniciamos el Router para la navegación */}
            <NavBar /> {/* Renderizamos la barra de navegación */}
            <div className="container">
                <Routes>
                    {/* Definimos las rutas para cada componente */}
                    <Route path="/" element={<Inicio />} />
                    <Route 
                        path="/clientes" 
                        element={<Clientes clientes={clientes} setClientes={setClientes} />} 
                    />
                    <Route 
                        path="/habitaciones" 
                        element={<Habitaciones habitaciones={habitaciones} setHabitaciones={setHabitaciones} />} 
                    />
                    <Route 
                        path="/reservas" 
                        element={
                            <Reservas 
                                reservas={reservas} 
                                setReservas={setReservas}
                                clientes={clientes}
                                habitaciones={habitaciones}
                            />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;