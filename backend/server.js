const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};


const app = express();
const port = 8081;

const db = new sqlite3.Database('C:/Users/eddyg/OneDrive/Desktop/myfitness-main/backend/myfitness1.db');
app.use(cors(corsOptions));

app.get('/api/data', (req, res) => {
    db.all('SELECT * FROM exercise', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM user', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});


app.post('/api/signup', (req, res) => {
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const weight = req.body.weight;
    const height = req.body.height;
    const gender = req.body.gender;

    db.query('INSERT INTO user (userName, userEmail, userPassword, userGender, userHeight, userWeight, userGoalID) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, password, gender, parseFloat(height), parseFloat(weight), 2], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('User registered successfully');
            res.status(200).json({ message: 'User registered successfully' });
        }
    });
    
})




app.get('/api/signin', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    db.get('SELECT * FROM user WHERE userEmail = ? AND userPassword = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (row) {
            res.json({ success: true, user: row });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});


app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
