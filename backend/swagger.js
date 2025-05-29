const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

// Cargar el archivo OpenAPI
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi', 'openapi.yaml'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Swagger docs disponibles en: http://localhost:${PORT}/docs`);
});