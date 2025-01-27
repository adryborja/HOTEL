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
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [reservas, setReservas] = useState<Reserva[]>([]);

    // Cargar datos desde localStorage al iniciar
    useEffect(() => {
        const storedClientes = localStorage.getItem("clientes");
        if (storedClientes) {
            setClientes(JSON.parse(storedClientes));
        }

        const storedHabitaciones = localStorage.getItem("habitaciones");
        if (storedHabitaciones) {
            setHabitaciones(JSON.parse(storedHabitaciones));
        }

        const storedReservas = localStorage.getItem("reservas");
        if (storedReservas) {
            setReservas(JSON.parse(storedReservas));
        }
    }, []);

    // Guardar datos en localStorage cuando cambien los clientes
    useEffect(() => {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }, [clientes]);

    // Guardar datos en localStorage cuando cambien las habitaciones
    useEffect(() => {
        localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
    }, [habitaciones]);

    // Guardar datos en localStorage cuando cambien las reservas
    useEffect(() => {
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }, [reservas]);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route
                    path="/clientes"
                    element={
                        <Clientes
                            clientes={clientes}
                            setClientes={setClientes}
                        />
                    }
                />
                <Route
                    path="/habitaciones"
                    element={
                        <Habitaciones
                            habitaciones={habitaciones}
                            setHabitaciones={setHabitaciones}
                        />
                    }
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
        </Router>
    );
};

export default App;