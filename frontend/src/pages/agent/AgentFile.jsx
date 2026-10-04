import { useParams } from "react-router-dom";

export default function AgentFile() {
    const { id } = useParams();

    const dossier = {
        id: id,
        nom: "Jean Dupont",
        email: "jean.dupont@email.com",
        telephone: "+242 06 000 00 00",
        type: "Passeport biométrique pour adulte",
        date: "02 octobre 2026",
        statut: "En cours de vérification"
    };

    return (
        <div className="container page">
            <h1>Dossier {dossier.id}</h1>

            <div className="agent-file">
                <h2>Informations du demandeur</h2>

                <div className="file-info">
                    <div>
                        <span>Nom complet</span>
                        <strong>{dossier.nom}</strong>
                    </div>

                    <div>
                        <span>Email</span>
                        <strong>{dossier.email}</strong>
                    </div>

                    <div>
                        <span>Téléphone</span>
                        <strong>{dossier.telephone}</strong>
                    </div>

                    <div>
                        <span>Type de demande</span>
                        <strong>{dossier.type}</strong>
                    </div>

                    <div>
                        <span>Date de soumission</span>
                        <strong>{dossier.date}</strong>
                    </div>

                    <div>
                        <span>Statut</span>
                        <strong>{dossier.statut}</strong>
                    </div>
                </div>

                <div className="file-actions">
                    <button>Valider le dossier</button>
                    <button>Demander une correction</button>
                </div>
            </div>
        </div>
    );
}
