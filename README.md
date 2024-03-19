
# Challenge frontend Mercado libre React  

El challenge consta de una web hecha del lado del cliente en React y del lado del servidor con Node Js y Express para generar servicios de consumos de datos.
(Todo el codigo se encuentra comentado y con su explicación de que hace)

En este README se encontrará la explicación de todo el proyecto de manera global y que se tuvo en cuenta para realizarlo.

## Installation

1. Lo primero para instalar el proyecto es descargar o clonar el repositorio, una vez se descarga se procede con lo siguiente:

2. Intalar dependencias del proyecto:

( Se debe tener instalado Node Js  preferiblemente version 14.17.6 que fue la que usé, se puede descargar  de la pagina web oficial de Node o instalando NVM (Manejador de versiones de node))

```
  cd challenge-react
  npm install 
```

3. Instalar algunas librerias adicionales (Estas lineas son necesarias si con la anterior no se instaló automaticamente)

3.1 nodemon libreria para reproducir el server escuchando cambios

```
  npm install nodemon -g

```


3.2  sass libreria de estilos

```
  npm install sass
```

4. Una vez instalado todo podemos proceder a ejecutar el proyecto junto o separado

4.1 para lanzar el proyecto junto se ejecuta el comando 

```
  npm run complete
```
Este comando ejecuta el proyecto tanto del cliente como del lado del servidor en los siguiente puertos:

Cliente : http://localhost:3000/

Servidor: http://localhost:8080/api-docs/

Si se quieren ejecutar por aparte se pueden usar los siguientes comandos

4.2 Cliente 

```
  npm run start
```

4.3 Servidor 

```
  npm run server
```
       

## Servidor

Los servicios estan desarrollados con Node Js y Express, para los servicios use la libreria https para hacer las peticiones a las Api de MELI suministradas.

* Notas: 
* En el primer servicio que  se indica se debe consultar la lista de productos  hice un paso adicional de incluir un llamado de cada uno de los item que encuentre para esa busqueda, hacer un cliclo en la api de /items/:id y buscar el detalle de la ciudad del vendedor y poder pintarlo en la lista de esa vista necesaria, ya que la api original no trae ese dato.
* En el servicio de detalle no encontré el datos de cantidad de unidades vendidas que se pide mostrar en la vista de detalle de ese item.

Está dividido en 3 capas routes, controllers y services.

1. Routes: En esta se crean los endpoints que s evan a usar y como seon los parametros que recibe , estas rutas se crean con Route de Express.

Adicicionalmente le instalé la libreria de Swagger para que fuera mas organizado y documentar los servicios y tambien fuera posible ejecutarlos en una web aparte ya que brinda mejor visibilidad.
Para acceder a la documentacion de servicios solo es necesario ingresar a http://localhost:8080/api-docs/ alli mostrará la documentacion y s epuede ejecutar cada servicio.

2. Controllers: En esta capa como su nombre lo dice se recibe los paremtros de la ejecuciond e los endpoint en las rutas y se hace el llamado al servicio que es el que hace el consumo directo de la api de MELI, aqui tambien se hace la conversion de los datos en los formatos predefinidos en el enunciado.

3. Services: Aqui se hace los llamados mediante la libreria HTTPS de los servicios entregados por MELI, se configura una misma promeza para ejecutar cada servicio y se convierte los datos de repsuesta en tipo JSON que son como se necesitan para trabajar.

Nota: 


## Cliente

El cliente está desarrollado con React JS directamente con clases de javascrips y en componentes tipo funcion o funcionales, usando props y con la libreria de router de reacta para la navegación. 

* Estilos: 
* Para los estilos usé SASS para los scss declarando las clases necesarias para cada una de las vistas.
* importante en este punto se crea una carpeta assets donde se almacena  las imagenes necesarias en el proyecto
* adicionalmente en la carpeta anterior de assets tambien se creo las carpetas con los scss de las variables para todo el proyecto esto permite mayor escalabilidad y manejo de cambios, las variabes son: (Colores, fuentes, imagenes, mediaquery(Esta ultima se puede implementar para responsividad)).


* En todo el codigo se uso el useState para el almacenamiento de datos y uso de los mismos.
* En la app.js que es la principal donde se declara los componentes iniciales se declaro un AppContext que sirve como contexto para declarar variables globales y pasarlo por toda la aplicación ( Este se usó para almacebar la informacion del breacum de categorias buscado incialamente y pasarlo cuando se seleciona el item orpoducto tambien en esa vista de detalle pueda salir)
* Para el consumo d elos servicios se usó fetch de React y se envia como headers los parametros de autor que s eindica en el enunciado como firma, esto podria ser mas adelante modificado por un token o una encriptación. 

La arquitectura del proyecto esta basada principalmente en la pagina principal donde se coloca el buscador y la consulta del los item, se realizó los puntos que se indica que se deben tener paginas unicas para consultar la vista principal, la lista de items y buscar 1 solo item.

La estructura de carpetas se basa en las recomendadciones de React en tener una carpeta de componente y una para cada uno de estos, dentro de cada carpeta tiene un archivo .js con el componente funcional y otro .scss con los estilos para ese componente (dentro del estilo del componente se tiene declarado el estilo global donde tambien se declara las variables globales de estilos)

Los estilos de colores se tomaron según la especificación dada, y tamaños de letra asi como espacios de margenes y demas.

* Notas: 
* Los tipos de fuente o nombres de fuente no se encontraba en el requerimiento y para esto tome la fuente que encontré que tiene la pagina principal de mercadolibre.com para usar el mismo y que se viera igual.
* En la api de detalle de item no se encontraba las categorias de ese item por eso se usó el AppContext como se explicó mas atras.

## Screenshots

Resultados del diseño  entregable

* Servidor

* Todos los servicios

![App Screenshot](https://i.ibb.co/3vLXkkH/api-meli1.png)

* Ejecución de  listado de productos

![App Screenshot](https://i.ibb.co/vwY27DH/api-meli2.png)

* Ejecución de  detalle de producto

![App Screenshot](https://i.ibb.co/vY2q3zd/api-meli3.png)

* Cliente

* Buscador o pantalla principal

![App Screenshot](https://i.ibb.co/tCbDpYw/front1-meli.png)

* Lista de productos encontrados

![App Screenshot](https://i.ibb.co/g6rmZ48/front2-meli.png)

* Detalle de producto

![App Screenshot](https://i.ibb.co/2dWyRyp/front3-meli.png)


## Support

Realizado por Esteban Restrepo Vallejo

Correo: esteban.restrepo.vallejo@gmail.com

Linkedin:  www.linkedin.com/in/esteban-restrepo-vallejo

Web mi portafollio: https://portafolioesteban.vercel.app/
