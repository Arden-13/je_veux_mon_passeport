"use strict"

import applicationRouter from './routes/applicationRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import express from 'express';
import cors from 'cors';

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Routes
 */
app.get('/', (req, res) => {
    res.send('API backend en ligne !');
});

// Gestion des routes de création de dossier
app.use('/api/applications', applicationRouter);

/**
 * Gestion d'erreur
 */
app.use(errorHandler)

export default app;