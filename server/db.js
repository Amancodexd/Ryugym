// simple in-memory store for transactions
// in production, swap this out for a real database (PostgreSQL, MongoDB, etc.)

const store = new Map();

function createTransaction(uuid, data) {
  store.set(uuid, {
    ...data,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

function getTransaction(uuid) {
  return store.get(uuid) || null;
}

function updateTransaction(uuid, updates) {
  const existing = store.get(uuid);
  if (!existing) return null;
  const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  store.set(uuid, updated);
  return updated;
}

module.exports = { createTransaction, getTransaction, updateTransaction };
