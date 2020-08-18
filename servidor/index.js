const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

// create server
const app = express();

// Connect to DB
connectDB();

// Enable cors
app.use(cors());

// Enable express.json
app.use(express.json({
    extended: true
}));

// App port
const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/users', require('./routes/users.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/projects', require('./routes/projects.js'));
app.use('/api/tasks', require('./routes/tasks.js'));

// Run app
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});