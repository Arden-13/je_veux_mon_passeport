/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import multer from 'multer';

const storage = multer.memoryStorage();
const filesType = ['image/jpeg', 'image/png', 'application/pdf'];

/**
 * Vérifie que les fichiers envoyés par sont en format attendu
 * @param {*} req 
 * @param {*} file 
 * @param {*} cb 
 * @returns 
 */
const fileFilter = (req, file, cb) => {
    if (!filesType.includes(file.mimetype)) {
        return cb(new Error("Seuls les formats PDF, JPG et PNG sont autorisés"), false);
    }

    cb(null, true);
}

/**
 * @param {number} sizeInMB 
 * @returns la taille en MB
 */
const fileLimitSize = (sizeInMB) => {
    return sizeInMB * 1024 * 1024;
}

/**
 * Spécifie ou les fichiers seront stockés, le format de fichier correct
 * et la taille de chaque fichier
 */
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: fileLimitSize(5)
    }
})

/**
 * S'assure que chaque champ du formulaire 1 seul fichier
 */
export const uploadDocumentsStep = upload.fields([
    { name: 'birthCertificateUrl', maxCount: 1 },
    { name: 'nationalIdCardUrl', maxCount: 1 },
    { name: 'proofOfAddressUrl', maxCount: 1 },
    { name: 'idPhotoUrl', maxCount: 1 }
])