/**
 * Database-Free Mode Configuration
 * All website data is 100% persisted and managed via browser LocalStorage.
 * No external PostgreSQL database required or connected.
 */

const pool = {
  connect: async () => ({
    query: async () => ({ rows: [] }),
    release: () => {}
  }),
  query: async (text, params, callback) => {
    if (typeof callback === 'function') {
      callback(null, { rows: [] });
    }
    return { rows: [] };
  },
  on: () => {}
};

async function query(text, params) {
  return { rows: [] };
}

module.exports = {
  pool,
  query,
  isConnected: () => false,
  getConnectionError: () => 'Database-Free Mode active (100% Client LocalStorage Storage Engine)',
  autoBootstrapSchema: async () => {}
};
