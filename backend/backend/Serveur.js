require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/bilan', require('./api/bilan'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎅 NoëlBot est en ligne sur le port ${PORT}`);
});
