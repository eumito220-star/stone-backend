// index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, 'cartoes.log');

app.use(cors());
app.use(express.json());

app.post('/save-card', (req, res) => {
  const payload = { ...req.body, timestamp: new Date().toISOString() };
  fs.appendFile(LOG_FILE, JSON.stringify(payload) + '\n', (err) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.json({ status: 'ok' });
  });
});

app.get('/', (_, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Rodando em ${PORT}`));
