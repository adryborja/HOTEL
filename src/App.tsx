import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./componentes/NavBar";
import Inicio from "./componentes/Inicio";
import Clientes from "./componentes/Clientes";
import Habitaciones from "./componentes/Habitaciones";
import Reservas from "./componentes/Reservas";

interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
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

const App: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>(() => {
        const storedClientes = localStorage.getItem("clientes");
        return storedClientes ? JSON.parse(storedClientes) : [];
    });

    const [habitaciones, setHabitaciones] = useState<Habitacion[]>(() => {
        const storedHabitaciones = localStorage.getItem("habitaciones");
        return storedHabitaciones ? JSON.parse(storedHabitaciones) : [];
    });

    const [reservas, setReservas] = useState<Reserva[]>(() => {
        const storedReservas = localStorage.getItem("reservas");
        return storedReservas ? JSON.parse(storedReservas) : [];
    });

    useEffect(() => {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }, [clientes]);

    useEffect(() => {
        localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
    }, [habitaciones]);

    useEffect(() => {
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }, [reservas]);

    return (
        <Router>
            <NavBar />
            <div className="container">
                <Routes>
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