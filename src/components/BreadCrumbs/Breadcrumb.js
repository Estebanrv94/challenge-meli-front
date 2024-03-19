import React from 'react';
import './Breadcrumb.scss'; // Estilos del componente

/**
 * Componente de migas de pan.
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.categories - Categorías para mostrar en las migas de pan.
 * @returns {JSX.Element} Componente de migas de pan.
 */
export default function Breadcrumb(props){
    // Renderiza el componente de migas de pan
    return (
        <ul className={'breadcrumb-container'}>
            {/* Mapea las categorías para mostrar en las migas de pan */}
            {props.categories ? props.categories.map((category, idx) =>
                <li className={"breadcrumb"} key={idx}>{category}
                    {/* Renderiza un icono si no es la última categoría */}
                    {idx !== props.categories.length - 1 ? <i/> : null}
                </li>)
                : null}
        </ul>
    );
}
