const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database.cjs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all businesses
app.get('/api/businesses', (req, res) => {
    const sql = "SELECT * FROM businesses";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Register a new business
app.post('/api/businesses', (req, res) => {
    const { id, legalName, tradeName, type, address, branchName, contactNumber, email, gstNumber, status, registrationDate, riskScore } = req.body;
    const sql = `INSERT INTO businesses (id, legalName, tradeName, type, address, branchName, contactNumber, email, gstNumber, status, registrationDate, riskScore) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    const params = [id, legalName, tradeName, type, address, branchName, contactNumber, email, gstNumber, status, registrationDate, riskScore];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": req.body,
            "id": this.lastID
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
