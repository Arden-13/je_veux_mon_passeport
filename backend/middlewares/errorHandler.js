/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

/**
 * Middleware global de gestion des erreurs
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const errorHandler = (err, req, res, next) => {
    // 1. Logge l'erreur dans la console
    console.error(`Erreur interceptée : ${err.message}`);

    // 2. Détermine le code de statut HTTP : 500 par défaut
    const statusCode = err.statusCode || 500;

    // 3. Renvoie une réponse JSON standardisée
    res.status(statusCode).json({
        success: false,
        error: err.message || "Une erreur interne du serveur est survenue"
    })
}