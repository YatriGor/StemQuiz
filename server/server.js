import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
config();

// Clerk middleware for protected routes
const requireAuth = ClerkExpressWithAuth({
    secretKey: process.env.CLERK_SECRET_KEY
});

// Routes
app.use('/api', router);

// Apply auth middleware to specific routes
app.use('/api/questions', requireAuth);
app.use('/api/result', requireAuth);

// Default route
app.get('/', (req, res) => {
    try {
        res.json("Welcome to the Quiz API");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Port configuration
const port = process.env.PORT || 8080;

// Database connection and server startup
connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running successfully on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error("Database connection failed:", error.message);
    });
