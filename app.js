require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { routesInit } = require('./routes/config_routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Mongo connect 
const mongoConnect = require('./db/mongoConnect'); 

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoConnect();

// Routes
routesInit(app);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});