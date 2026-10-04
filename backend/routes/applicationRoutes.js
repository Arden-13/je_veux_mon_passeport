/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import { validateIdentityStep, validateFamilyStep, validateAddressStep, validateProfessionStep, validateDocumentsStep, validateSummaryStep } from '../middlewares/validateMiddleware.js';
import { initializeApplication, saveApplicationStep } from '../controllers/applicationController.js';
import { uploadDocumentsStep } from '../middlewares/uploadMiddleware.js';
import express from "express";


const router = express.Router();

/**
 * POST : /api/applications -> Étape 1 : Identité (Création)
 */
router.post("/", validateIdentityStep, initializeApplication);

/**
 * PATCH : /api/applications/:id -> Étapes 2 à 6 : Mise à jour par étape
 */
router.patch('/:id/family', validateFamilyStep, saveApplicationStep);
router.patch('/:id/address', validateAddressStep, saveApplicationStep);
router.patch('/:id/profession', validateProfessionStep, saveApplicationStep);
router.patch('/:id/documents', uploadDocumentsStep, validateDocumentsStep, saveApplicationStep);
router.patch('/:id/submit', validateSummaryStep, saveApplicationStep);

export default router;