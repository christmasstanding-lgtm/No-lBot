require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios');

// Bilan final : 26 décembre à minuit
cron.schedule('0 0 26 12 *', async () => {
  try {
    await axios.post('http://localhost:3000/api/bilan', {
      totalUtilisateurs: 87 // à remplacer par une valeur dynamique si tu veux
    });
    console.log('🎄 Bilan NoëlBot envoyé automatiquement !');
  } catch (err) {
    console.error('Erreur envoi bilan :', err.message);
  }
});
