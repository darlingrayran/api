API de Canciones Colombianas

¡Bienvenido a la API de Canciones Colombianas! Este proyecto es una API sencilla pero poderosa, la cual fue diseñada para gestionar un catálogo de canciones colombianas. Desarrollada con Node.js, Express y MySQL, esta API te permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de canciones, brindándote un acceso sin precedentes a la riqueza musical de Colombia.

Características Principales

- Gestión de Canciones: Administra un catálogo de tus canciones colombianas favoritas.
- Operaciones CRUD: Soporte completo para insertar, leer, actualizar y eliminar registros de canciones.
- Búsqueda por ID: Accede a detalles específicos de cada canción mediante su ID único.
- Exploración Completa: Navega por la lista completa de canciones almacenadas en la base de datos.

Comenzando:

Para sumergirte en el mundo de la música colombiana con mi API, necesitarás configurar algunas cosas primero:

1. Dependencias Necesarias
Este proyecto utiliza varias dependencias para su funcionamiento. Aquí te mostrare cómo instalarlas:

npm install express cors mysql2 dotenv

2. Configuración de la Base de Datos

Utilice MySQL Workbench para crear y gestionar la base de datos COLOMBIANSONGS, la cual incluye una tabla llamada FAVORITESONGS. Los campos de la tabla son:

- NAME: Nombre de la canción.
- AUTHOR: Nombre del artista.
- YEAR: Año de publicación.
- GENRE: Género musical.
- COMMENTS: Información adicional o comentarios sobre la canción.

3.Conexión a la Base de Datos

Para conectar tu aplicación a la base de datos, configura los siguientes parámetros en index.js, asegurándote de reemplazar "tu_contraseña" con tu contraseña real de MySQL:

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tu_contraseña",
  database: "colombianSongs",
});

4. Ejecución y Pruebas
Inicia el servidor en el puerto 4000 y prueba la API mediante:

node index.js

Ahora, el servidor estará escuchando en http://localhost:4000.

5. Funcionalidades CRUD

* Obtener una Canción por ID: GET /allSongs/:id permite obtener detalles de una canción específica.
* Listar Todas las Canciones: GET /allSongs muestra todas las canciones en la base de datos.
* Actualizar una Canción: PUT /allSongs/:id actualiza los detalles de una canción existente.
* Agregar una Nueva Canción: POST /addSongs introduce una nueva canción en la base de datos.
* Eliminar una Canción: DELETE /allSongs/:id elimina una canción de la base de datos.


6. Próximas Mejoras

Estoy constantemente buscando mejorar y expandir las capacidades de esta API. Algunas de las mejoras planeadas incluyen:

- Despliegue en la Nube: Próximamente en Render para facilitar el acceso global.
- Interfaz de Usuario: Desarrollo de una aplicación frontend para una experiencia de usuario más rica e interactiva.


7. Conclusión

¡Espero que disfrutes explorando y utilizando la API de Canciones Colombianas tanto como yo disfrute creándola! Este proyecto no solo es un homenaje a la diversidad y riqueza musical de Colombia, sino también una herramienta práctica para gestores de contenido, desarrolladores y aficionados a la música. 

Si tienes alguna sugerencia u opcion de mejora, hazmelo saber, que estaria encantada de recibir comentarios. 

Con cariño,

Creado por: Darling Rayran @2023

 
<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>





