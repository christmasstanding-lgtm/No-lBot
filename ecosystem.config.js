module.exports = {
  apps: [
    {
      name: "noelbot-cron",
      script: "cron.js",
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
