import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.scss'; // Estilos del componente
import logo from '../../assets/images/meli-logo.png'; // Importación del logo

/**
 * Componente de caja de búsqueda.
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onSubmit - Función para manejar el envío del formulario.
 * @returns {JSX.Element} Componente de caja de búsqueda.
 */
export function SearchBox(props) {

    // Estado local para el valor de búsqueda
    const [searchValue, setSearchValue] = useState('');

    /**
     * Maneja el envío del formulario.
     * @param {Object} event - Evento del formulario.
     */
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        props.onSubmit(searchValue); // Llama a la función onSubmit con el valor de búsqueda como argumento
    };

    // Renderiza el componente de caja de búsqueda
    return (
        <div className="background-banner">
            <form className="search-box-container" onSubmit={(event) => handleSubmit(event)}>
                {/* Enlace al inicio */}
                <Link to={'/'}>
                    {/* Logo de Mercado Libre */}
                    <img src={logo} alt="Logo Mercado Libre" />
                </Link>
                {/* Entrada de texto para la búsqueda */}
                <input
                    className="search-box-input"
                    type="text"
                    placeholder="Nunca dejes de buscar"
                    // Actualiza el valor de búsqueda en cada pulsación de tecla
                    onKeyUp={(e) => setSearchValue(e.target.value)}
                />
                {/* Botón de búsqueda */}
                <button type="submit" className="search-box-btn" data-testid="search-box-icon" />
            </form>
        </div>
    );
}
