require('dotenv').config();
const cron = require('node-cron');
const envoyerBilan = require('./backend/envoiBilan');

// 🎄 Déclenchement automatique chaque 26 décembre à 00h00
cron.schedule('0 0 26 12 *', async () => {
  console.log("🕛 Déclenchement du bilan de NoëlBot...");
  await envoyerBilan(87); // Remplace 87 par un nombre dynamique si besoin
});
