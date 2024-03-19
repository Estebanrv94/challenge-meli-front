import React from 'react';
import './Message.scss'; // Estilos del componente

/**
 * Componente de mensaje.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.error - Indica si el mensaje es de error o no.
 * @param {string} props.message - Contenido del mensaje.
 * @returns {JSX.Element} Componente de mensaje.
 */
export default function Message(props) {
    // Renderiza el componente de mensaje
    return (
        <div className={`message-container ${props.error ? 'error' : ''}`}>
            {/* Título del mensaje */}
            <h4 className={'message-title'}>
                {/* Icono del mensaje, mostrado según el tipo de mensaje */}
                <i className={`message-icon ${props.error ? 'error' : ''}`} />
                Lo sentimos!
            </h4>
            {/* Texto del mensaje */}
            <p className={'message-text'}>{props.message}</p>
        </div>
    );
}
