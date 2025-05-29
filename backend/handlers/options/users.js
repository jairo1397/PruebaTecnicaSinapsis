const db = require('../../utils/db');

// Obtener todos los usuarios activos (status = 1)
module.exports.getUsers = async () => {
  try {
    // Ejecuta la consulta para obtener id y username de usuarios activos
    const [users] = await db.execute(
      'SELECT id, username FROM users WHERE status = 1'
    );

    // Retorna la lista de usuarios con status 200
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    // En caso de error, loguea y retorna status 500 con mensaje de error
    console.error('Error al obtener usuarios:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener usuarios' }),
    };
  }
};