const express = require('express');
const sqlite3 = require('sqlite3');
const bodyparser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};


const app = express();
const port = 8081;

const db = new sqlite3.Database('C:/Users/eddyg/OneDrive/Desktop/myfitness-main/backend/myfitness.db');
app.use(express.json());
app.use(cors(corsOptions));

const calculateBMI = (height, weight) => {
    return parseFloat(weight / height * height * (0.0001))
}

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

app.get('/api/exongoal/:id', (req, res) => {
    const id = req.params.id; // Use req.params.id to get the value of the route parameter
    db.all('SELECT exercisename, exercisetype, exercisenbOfSets, exerciseNbOfReps FROM exercise JOIN workout ON exercise.workoutid = workout.workoutid JOIN goal ON workout.goalid = goal.goalID WHERE goal.goalid = ?', [parseInt(id)], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});


app.get('/api/classes', (req, res) => {
    db.all('SELECT * FROM class', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });

})

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
    console.log(req.body);
    const {name, email, password, gender, height, weight, goalID} = req.body;
    const BMI = calculateBMI(weight,height);
    db.run('INSERT INTO user (username, useremail, userpassword, usergender, userheight, userweight, userbmi, goalid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, email, password, gender, height, weight, BMI ,goalID], (err) => {
        if (err) {
            console.error(err.message);
            console.log(err.message);       
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

app.get('/api/goal/:username', (req, res) => {
    const user = req.params.username;
    db.all(
        'SELECT * from user WHERE user.usermail = ?'
        [user],
        (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else if (rows.length > 0) {
                res.json({ success: true, data: rows }); 
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        }
    );
});


app.get('/api/mealplan/:id', (req, res) => {
    const id = req.params.id; 
    
    db.all('SELECT * FROM hasfood JOIN food ON hasfood.foodid = food.foodid JOIN nutritionplan ON hasfood.planid = nutritionplan.planid WHERE hasfood.planid = ?', [parseInt(id)], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (rows.length > 0) {
            res.json({ success: true, data: rows }); 
        } else {
            res.status(404).json({ success: false, message: 'Plan not found' });
        }
    });
});



app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
