/**
 * @fileoverview Contrôleur pour la gestion des demandes de passeport (Epic 3).
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import Application from '../models/Application.js'

/**
 * Étapes 1 :
 * 1. Création du dossier à partir de l'écran "Identité"
 * 2. Validation des champs obligatoires
 * 3. Création du brouillon en BDD
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const initializeApplication = async (req, res, next) => {
    try {
        console.log("Données reçues depuis Postman :", req.body);
        const {
            lastName, firstName, birthDate, birthPlace,
            gender, nationality, nationalIdNumber,
        } = req.body;

        if (!lastName || !firstName || !birthDate || !birthPlace || !gender || !nationality
            || !nationalIdNumber) {

            const error = new Error("Champs d'identité obligatoires manquants pour démarrer la demande");
            error.statusCode = 400;
            return next(error);
        }

        const newApplication = await Application.createApplication(req.body);

        res.status(201).json({
            success: true,
            message: "Demande rédigée avec succès (Étape 1)",
            data: newApplication
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Étapes 2 à 6 : Sauvegarder les écrans suivants (Famille, Adresse, Profession, etc.)
 * 1. Vérification de sécurité de base : s'il existe bien des données disponible
 * 2. Gestion de la validation finale (Étape 6) : si la case de certification des 
 * informations est selectionnée, alors le dossier n'est plus au brouillon
 * 3. Mise à jour via le modèle
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const saveApplicationStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        const stepData = req.body;

        if (Object.keys(stepData).length === 0) {
            const error = new Error("Aucune donnée fournie pour la mise à jour");
            error.statusCode = 400;
            next(error);
        }

        if (stepData.isCertified === true) {
            stepData.status = "submitted"
        }

        const updatedApplication = await Application.updateApplicationStep(id, stepData);

        res.status(200).json({
            success: true,
            data: updatedApplication
        });
    } catch (error) {
        next(error);
    }
}