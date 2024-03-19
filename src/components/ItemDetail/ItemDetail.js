import React, { useState, useEffect } from "react";
import "./ItemDetail.scss"; // Estilos del componente
import * as utils from "../../utils"; // Utilidades para el formato de precios
import Message from "../Message/Message"; // Componente de mensaje
import Loader from "../Loader/Loader"; // Componente de carga
import Breadcrumb from "../BreadCrumbs/Breadcrumb"; // Componente de migas de pan

import { useGlobalState } from "../../App"; // Importa el hook useGlobalState desde App.js

/**
 * Componente de detalle de artículo.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.match - Información de la ruta.
 * @param {Object} props.match.params - Parámetros de la ruta.
 * @param {string} props.match.params.id - ID del artículo.
 * @returns {JSX.Element} Componente de detalle de artículo.
 */
export default function ItemDetail(props) {
  const id = props.match.params.id; // ID del artículo
  const [itemInfo, setItemInfo] = useState({}); // Estado para almacenar la información del artículo
  const [errorMsg, showErrorMsg] = useState({ error: false, text: "" }); // Estado para mostrar mensajes de error

  // Usa el hook useGlobalState para acceder al estado global
  const { results } = useGlobalState();

  // Efecto para obtener la información del artículo
  useEffect(() => {
    fetch(`http://localhost:8080/api/items/${id}`, {
      headers: {
        name: "Esteban",
        lastname: "Restrepo",
        // Otros encabezados...
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          let text;
          switch (response.status) {
            case 404:
              text = "El artículo consultado no existe.";
              break;
            case 500:
              text =
                "No se encontraron resultados para el producto buscado.";
              break;
            default:
              text = "Algo salió mal. Intenta nuevamente";
              break;
          }
          showErrorMsg({ error: true, text: text }); // Muestra mensaje de error
        } else {
          setItemInfo(response.item); // Almacena la información del artículo
        }
      })
      .catch((error) => {
        console.error(error);
        showErrorMsg({
          error: true,
          text: "Algo salió mal. Intenta nuevamente.",
        }); // Muestra mensaje de error
      });
  }, [id]); // Se ejecuta cuando cambia el ID del artículo

  // Renderiza el componente
  return errorMsg.error ? (
    <Message error={errorMsg.error} message={errorMsg.text} />
  ) : itemInfo.id ? (
    <div className={"item-detail-container-general"}>
      {/* Migas de pan */}
      <Breadcrumb categories={results.categories} />
      <div className={"item-detail-container"}>
        <div className={"item-detail-first-row"}>
          <div className={"item-detail-img-container"}>
            {/* Imagen del artículo */}
            <img src={itemInfo.picture} alt={itemInfo.title} />
            {/* Título y descripción del artículo */}
            <p className={"item-detail-description-title"}>
              Descripción del producto
            </p>
            <p className={"item-detail-description-text"}>
              {itemInfo.description}
            </p>
          </div>
          <div className={"item-detail-info"}>
            {/* Condición y cantidad vendida del artículo */}
            <p className={"item-detail-condition-sold"}>
              {`${itemInfo.condition === "new" ? "Nuevo" : "Usado"} - ${
                itemInfo.sold_quantity
              } vendidos`}
            </p>
            {/* Título y precio del artículo */}
            <h5 className={"item-detail-title"}>{itemInfo.title}</h5>
            <h3 className={"item-detail-price"}>
              {/* Formato y precio del artículo */}
              {utils.formatPrice(itemInfo.price)}
              {/* Decimales del precio, si existen */}
              {itemInfo.price.decimals ? (
                <span className={"item-price-decimals"}>
                  {itemInfo.price.decimals}
                </span>
              ) : null}
            </h3>
            {/* Botón de compra */}
            <button className={"item-detail-buy"}>Comprar</button>
          </div>
        </div>
        <div className={"item-detail-description"}></div>
      </div>
    </div>
  ) : (
    <Loader /> // Muestra el componente de carga
  );
}
