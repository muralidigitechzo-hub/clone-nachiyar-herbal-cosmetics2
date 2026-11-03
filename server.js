/**
 * Nachiyar Herbals & Cosmetics - Universal Server
 * Supports local execution, cPanel, and cloud platforms (Vercel Services / Render / Railway)
 */
const path = require('path');
const config = require('./server/src/config/environment');
const app = require('./server/src/app');
const storageService = require('./server/src/services/storage');

const PORT = process.env.PORT || config.port || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`==================================================================`);
  console.log(`🌿 NACHIYAR HERBALS & COSMETICS`);
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`🛍️ Storefront:    http://localhost:${PORT}`);
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

module.exports = app;
