require('dotenv').config(); // Configuración de dotenv para cargar variables de entorno

const swaggerUi = require('swagger-ui-express'); // Módulo para integrar Swagger UI en Express
const swaggerSpec = require('./swagger'); // Especificaciones de Swagger

const express = require('express'); // Framework para construir aplicaciones web en Node.js
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes HTTP
const cors = require('cors'); // Middleware para habilitar CORS en Express
const app = express(); // Instancia de la aplicación Express

// Configurar Swagger UI Express en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Habilitar CORS en la aplicación
app.use(cors());

// Analizar cuerpos de solicitudes HTTP en formato URL codificada y JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Puerto de la aplicación obtenido de las variables de entorno o predeterminado a 8081
const port = process.env.APP_PORT || 8081;
// Host de la aplicación obtenido de las variables de entorno o predeterminado a '127.0.0.1'
const host = process.env.APP_HOST || '127.0.0.1';

// Rutas definidas en el archivo product.routes.js
const router = require('./server/routes/product.routes');
app.use('/api', router); // Asociar las rutas al prefijo '/api'

// Iniciar el servidor Express
app.listen(port, host);

// Imprimir mensaje en la consola indicando el inicio del servidor
console.log(`Ejecutando servidor en ${host}:${port}`);
