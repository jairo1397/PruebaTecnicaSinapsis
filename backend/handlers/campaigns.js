const db = require('../utils/db');

// Crear una nueva campaña
module.exports.createCampaign = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { user_id, name, message_text, phone_list } = body;

    // Insertar datos de campaña usando parámetros para evitar inyección SQL
    const [result] = await db.execute(
      `INSERT INTO campaigns (user_id, name, process_date, process_hour, process_status, phone_list, message_text)
       VALUES (?, ?, CURDATE(), CURTIME(), 1, ?, ?)`,
      [user_id, name, phone_list, message_text]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Campaña creada', campaign_id: result.insertId }),
    };
  } catch (error) {
    console.error('Error al crear campaña:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Error al crear la campaña' }),
    };
  }
};

// Enviar mensajes de una campaña
module.exports.sendCampaign = async (event) => {
  const campaignId = event.pathParameters.id;

  if (!campaignId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta id de campaña' }) };
  }

  try {
    // Obtener campaña por id
    const [campaigns] = await db.execute('SELECT * FROM campaigns WHERE id = ?', [campaignId]);

    if (campaigns.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Campaña no encontrada' }) };
    }

    const campaign = campaigns[0];

    // Cambiar estado campaña a "en proceso"
    await db.execute('UPDATE campaigns SET process_status = 2 WHERE id = ?', [campaignId]);

    // Enviar mensaje a cada teléfono de la lista
    const phones = campaign.phone_list.split(',');

    for (const phone of phones) {
      // Simular envío con 80% éxito
      const status = Math.random() < 0.8 ? 2 : 3;

      await db.execute(
        `INSERT INTO messages (campaign_id, phone, text, shipping_status, process_date, process_hour)
         VALUES (?, ?, ?, ?, CURDATE(), CURTIME())`,
        [campaignId, phone.trim(), campaign.message_text, status]
      );
    }

    // Cambiar estado campaña a "finalizada"
    await db.execute('UPDATE campaigns SET process_status = 3 WHERE id = ?', [campaignId]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Mensajes enviados exitosamente' }),
    };
  } catch (err) {
    console.error('Error en sendCampaign:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error en el envío' }) };
  }
};

// Listar campañas por rango de fechas
module.exports.listCampaigns = async (event) => {
  const { start, end } = event.queryStringParameters || {};

  if (!start || !end) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan parámetros de fecha start o end' }) };
  }

  try {
    const [rows] = await db.execute(
      `SELECT * FROM campaigns WHERE process_date BETWEEN ? AND ?`,
      [start, end]
    );

    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (error) {
    console.error('Error al listar campañas:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error al listar campañas' }) };
  }
};

// Obtener mensajes de una campaña específica
module.exports.getCampaignMessages = async (event) => {
  const campaignId = event.pathParameters.id;

  try {
    const [messages] = await db.execute('SELECT * FROM messages WHERE campaign_id = ?', [campaignId]);

    return { statusCode: 200, body: JSON.stringify(messages) };
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Error al obtener mensajes' }) };
  }
};