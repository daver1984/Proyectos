// Creando servidor ExpressJS
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 9090;

app.use(cors());

// Cargar archivos JSON
const symbols = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/symbols.json'), 'utf-8'));
const historical = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/historical.json'), 'utf-8'));

// Ruta para obtener todos los símbolos
app.get('/api/symbols', (req, res) => {
  res.json(symbols);
});

// Ruta para obtener un símbolo específico
app.get('/api/symbols/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const result = symbols.find(s => s.symbol === symbol);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Symbol not found' });
  }
});

// Ruta para obtener todo el histórico de precios
app.get('/api/historical', (req, res) => {
  res.json(historical);
});

// Ruta para obtener el histórico de un símbolo específico
app.get('/api/historical/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const result = historical[symbol];
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Historical data not found for symbol' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
