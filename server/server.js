/**
 * Standalone Node Server for Local Development
 */
const path = require('path');
const config = require('./src/config/environment');
const app = require('./src/app');
const storageService = require('./src/services/storage');

const PORT = config.port || 5000;

if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`==================================================================`);
    console.log(`🌿 NACHIYAR HERBALS & COSMETICS`);
    console.log(`🚀 Standalone Local Server running at http://localhost:${PORT}`);
    console.log(`💼 Nimda Console: http://localhost:${PORT}/nimda/`);
    console.log(`==================================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n⚠️ Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', err);
    }
  });
}

module.exports = app;
