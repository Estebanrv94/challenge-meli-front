import React from "react";
import { Link } from "react-router-dom";
import "./Item.scss"; // Estilos del componente
import * as utils from "../../../utils"; // Utilidades para el formato de precios

/**
 * Componente de elemento individual en la lista.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.info - Información del elemento.
 * @param {Array} props.categories - Categorías de los elementos.
 * @returns {JSX.Element} Componente de elemento individual.
 */
export default function Item({ info, categories }) {
  // Renderiza el componente de elemento individual
  return (
    <div className={"item-container"}>
      <div className={"item-info"} id={info.id}>
        {/* Enlace al detalle del elemento */}
        <Link
          to={{
            pathname: `/items/${info.id}`,
            itemInfo: info,
            categories: categories,
          }}
        >
          {/* Imagen del elemento */}
          <img src={info.picture} alt={info.title} />
        </Link>
        <div className={"item-general-info"}>
          {/* Precio del elemento */}
          <p className={"item-price"}>
            {utils.formatPrice(info.price)} {/* Formato del precio */}
            {/* Renderiza los decimales del precio, si existen */}
            {info.price.decimals ? (
              <span className={"item-price-decimals"}>
                {info.price.decimals}
              </span>
            ) : null}
          </p>
          {/* Icono de envío gratuito si corresponde */}
          {info.free_shipping ? (
            <i className={"item-price-free-shipping"} />
          ) : null}
          {/* Enlace al detalle del elemento */}
          <Link
            className={"item-title"}
            to={{
              pathname: `/items/${info.id}`,
              itemInfo: info,
              categories: categories,
            }}
          >
            {/* Título del elemento */}
            <p>{info.title}</p>
          </Link>
        </div>
        {/* Ubicación del vendedor */}
        <div className={"item-location"}>
          <p>{info.city_seller}</p>
        </div>
      </div>
    </div>
  );
}
