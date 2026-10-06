import { useState } from "react";

const trackingSteps = {
    adulte: [
        {
            title: "Demande enregistrée",
            description: "Votre demande a bien été reçue."
        },
        {
            title: "Vérification des documents",
            description: "Vos documents sont en cours de vérification."
        },
        {
            title: "Contrôle administratif",
            description: "Votre dossier est en cours de contrôle."
        },
        {
            title: "Traitement et impression",
            description: "Votre passeport est en cours de préparation."
        },
        {
            title: "Retrait du passeport",
            description: "Votre passeport est disponible."
        }
    ],

    mineur: [
        {
            title: "Demande enregistrée",
            description: "La demande du mineur a bien été reçue."
        },
        {
            title: "Vérification des documents",
            description: "Les documents du mineur et du représentant légal sont vérifiés."
        },
        {
            title: "Contrôle administratif",
            description: "Le dossier est en cours de contrôle."
        },
        {
            title: "Traitement et impression",
            description: "Le passeport du mineur est en préparation."
        },
        {
            title: "Retrait du passeport",
            description: "Le passeport est disponible."
        }
    ],

    renouvellement: [
        {
            title: "Demande enregistrée",
            description: "Votre demande de renouvellement a bien été reçue."
        },
        {
            title: "Vérification des documents",
            description: "Les documents nécessaires au renouvellement sont vérifiés."
        },
        {
            title: "Ancien passeport vérifié",
            description: "Les informations de votre ancien passeport sont contrôlées."
        },
        {
            title: "Traitement et impression",
            description: "Votre nouveau passeport est en cours de préparation."
        },
        {
            title: "Retrait du passeport",
            description: "Votre nouveau passeport est disponible."
        }
    ]
};

const dossier = {
   numero: "PC-2026-000458",
    date: "02 octobre 2026",
    type: "Passeport biométrique pour adulte",
    typeDemande: "adulte",
    statut: "En cours de vérification",
};

export default function Tracking() {

const steps = trackingSteps[dossier.typeDemande];
const [currentStep, setCurrentStep] = useState(1);

dossier.numero
const copyReceiptNumber = () => {
    navigator.clipboard.writeText(receiptNumber);
    alert("Numéro de récépissé copié !");
};

const downloadReceipt = () => {
    const receiptContent = `
RÉCÉPISSÉ DE DEMANDE

Numéro de récépissé : ${dossier.numero}
Date de soumission : ${dossier.date}
Type de demande : ${dossier.type}
Statut : ${dossier.statut}
    `;

    const blob = new Blob([receiptContent], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${dossier.numero}.txt`;

    link.click();

    URL.revokeObjectURL(url);
};

const goToTracking = () => {
    document.getElementById("suivi").scrollIntoView({
        behavior: "smooth"
    });
};
    
  return (
        <div className="container page">

            <h1>Confirmation et suivi du dossier</h1>

            <div className="tracking-page">

                {/* Carte de confirmation */}
                <section className="confirmation-card">

                    <div className="confirmation-header">
                        <span className="success-icon">✓</span>

                        <div>
                            <h2>Votre demande a bien été enregistrée !</h2>

                            <p>
                                Nous vous remercions pour votre confiance.
                                Votre dossier a été enregistré avec succès.
                            </p>
                        </div>
                    </div>


                    {/* Numéro de récépissé */}
                    <div className="receipt">

                        <div>
                            <span>Numéro de récépissé</span>

                            <strong>{dossier.numero}</strong>
                        </div>

                        <button onClick={copyReceiptNumber}>
                         Copier
                        </button>

                    </div>


                    {/* Informations du dossier */}
                    <div className="request-info">

                        <div className="info-item">
                            <span>Date de soumission</span>
                            <strong>{dossier.date}</strong>
                        </div>

                        <div className="info-item">
                            <span>Type de demande</span>
                            <strong>{dossier.type}</strong>
                        </div>

                        <div className="info-item">
                            <span>Statut actuel</span>
                            <strong>{dossier.statut}</strong>
                        </div>

                    </div>


                    {/* Boutons */}
                    <div className="actions">

                        <button onClick={downloadReceipt}>
                            Télécharger le récépissé
                        </button>

                        <button onClick={goToTracking}>
                            Suivre mon dossier
                        </button>

                    </div>

                </section>
                <section className="tracking-card" id="suivi">

                 <h2>Suivi de votre demande</h2>

                  <p>
                   Vous pouvez suivre l'avancement de votre dossier
                   à tout moment.
                 </p>

                   <div className="timeline">

                 {steps.map((step, index) => (
                   <div className={`timeline-step ${
                      index < currentStep ? "completed" : index === currentStep ? "active": "pending"
                     }`}
                     key={index} >
                    <div className="step-circle">

                     {index < currentStep  ? "✓" : index === currentStep ? "●" : "○"}

                    </div>

                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>

                    </div>
                   ))}

                   </div>

                </section>
              </div>

        </div>
    );
}
