const { InferenceClient } = require('huggingface_hub');

// Initialise le client Hugging Face avec un modèle de correction en français
const client = new InferenceClient({ model: "bighiu/french-correction" });

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
    return texte; // Si erreur, renvoie le texte original
  }
}

module.exports = corrigerTexte;
