require('dotenv').config();
const nodemailer = require('nodemailer');
const { InferenceClient } = require('huggingface_hub');

// Initialisation du client IA Hugging Face
const client = new InferenceClient({ model: "meta-llama/Llama-3.2-3B-Instruct" });

// Fonction de correction automatique
async function corrigerTexte(texte) {
  try {
    const prompt = `Corrige les fautes de grammaire, d'orthographe et de style dans ce texte :\n\n${texte}`;
    const correction = await client.text_generation(prompt, {
      max_new_tokens: 300,
      temperature: 0.3
    });
    return correction;
  } catch (err) {
    console.error("Erreur de correction :", err.message);
    return texte;
  }
}

// Fonction principale : génère, corrige et envoie le bilan
async function envoyerBilan(totalUtilisateurs = 87) {
  const PRIX_PAR_UTILISATEUR = 4.99;
  const montantTotal = (totalUtilisateurs * PRIX_PAR_UTILISATEUR).toFixed(2);

  const prompt = `
Tu es NoëlBot, une IA festive. Voici le bilan de la saison :
- Nombre de paiements estimés : ${totalUtilisateurs}
- Montant total estimé : ${montantTotal} €

Donne 3 idées concrètes pour améliorer NoëlBot l’année prochaine, en tenant compte de la diversité culturelle, des moyens de paiement locaux et de l’expérience utilisateur.
`;

  try {
    const generation = await client.text_generation(prompt, {
      max_new_tokens: 300,
      temperature: 0.9
    });

    const texteCorrigé = await corrigerTexte(generation);

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
      <h3>🤖 Suggestions IA corrigées :</h3>
      <pre>${texteCorrigé}</pre>
      <p>Merci pour cette belle saison magique !</p>
    `;

    await transporteur.sendMail({
      from: `"NoëlBot 🎅" <${process.env.MAIL_USER}>`,
      to: 'atelier.padrenoel@gmail.com',
      subject: '🎁 Bilan de NoëlBot',
      html
    });

    console.log("✅ Bilan envoyé avec succès !");
  } catch (err) {
    console.error("❌ Erreur lors de l’envoi du bilan :", err.message);
  }
}

// Exécution directe si lancé en ligne de commande
if (require.main === module) {
  envoyerBilan();
}

module.exports = envoyerBilan;
