const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Connect to MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submission
app.post('/signup', async (req, res) => {
    try {
        const db = client.db('database');
        const collection = db.collection('server');
        const { firstName, lastName, email, contactNumber } = req.body;
        const result = await collection.insertOne({ firstName, lastName, email, contactNumber });
        console.log('New user added:', result.ops[0]);
        res.send('User signed up successfully!');
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('Error signing up user');
    }
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
