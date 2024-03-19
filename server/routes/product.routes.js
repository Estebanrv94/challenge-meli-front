const express = require("express");
const ProductController = require("../controllers/product.controller");
const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Obtener lista de productos
 *     description: Obtiene una lista de productos según el criterio de búsqueda proporcionado.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Criterio de búsqueda para filtrar los productos.
 *         schema:
 *           type: string
 *       - in: header
 *         name: name
 *         required: true
 *         description: nombre del autor
 *         schema:
 *           type: string
 *         value: Esteban
 *       - in: header
 *         name: lastname
 *         required: true
 *         description: apellidos del autor
 *         schema:
 *           type: string
 *         value: Restrepo
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *       400:
 *         description: Error al procesar la solicitud. Se requiere un criterio de búsqueda.
 */
router.get("/items", (req, res) => {
  ProductController.getProductsWithDetails(req.query.q, req.headers)
    .then((items) => res.json(items))
    .catch((error) => res.status(500).send(error));
});

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Obtener detalles de un producto
 *     description: Obtiene los detalles de un producto según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto.
 *         schema:
 *           type: string
 *       - in: header
 *         name: name
 *         required: true
 *         description: nombre del autor
 *         schema:
 *           type: string
 *         value: Esteban
 *       - in: header
 *         name: lastname
 *         required: true
 *         description: apellidos del autor
 *         schema:
 *           type: string
 *         value: Restrepo
 *     responses:
 *       200:
 *         description: Detalles del producto obtenidos exitosamente.
 *       400:
 *         description: Error al procesar la solicitud. Se requiere un ID válido.
 */
router.get("/items/:id", (req, res) => {
  ProductController.getProductDetail(req.params.id, req.headers)
    .then((item) => res.json(item))
    .catch((error) => res.status(error.status).send(error));
});

module.exports = router;
