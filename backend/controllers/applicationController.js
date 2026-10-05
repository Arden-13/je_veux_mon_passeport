/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import Application from '../models/Application.js';
import supabase from '../config/supabaseClient.js'; // Ajout du client Supabase

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
        const {
            lastName, firstName, birthDate, birthPlace,
            gender, nationality, nationalIdNumber,
        } = req.body;

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
        const { id } = req.params; // C'est ton tracking_number
        const stepData = req.body;
        const isBodyEmpty = Object.keys(req.body).length === 0;
        const isFilesEmpty = !req.files || Object.keys(req.files).length === 0;

        if (isBodyEmpty && isFilesEmpty) {
            const erreur = new Error("Aucune donnée fournie pour la mise à jour");
            erreur.statusCode = 400;
            return next(erreur);
        }

        if (req.files) {

            // Envoi le buffer garder en mémoire par (Multer) vers Supabase
            const uploadToSupabase = async (file, folderName) => {
                const fileExtension = file.originalname.split('.').pop();

                // Stock les fichiers dans un dossier portant le nom du tracking_number 
                // (identifiant unique généré)
                const fileName = `${id}/${Date.now()}-${folderName}.${fileExtension}`;

                const { data, error } = await supabase.storage
                    .from('passport_documents')
                    .upload(fileName, file.buffer, {
                        contentType: file.mimetype,
                        upsert: true
                    });

                if (error) throw new Error(`Upload échoué pour ${folderName} : ${error.message}`);

                const { data: publicUrlData } = supabase.storage
                    .from('passport_documents')
                    .getPublicUrl(fileName);

                return publicUrlData.publicUrl;
            };

            // Récupération des fichiers : req.files['nomDuChamp'][0] récupère le premier fichier du tableau
            if (req.files['birthCertificateUrl']) {
                stepData.birthCertificateUrl = await uploadToSupabase(req.files['birthCertificateUrl'][0], 'birth-certificate');
            }
            if (req.files['nationalIdCardUrl']) {
                stepData.nationalIdCardUrl = await uploadToSupabase(req.files['nationalIdCardUrl'][0], 'national-id');
            }
            if (req.files['proofOfAddressUrl']) {
                stepData.proofOfAddressUrl = await uploadToSupabase(req.files['proofOfAddressUrl'][0], 'proof-of-address');
            }
            if (req.files['idPhotoUrl']) {
                stepData.idPhotoUrl = await uploadToSupabase(req.files['idPhotoUrl'][0], 'id-photo');
            }
        }

        if (stepData.isCertified === true || stepData.isCertified === 'true') {
            stepData.status = "submitted";
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