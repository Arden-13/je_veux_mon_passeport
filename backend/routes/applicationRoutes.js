/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import { validateIdentityStep, validateFamilyStep, validateAddressStep, validateProfessionStep, validateDocumentsStep, validateSummaryStep } from '../middlewares/validateMiddleware.js';
import { initializeApplication, saveApplicationStep } from '../controllers/applicationController.js';
import { uploadDocumentsStep } from '../middlewares/uploadMiddleware.js';
import requireAuth from '../middleware/auth.js';
import express from "express";


const router = express.Router();

/**
 * POST : /api/applications -> Étape 1 : Identité (Création)
 */
router.post("/", requireAuth, validateIdentityStep, initializeApplication);

/**
 * PATCH : /api/applications/:id -> Étapes 2 à 6 : Mise à jour par étape
 */
router.patch('/:id/family', requireAuth, validateFamilyStep, saveApplicationStep);
router.patch('/:id/address', requireAuth, validateAddressStep, saveApplicationStep);
router.patch('/:id/profession', requireAuth, validateProfessionStep, saveApplicationStep);
router.patch('/:id/documents', requireAuth, uploadDocumentsStep, validateDocumentsStep, saveApplicationStep);
router.patch('/:id/submit', requireAuth, validateSummaryStep, saveApplicationStep);

export default router;