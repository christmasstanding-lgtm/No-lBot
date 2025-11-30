const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { InferenceClient } = require('huggingface_hub');

const EMAIL_DESTINATAIRE = 'atelier.padrenoel@gmail.com';
const PRIX_PAR_UTILISATEUR = 4.99;

// Initialise le client Hugging Face avec un modèle public
const client = new InferenceClient({ model: "meta-llama/Llama-3.2-3B-Instruct" });

router.post('/', async (req, res) => {
  try {
    const { totalUtilisateurs } = req.body;
    if (!totalUtilisateurs || isNaN(totalUtilisateurs)) {
      return res.status(400).json({ error: 'Nombre de paiements requis' });
    }

    const montantTotal = (totalUtilisateurs * PRIX_PAR_UTILISATEUR).toFixed(2);

    const prompt = `
Tu es NoëlBot, une IA festive. Voici le bilan de la saison :
- Nombre de paiements estimés : ${totalUtilisateurs}
- Montant total estimé : ${montantTotal} €

Donne 3 idées concrètes pour améliorer NoëlBot l’année prochaine, en tenant compte de la diversité culturelle, des moyens de paiement locaux et de l’expérience utilisateur.
`;

    const response = await client.text_generation(prompt, {
      max_new_tokens: 200,
      temperature: 0.9
    });

    const transporteur = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const html = `
      <h2>🎄 Bilan de NoëlBot</h2>
      <p><strong>Paiements estimés :</strong> ${totalUtilisateurs}</p>
      <p><strong>Montant total estimé :</strong> ${montantTotal} €</p>
      <h3>🤖 Suggestions IA :</h3>
      <pre>${response}</pre>
      <p>Merci pour cette belle saison magique !</p>
    `;

    await transporteur.sendMail({
      from: `"NoëlBot 🎅" <${process.env.MAIL_USER}>`,
      to: EMAIL_DESTINATAIRE,
      subject: '🎁 Bilan de NoëlBot',
      html
    });

    res.json({ success: true, message: 'Bilan envoyé avec succès !' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’envoi du bilan.' });
  }
});

module.exports = router;
