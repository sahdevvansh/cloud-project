const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

console.log("✅ server.js started"); // debug line

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

let savedList = [];

app.post('/api/add', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Both 'name' and 'number' are required." });
  }

  const item = { name, number: parseInt(number, 10) };
  savedList.push(item);

  res.status(201).json({ message: "Item added", item });
});

app.get('/api/list', (req, res) => {
  res.json(savedList);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
});