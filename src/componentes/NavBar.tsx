import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

//Componente Funcional NavBar
const NavBar: React.FC = () => {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/habitaciones">Habitaciones</Link>
            <Link to="/reservas">Reservas</Link>
        </nav>
    );
};

//Exportar el componente NavBar
export default NavBar;