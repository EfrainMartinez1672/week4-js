📋 Administrador de Tareas - Módulo 3
Aplicación web completa desarrollada para el Módulo 3, enfocada en la integración de conceptos fundamentales de JavaScript moderno (ES6+), manipulación avanzada del DOM, persistencia de datos local y comunicación asíncrona con un servidor mediante la Fetch API (Operaciones CRUD).

🚀 Características del Proyecto (Cumplimiento de Rúbrica)
TASK 1: Estructura Semántica y Modular -> Interfaz limpia estructurada en index.html conectada a módulos de JavaScript independientes.

TASK 2: Captura y Validación -> Formulario interactivo que captura los datos del usuario, con validaciones para evitar campos vacíos y alertas dinámicas de éxito/error en el DOM.

TASK 3: Manipulación Avanzada del DOM -> Creación dinámica de elementos <li> y uso de appendChild() y removeChild() para la gestión de la lista en tiempo real.

TASK 4: Persistencia en LocalStorage -> Respaldo automático del arreglo global de tareas en el navegador para mantener los datos al recargar la página.

TASK 5: Integración Fetch API (CRUD Real) -> Conexión directa a un servidor local para sincronizar los estados mediante peticiones asíncronas:

GET: Obtener y renderizar la lista inicial.

POST: Crear nuevas tareas en el servidor.

PUT: Actualizar el estado de una tarea (completada/pendiente).

DELETE: Eliminar la tarea de la base de datos de forma permanente.

TASK 6: Manejo de Errores -> Uso de bloques try...catch y respuestas en consola para auditar el comportamiento del servidor.

📂 Estructura del Proyecto
Plaintext


├── index.html          # Estructura principal y formulario de captura
├── style.css           # Estilos de la aplicación (Modo Oscuro, estados y animaciones)
├── app.js              # Lógica de interacción, DOM, LocalStorage y Fetch
└── db.json             # Base de datos simulada para JSON Server
🛠️ Requisitos e Instalación
Para ejecutar este proyecto de forma local y poder probar las peticiones HTTP reales, necesitas tener instalado Node.js en tu sistema.

Clonar o descargar los archivos del proyecto en una carpeta local.

Abrir una terminal en la ruta del proyecto.

Ejecutar el servidor local simulado (JSON Server) con el siguiente comando:

Bash


npx json-server --watch db.json --port 3000
💡 Nota: Mantén esa terminal abierta. El servidor correrá en http://localhost:3000/tasks.

Abre el archivo index.html en tu navegador (puedes usar la extensión Live Server de VS Code o simplemente arrastrar el archivo).

🕹️ Guía de Pruebas (Cómo evaluarlo)
Creación (POST): Escribe una tarea en el input y presiona "Agregar Tarea". Verás un mensaje verde de éxito, el elemento aparecerá en la lista y se registrará en el archivo db.json.

Lectura (GET): Si recargas la página, las tareas guardadas previamente en el servidor se descargarán y se pintarán automáticamente en el DOM.

Actualización (PUT): Haz clic en el texto de cualquier tarea. Verás cómo cambia visualmente (se tacha) y el valor completed se actualiza a true o false en el servidor.

Eliminación (DELETE): Presiona el botón "Eliminar" en cualquier tarea. El elemento se removerá del DOM de inmediato usando removeChild() y desaparecerá de la base de datos.

Logs de Consola: Abre las Herramientas de Desarrollador (F12) para observar las respuestas en tiempo real enviadas por el servidor ante cada una de estas acciones.
