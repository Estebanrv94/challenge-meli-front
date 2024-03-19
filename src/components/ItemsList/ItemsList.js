import React from "react";
import "./ItemsList.scss"; // Estilos del componente
import Item from "./Item/Item"; // Componente de artículo individual
import Breadcrumb from "../BreadCrumbs/Breadcrumb"; // Componente de migas de pan

/**
 * Componente de lista de elementos.
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.categories - Categorías de los elementos.
 * @param {Array} props.items - Lista de elementos a mostrar.
 * @returns {JSX.Element} Componente de lista de elementos.
 */
export default function ItemsList(props) {
  // Renderiza el componente de lista de elementos
  return (
    <div className={"items-list-container"}>
      {/* Componente de migas de pan */}
      <Breadcrumb categories={props.categories} />
      {/* Muestra los primeros 4 elementos */}
      {props.items.slice(0, 4).map((item, idx) => (
        <Item key={idx} info={item} categories={props.categories} />
      ))}
    </div>
  );
}
