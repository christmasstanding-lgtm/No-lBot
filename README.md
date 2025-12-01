# 🎅 NoëlBot

**NoëlBot** est une application festive pilotée par l’intelligence artificielle.  
Elle répond aux enfants du monde entier, envoie des messages personnalisés, et génère un bilan automatique chaque année.

## ✨ Fonctionnalités

- Assistant IA multilingue (plus de 30 langues)
- Réponses personnalisées selon la culture et la langue
- Envoi d’emails automatiques avec un bilan annuel
- Bilan final automatique le 26 décembre à minuit
- Adaptation des prix et devises locales

## 📦 Installation

Tester le bilan manuellement

`bash
curl -X POST http://localhost:3000/api/bilan \
  -H "Content-Type: application/json" \
  -d '{"totalUtilisateurs": 87}'
`
```bash
git clone https://github.com/ton-utilisateur/noelbot.git
cd noelbot
npm install
## ⚙️ Lancement avec PM2

Pour exécuter NoëlBot en continu avec PM2 :

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
