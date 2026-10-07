/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import { z } from 'zod';

/**
 * Schema de validation pour l'étatpe 1 : Identity
 */
const identitySchema = z.object({
    lastName: z.string({ required_error: "Le nom est obligatoire" }).min(2, "Le nom doit faire au moins 2 caractères"),
    firstName: z.string({ required_error: "Le prénom est obligatoire" }).min(2, "Le prénom doit faire au moins 2 caractères"),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "La date doit être au format jj/mm/aaaa"),
    birthPlace: z.string({ required_error: "La ville de naissance est obligatoire" }),
    gender: z.enum(["Masculin", "Féminin"], { required_error: "Le sexe doit être Masculin ou Féminin" }),
    nationality: z.string(),
    nationalIdNumber: z.string().min(5, "Numéro CNI invalide")
})

/**
 * Schema de validation pour l'étatpe 2 : Family
 */
const familySchema = z.object({
    fatherFullName: z.string({ required_error: "Le informations sur votre père sont obligatoires" }),
    motherFullName: z.string({ required_error: "Le informations sur votre mère sont obligatoires" })

})

/**
 * Schema de validation pour l'étatpe 3 : Address
 */
export const addressSchema = z.object({
    residenceAddress: z.string({ required_error: "L'adresse est obligatoire" }).min(5, "L'adresse doit être plus précise"),
    city: z.string({ required_error: "La ville est obligatoire" }),
    country: z.string({ required_error: "Le pays est obligatoire" }),
    phoneNumber: z.string({ required_error: "Le téléphone est obligatoire" }),
    email: z.string({ required_error: "L'e-mail est obligatoire" }).trim().pipe(z.email("Le format de l'adresse e-mail est invalide"))
});

/**
 * Schema de validation pour l'étatpe 4 : Profession
 */
export const professionSchema = z.object({
    profession: z.string().optional(),
    employer: z.string().optional()
});

/**
 * Fonction utilitaire pour : "documentsSchema"
 * @param {*} requiredMessage 
 * @returns 
 */
const requiredUrl = (requiredMessage) => z.string({ required_error: requiredMessage }).pipe(z.url({ message: "Le format de l'URL est invalide" }));

/**
 * Schema de validation pour l'étatpe 5 : Documents
 */
export const documentsSchema = z.object({
    birthCertificateUrl: requiredUrl("L'acte de naissance est obligatoire"),
    nationalIdCardUrl: requiredUrl("La carte d'identité est obligatoire"),
    proofOfAddressUrl: requiredUrl("Le justificatif de domicile est obligatoire"),
    idPhotoUrl: requiredUrl("La photo d'identité est obligatoire")
});

/**
 * Schema de validation pour l'étatpe 6 : Summary
 */
export const summarySchema = z.object({
    isCertified: z.literal(true, {
        errorMap: () => ({ message: "Vous devez certifier l'exactitude des informations pour valider" })
    })
});

/**
 * Cette fonction s'ocuppe de valider les documents envoyées par l'utilisateur à l'étape 1: Identité
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateIdentityStep = (req, res, next) => {
    const validation = identitySchema.safeParse(req.body);

    // Si les données ne sont pas correctes, récupération du tableau d'erreur de "zod" et extraction de la clé "message"
    if (!validation.success) {
        const errorMessagesArray = validation.error.issues;
        const errorMessage = errorMessagesArray.map(error => error.message).join(", ");
        const error = new Error(`Données invalides : ${errorMessage}`);

        error.statusCode = 400;
        return next(error);
    }

    req.body = validation.data;

    next();
}

/**
 * Cette fonction s'ocuppe de valider les documents envoyées par l'utilisateur à l'étape 2: Family
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateFamilyStep = (req, res, next) => {
    const validation = familySchema.safeParse(req.body);

    if (!validation.success) {
        const messagesErreurs = validation.error.issues.map(err => err.message).join(', ');
        const erreur = new Error(`Données de famille invalides : ${messagesErreurs}`);
        erreur.statusCode = 400;
        return next(erreur);
    }

    req.body = validation.data;
    next();
};

/**
 * Cette fonction s'ocuppe de valider les documents envoyées par l'utilisateur à l'étape 3: Address
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateAddressStep = (req, res, next) => {
    const validation = addressSchema.safeParse(req.body);

    if (!validation.success) {
        const messagesErreurs = validation.error.issues.map(err => err.message).join(', ');
        const erreur = new Error(`Données d'adresse invalides : ${messagesErreurs}`);
        erreur.statusCode = 400;
        return next(erreur);
    }

    req.body = validation.data;
    next();
};

/**
 * Cette fonction s'ocuppe de valider les documents envoyées par l'utilisateur à l'étape 4: Profession
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateProfessionStep = (req, res, next) => {
    const validation = professionSchema.safeParse(req.body);

    if (!validation.success) {
        const messagesErreurs = validation.error.issues.map(err => err.message).join(', ');
        const erreur = new Error(`Données de profession invalides : ${messagesErreurs}`);
        erreur.statusCode = 400;
        return next(erreur);
    }

    req.body = validation.data;
    next();
};

/**
 * Cette fonction s'ocuppe de valider les documents envoyées par l'utilisateur à l'étape 5: Documents
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateDocumentsStep = (req, res, next) => {
    const files = req.files;

    if (!files || !files['birthCertificateUrl'] || !files['nationalIdCardUrl'] || !files['proofOfAddressUrl'] || !files['idPhotoUrl']) {
        const erreur = new Error("Les 4 documents (Acte de naissance, CNI, Justificatif de domicile et Photo) sont obligatoires.");
        erreur.statusCode = 400;
        return next(erreur);
    }

    next();
};

/**
 * Cette fonction s'ocuppe de valider les documents envoyées par l'utilisateur à l'étape 6: summary
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateSummaryStep = (req, res, next) => {
    const validation = summarySchema.safeParse(req.body);

    if (!validation.success) {
        const messagesErreurs = validation.error.issues.map(err => err.message).join(', ');
        const erreur = new Error(`Validation finale refusée : ${messagesErreurs}`);
        erreur.statusCode = 400;
        return next(erreur);
    }

    req.body = validation.data;
    next();
};