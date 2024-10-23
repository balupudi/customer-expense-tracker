// models/transaction.js
const db = require('../db');

// Get all transactions
exports.getAllTransactions = (callback) => {
  db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    callback(err, rows);
  });
};

// Add a new transaction
exports.addTransaction = (transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(`INSERT INTO transactions (type, category, amount, date, description)
    VALUES (?, ?, ?, ?, ?)`,
    [type, category, amount, date, description],
    function (err) {
      callback(err, { id: this.lastID });
    });
};

// Get transaction by ID
exports.getTransactionById = (id, callback) => {
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    callback(err, row);
  });
};

// Update transaction by ID
exports.updateTransactionById = (id, transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ?
    WHERE id = ?`,
    [type, category, amount, date, description, id],
    function (err) {
      callback(err, { changes: this.changes });
    });
};

// Delete transaction by ID
exports.deleteTransactionById = (id, callback) => {
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
    callback(err, { changes: this.changes });
  });
};
