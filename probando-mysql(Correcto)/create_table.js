const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: '192.168.3.2', // Cambia 'localhost' por la IP de tu Raspberry Pi si estás conectando desde otra máquina
  user: 'user', // Tu usuario de MySQL
  password: 'user', // Tu contraseña de MySQL
  database: 'mydatabase' // El nombre de tu base de datos
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);

  // Crear una tabla
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err, results, fields) => {
    if (err) {
      console.error('Error creating table:', err.stack);
      return;
    }
    console.log('Table created successfully');
  });

  // Cerrar la conexión
  connection.end();
});
