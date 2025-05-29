
---

## Backend

- Lenguaje: Node.js
- Framework: Serverless Framework
- Documentación API: `backend/openapi.yaml`
- Plugin serverless-offline para pruebas locales

---

## Frontend

- Framework: Angular (v19)

---

## Cómo ejecutar el proyecto

### Backend

1. Ve a la carpeta `backend`
2. Instala dependencias con `npm install`
3. Configura las variables y ajustando valores en utils/db.js
4. Ejecuta localmente con `npx serverless offline`
5. Para visualizar la documentacion Swagger de los endpoints ejecutar `node swagger.js`
6. La documentación API está disponible en `http://localhost:3001/docs` cuando el backend está corriendo
6. Si se quiere desplegar a AWS, ejecutar `serverless deploy`

### Frontend

1. Ve a la carpeta `frontend`
2. Instala dependencias con `npm install`
3. Levanta la app con `ng serve`
4. Accede a `http://localhost:4200` en tu navegador

---

## Script base de datos

El script para crear la base de datos y llenar datos de prueba está en:
/scripts/init_database.sql

Ejecuta este script en tu servidor MySQL antes de correr la aplicación.


---

## Cómo funciona el Backend

El backend está desarrollado en Node.js usando Serverless Framework y permite la ejecución de los endpoints mediante la documentación Swagger para facilitar las pruebas.

- La documentación de la API está disponible en `/docs` cuando el backend está corriendo localmente.
- Al interactuar con los endpoints desde Swagger (dándole a "Try it out"), se completan automáticamente con datos de prueba para facilitar la simulación y prueba rápida.
- Para correr localmente se utiliza el plugin `serverless-offline`, que simula el entorno AWS para pruebas.
- El backend incluye lógica para simular el envío de mensajes con una probabilidad de éxito o fallo, lo que permite probar diferentes escenarios de estado en las campañas.

---

## Cómo funciona el Frontend

El frontend está desarrollado con Angular (v19) y ofrece una interfaz para gestionar campañas de envío de mensajes.

- En la parte superior derecha del sistema web hay dos botones principales:
  - **Lista de Campañas:** Muestra todas las campañas existentes con su estado actual y botones para acciones específicas.
  - **Crear Nueva Campaña:** Abre un formulario para crear una campaña nueva.

### Creación de campaña

- El formulario permite seleccionar un usuario (cargado desde la tabla `users`), asignar un nombre a la campaña y escribir un mensaje que será enviado a todos los números.
- Luego, se puede agregar una lista de números telefónicos destino para el envío del mensaje.

### Gestión y simulación

- Una vez creada la campaña, esta aparece en la lista de campañas.
- Desde ahí, puedes hacer clic en el botón **Simular Envío** para simular el envío de mensajes a los números registrados.
- La simulación actualiza el estado de la campaña y genera registros individuales para cada número con el estado del mensaje (exitoso o fallido), simulando una probabilidad de éxito o error.
- También se puede visualizar la lista de mensajes enviados, mostrando los números, mensajes y sus estados.

---