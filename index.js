const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('./expenses.db', (err) => {
    if (err) {
        console.error('Could not connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Expense Tracker API! Use /transactions to manage your transactions.');
});

// Create transactions table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT
)`);

// Create categories table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL
)`);

// API Endpoints

// Add a new transaction
app.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const sql = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [type, category, amount, date, description], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all transactions
app.get('/transactions', (req, res) => {
    const sql = `SELECT * FROM transactions`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a transaction by ID
app.get('/transactions/:id', (req, res) => {
    const sql = `SELECT * FROM transactions WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(row);
    });
});

// Update a transaction by ID
app.put('/transactions/:id', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const sql = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
    db.run(sql, [type, category, amount, date, description, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction updated successfully' });
    });
});

// Delete a transaction by ID
app.delete('/transactions/:id', (req, res) => {
    const sql = `DELETE FROM transactions WHERE id = ?`;
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    });
});

// Get summary of transactions
app.get('/summary', (req, res) => {
    const sqlIncome = `SELECT SUM(amount) AS totalIncome FROM transactions WHERE type = 'income'`;
    const sqlExpense = `SELECT SUM(amount) AS totalExpense FROM transactions WHERE type = 'expense'`;

    db.get(sqlIncome, [], (err, incomeRow) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        db.get(sqlExpense, [], (err, expenseRow) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            const totalIncome = incomeRow.totalIncome || 0;
            const totalExpense = expenseRow.totalExpense || 0;
            const balance = totalIncome - totalExpense;

            res.json({
                totalIncome,
                totalExpense,
                balance,
            });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
