CREATE DATABASE IF NOT EXISTS marketing_campaigns;
USE marketing_campaigns;

-- Tabla de clientes
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    status BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Tabla de campañas
CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    process_date DATE,
    process_hour TIME,
    process_status TINYINT, -- 1: pendiente, 2: en proceso, 3: finalizada
    phone_list VARCHAR(1000), -- Lista de números separados por coma
    message_text TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de mensajes
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    phone VARCHAR(20),
    text TEXT,
    shipping_status TINYINT, -- 1: pendiente, 2: enviado, 3: error
    process_date DATE,
    process_hour TIME,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

-- Insertar datos de prueba en customers con nombres más reales
INSERT INTO customers (name, status) VALUES 
('Empresa Soluciones Globales', TRUE),
('InnovaTech Servicios', TRUE),
('Comercial López S.A.', FALSE),
('Distribuidora Norte', TRUE);

-- Insertar datos de prueba en users con nombres de usuarios más reales y variados
INSERT INTO users (customer_id, username, status) VALUES 
(1, 'jose.martinez', TRUE),
(1, 'laura.gomez', TRUE),
(2, 'carlos.ramirez', TRUE),
(3, 'maria.lopez', FALSE),
(4, 'juan.perez', TRUE);

-- Suponiendo que los IDs de users generados son 1, 2, 3, 4, 5 respectivamente

-- Insertar datos de prueba en campaigns
INSERT INTO campaigns (user_id, name, process_date, process_hour, process_status, phone_list, message_text) VALUES
(1, 'Campaña Verano 2025', '2025-06-01', '10:00:00', 1, '1234567890,0987654321,1122334455', 'Mensaje promocional verano 2025'),
(2, 'Campaña Invierno 2025', '2025-12-01', '15:30:00', 2, '2233445566,6655443322', 'Mensaje promoción invierno'),
(3, 'Campaña Primavera 2025', '2025-04-10', '14:00:00', 1, '3344556677,7788990011', 'Mensaje primavera 2025');
(5, 'Campaña Otoño 2025', '2025-09-15', '09:00:00', 3, '4455667788,8877665544', 'Mensaje especial otoño');



