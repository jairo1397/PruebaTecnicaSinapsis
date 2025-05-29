
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

Gracias por la oportunidad de entregar este proyecto.