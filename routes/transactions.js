// routes/transactions.js
const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transaction');

// POST /transactions - Add a new transaction
router.post('/', (req, res) => {
  transactionModel.addTransaction(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
});

// GET /transactions - Get all transactions
router.get('/', (req, res) => {
  transactionModel.getAllTransactions((err, transactions) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(transactions);
  });
});

// GET /transactions/:id - Get a transaction by ID
router.get('/:id', (req, res) => {
  transactionModel.getTransactionById(req.params.id, (err, transaction) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  });
});

// PUT /transactions/:id - Update a transaction by ID
router.put('/:id', (req, res) => {
  transactionModel.updateTransactionById(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(result);
  });
});

// DELETE /transactions/:id - Delete a transaction by ID
router.delete('/:id', (req, res) => {
  transactionModel.deleteTransactionById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(result);
  });
});

module.exports = router;
