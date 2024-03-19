const apiUrl = process.env.API_URL; // URL de la API
const https = require("https"); // Módulo para hacer solicitudes HTTPS

/**
 * Realiza una solicitud HTTPS y devuelve una promesa con el resultado.
 * @param {string} url - URL a la que se hará la solicitud.
 * @returns {Promise<Object>} Promesa que se resuelve en el resultado de la solicitud.
 */
requestPromise = (url) => {
  return new Promise((resolve, reject) => {
    let body = ""; // Variable para almacenar el cuerpo de la respuesta
    // Realiza la solicitud HTTPS
    https
      .get(url, (response) => {
        // Evento de datos recibidos
        response.on("data", (chunk) => {
          body += chunk; // Concatena los datos recibidos al cuerpo
        });
        // Evento de finalización de la respuesta
        response.on("end", () => {
          resolve(JSON.parse(body)); // Resuelve la promesa con el cuerpo parseado como JSON
        });
      })
      // Evento de error en la solicitud
      .on("error", (error) => reject(error)); // Rechaza la promesa con el error
  });
};

/**
 * Obtiene productos según el término de búsqueda.
 * @param {string} query - Término de búsqueda.
 * @returns {Promise<Object>} Promesa que se resuelve en el resultado de la solicitud de productos.
 */
exports.getProducts = (query) => {
  return requestPromise(`${apiUrl}sites/MLA/search?q=${query}`); // Realiza la solicitud de búsqueda de productos
};

/**
 * Obtiene el detalle de un producto.
 * @param {string} query - Identificador del producto.
 * @returns {Promise<Array>} Promesa que se resuelve en un array con el detalle del producto y su descripción.
 */
exports.getProductDetail = (query) => {
  return Promise.all([ // Realiza múltiples solicitudes en paralelo
    requestPromise(`${apiUrl}items/${query}`), // Solicitud del detalle del producto
    requestPromise(`${apiUrl}items/${query}/description`), // Solicitud de la descripción del producto
  ]);
};

/**
 * Obtiene productos con detalles adicionales.
 * @param {string} query - Término de búsqueda.
 * @returns {Promise<Object>} Promesa que se resuelve en el resultado de la solicitud de productos con detalles adicionales.
 */
exports.getProductsWithDetails = (query) => {
  return requestPromise(`${apiUrl}sites/MLA/search?q=${query}`) // Realiza la solicitud de búsqueda de productos
    .then((response) => {
      const data = response; // Almacena la respuesta
      const results = data.results || []; // Obtiene el array de resultados (si existe)
      const complementaryRequests = []; // Array para almacenar las promesas de las consultas complementarias

      // Itera sobre cada objeto en los resultados y realiza consultas complementarias
      for (let i = 0; i < results.length; i++) {
        const resl = results[i]; // Obtiene el objeto actual del array
        if (resl.id) {
          const id = resl.id; // Obtiene el ID del producto
          // Realiza una solicitud para obtener detalles adicionales del producto
          const complementaryRequest = requestPromise(`${apiUrl}items/${id}`)
            .then((complementaryResponse) => {
              // Agrega la propiedad con los detalles adicionales al objeto actual
              resl.city_seller = complementaryResponse.seller_address.city.name;
            })
            .catch((error) => {
              console.error(
                `Error en la consulta complementaria para el ID ${id}:`,
                error
              );
              throw error; // Manejo de errores
            });

          complementaryRequests.push(complementaryRequest); // Agrega la promesa al array
        }
      }

      // Espera a que todas las consultas complementarias se completen
      return Promise.all(complementaryRequests).then(() => {
        // Devuelve la data original con los resultados modificados
        return { ...data, results: results };
      });
    })
    .catch((error) => {
      console.error("Error en la primera solicitud:", error);
      throw error; // Manejo de errores
    });
};
