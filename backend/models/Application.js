/**
 * @author Grasty Ghyvet SAMBA DINAULT <grastysamba01@gmail.com>
 * @created 2026-10-04
 */

"use strict"

class Application {
    constructor(data) {
        this.id = data.id || null;
        this.status = data.status || 'draft'; // 'draft' = brouillon
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

        // STEP 4 : PROFESSION (optional)
        this.profession = data.profession || null;
        this.employer = data.employer || null;

        // STEP 5 : DOCUMENTS
        this.birthCertificateUrl = data.birthCertificateUrl || null; // Acte de naissance
        this.nationalIdCardUrl = data.nationalIdCardUrl || null;     // Carte nationale d'identité
        this.proofOfAddressUrl = data.proofOfAddressUrl || null;     // Justificatif de domicile
        this.idPhotoUrl = data.idPhotoUrl || null;                  // Photo d'identité

        // STEP 6 : SUMMARY
        this.isCertified = data.isCertified || false;               // Case "Je certifie l'exactitude..."
    }

    /**
     * 
     * @param {Application} application 
     * @returns 
     */
    static async createApplication(application) {
        try {
            const newApplication = new Application(application);
            /**
             * Simulation de l'accès à la méthode POST pour la création du dossier (à modifier)
             */
            return new Promise((resolve) => {
                setTimeout(() => {
                    newApplication.id = "APP-" + Math.floor(Math.random() * 100000);
                    resolve(newApplication);
                }, 500);
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    /**
     * Cette méthode est appelée à chaque dans le parcours de création de dossier (PUT
     * Elle prend en parametre l'id du dossier et les données de l'étape suivante
     * @param {number} id 
     * @param {*} stepData 
     */
    static async updateApplicationStep(id, stepData) {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: id,
                        message: "Étape enregistrée avec succès",
                        updatedFields: stepData
                    });
                }, 500);
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

export default Application;