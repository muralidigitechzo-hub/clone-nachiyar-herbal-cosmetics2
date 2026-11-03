/**
 * Nachiyar Herbals & Cosmetics
 * Root Application Entrypoint (Database-Free / LocalStorage Architecture)
 */

const config = require('./server/src/config/environment');
const app = require('./server/src/app');
const storageService = require('./server/src/services/storage');

const PORT = config.port || 5000;

// When running locally / standalone server, listen on PORT
if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`==================================================================`);
    console.log(`🌿 NACHIYAR HERBALS & COSMETICS`);
    console.log(`🚀 Modern Stack: Express.js + Static Engine + 100% LocalStorage`);
    console.log(`🌍 Environment:   ${config.env.toUpperCase()}`);
    console.log(`🗄️ Database:      NONE (100% Client-Side LocalStorage Storage Active)`);
    console.log(`📁 File Storage:  ${storageService.getStorageType().toUpperCase()} (${storageService.getStorageDirectory()})`);
    console.log(`🛍️ Storefront:    http://localhost:${PORT}`);
    console.log(`💼 Nimda Console: http://localhost:${PORT}/nimda/`);
    console.log(`==================================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n⚠️ Port ${PORT} is already in use by another process.`);
    } else {
      console.error('Server error:', err);
    }
  });
}

// Export express app handler for Vercel Serverless environment
module.exports = app;
