// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); // Import mysql2 for MariaDB
const config = require('./config'); // Import the configuration
const fs = require('fs'); // Import the file system module

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MariaDB database
const db = mysql.createConnection(config.db);

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MariaDB:', err.message);
        throw err;
    }
    console.log('MariaDB Connected...');
});

// Endpoint to get all transactions
app.get('/api/transactions', (req, res) => {
    const sql = 'SELECT * FROM transactions';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Endpoint to add a new transaction
app.post('/api/transactions', (req, res) => {
    const { description, amount, date, type } = req.body;
    const sql = 'INSERT INTO transactions (description, amount, date, type) VALUES (?, ?, ?, ?)';
    db.query(sql, [description, amount, date, type], (err, result) => {
        if (err) {
            console.error('Error adding transaction:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, description, amount, date, type });
    });
});

// Endpoint to reset and backup transactions
app.post('/api/reset-transactions', (req, res) => {
    const backupSql = 'SELECT * FROM transactions';
    db.query(backupSql, (err, results) => {
        if (err) {
            console.error('Error fetching transactions for backup:', err.message);
            return res.status(500).json({ error: err.message });
        }

        // Backup data to a JSON file
        fs.writeFile('backup.json', JSON.stringify(results, null, 2), (err) => {
            if (err) {
                console.error('Error writing backup file:', err.message);
                return res.status(500).json({ error: err.message });
            }
            console.log('Data backed up to backup.json');

            // Clear the transactions table
            const clearSql = 'DELETE FROM transactions';
            db.query(clearSql, (err, result) => {
                if (err) {
                    console.error('Error clearing transactions:', err.message);
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Transactions cleared and backed up successfully' });
            });
        });
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});