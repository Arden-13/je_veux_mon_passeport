/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

import supabase from '../config/supabaseClient.js';
import crypto from 'crypto';

class Application {
    constructor(data) {
        this.id = data.id || null;
        this.trackingNumber = data.trackingNumber || null;
        this.status = data.status || 'draft';
        this.createdAt = data.createdAt || new Date().toISOString();

        // STEP 1 : IDENTITY
        this.lastName = data.lastName || null;
        this.firstName = data.firstName || null;
        this.birthDate = data.birthDate || null;
        this.birthPlace = data.birthPlace || null;
        this.gender = data.gender || null;
        this.nationality = data.nationality || 'Congolaise';
        this.nationalIdNumber = data.nationalIdNumber || null;

        // STEP 2 : FAMILY
        this.fatherFullName = data.fatherFullName || null;
        this.motherFullName = data.motherFullName || null;

        // STEP 3 : ADDRESS
        this.residenceAddress = data.residenceAddress || null;
        this.city = data.city || null;
        this.country = data.country || 'Congo';
        this.phoneNumber = data.phoneNumber || null;
        this.email = data.email || null;

        // STEP 4 : PROFESSION
        this.profession = data.profession || null;
        this.employer = data.employer || null;

        // STEP 5 : DOCUMENTS
        this.birthCertificateUrl = data.birthCertificateUrl || null;
        this.nationalIdCardUrl = data.nationalIdCardUrl || null;
        this.proofOfAddressUrl = data.proofOfAddressUrl || null;
        this.idPhotoUrl = data.idPhotoUrl || null;

        // STEP 6 : SUMMARY
        this.isCertified = data.isCertified || false;
    }

    /**
     * Crée un nouveau dossier de demande (Étape 1 : Identité)
     * @param {Object} identityData - Les données d'identité envoyées par le contrôleur
     * @returns {Object} Le dossier créé dans Supabase
     */
    static async createApplication(identityData) {
        try {
            // Génération du numéro de suivi avec crypto (ex: APP-2026-8A3B9F)
            const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
            const trackingNumber = `APP-${new Date().getFullYear()}-${randomHex}`;

            // Conversion du format de date en anglais pour qu'elle soit accepté par PostgreSQL
            const [day, month, year] = identityData.birthDate.split('/');
            const formattedBirthDate = `${year}-${month}-${day}`;

            const dbPayload = {
                tracking_number: trackingNumber,
                status: 'draft',
                last_name: identityData.lastName,
                first_name: identityData.firstName,
                birth_date: formattedBirthDate,
                birth_place: identityData.birthPlace,
                gender: identityData.gender,
                nationality: identityData.nationality,
                national_id_number: identityData.nationalIdNumber
            };

            const { data, error } = await supabase
                .from('applications')
                .insert([dbPayload])
                .select()
                .single();

            if (error) {
                const err = new Error(`Erreur Supabase: ${error.message}`);
                err.code = error.code;
                throw err;
            }

            return data;
        } catch (error) {
            console.error("Erreur dans createApplication :", error);
            throw error;
        }
    }

    /**
     * Met à jour une étape spécifique du dossier
     * @param {string} trackingNumber - L'identifiant public du dossier (ex: APP-2026-XYZ)
     * @param {Object} stepData - Les données de l'étape à mettre à jour
     * @returns {Object} Le dossier mis à jour
     */
    static async updateApplicationStep(trackingNumber, stepData) {
        try {
            // Dictionnaire de traduction dynamique pour traduire n'importe quelle champ
            const mapToDB = {
                // Etape 2
                fatherFullName: 'father_name',
                motherFullName: 'mother_name',
                // Etape 3
                residenceAddress: 'address',
                city: 'city',
                phoneNumber: 'phone_number',
                // Etape 4
                profession: 'profession',
                employer: 'employer_name',
                // Etape 5
                birthCertificateUrl: 'birth_certificate_url',
                nationalIdCardUrl: 'national_id_card_url',
                proofOfAddressUrl: 'proof_of_address_url',
                idPhotoUrl: 'id_photo_url',
                // Etape 6
                isCertified: 'is_certified',
                status: 'status'
            };

            const dbPayload = {};

            for (const [jsKey, value] of Object.entries(stepData)) {
                const dbKey = mapToDB[jsKey];
                if (dbKey) {
                    dbPayload[dbKey] = value;
                }
            }

            const { data, error } = await supabase
                .from('applications')
                .update(dbPayload)
                .eq('tracking_number', trackingNumber) // La condition WHERE
                .select()
                .single();

            if (error) {
                const err = new Error(`Erreur Supabase lors de la mise à jour: ${error.message}`);
                err.code = error.code;
                throw err;
            }

            return data;
        } catch (error) {
            console.error("Erreur dans updateApplicationStep :", error);
            throw error;
        }
    }
}

export default Application;