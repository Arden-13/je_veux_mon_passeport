export default function AgentDashboard() {
    const dossiers = [
        {
            id: "PC-2026-000458",
            nom: "Jean Dupont",
            type: "Passeport biométrique",
            statut: "En cours de vérification"
        },
        {
            id: "PC-2026-000459",
            nom: "Marie Kabeya",
            type: "Passeport biométrique",
            statut: "Contrôle administratif"
        },
        {
            id: "PC-2026-000460",
            nom: "Paul Moukoko",
            type: "Passeport biométrique",
            statut: "Terminé"
        }
    ];

    return (
        <div className="container page">
            <h1>Tableau de bord agent</h1>

            <p>
                Consultez et gérez les dossiers des demandeurs.
            </p>

            <div className="agent-stats">
                <div className="stat-card">
                    <span>Total des dossiers</span>
                    <strong>{dossiers.length}</strong>
                </div>

                <div className="stat-card">
                    <span>En cours</span>
                    <strong>
                        {
                            dossiers.filter(
                                dossier =>
                                    dossier.statut !== "Terminé"
                            ).length
                        }
                    </strong>
                </div>

                <div className="stat-card">
                    <span>Terminés</span>
                    <strong>
                        {
                            dossiers.filter(
                                dossier =>
                                    dossier.statut === "Terminé"
                            ).length
                        }
                    </strong>
                </div>
            </div>

            <div className="dossiers-table">
                <h2>Liste des dossiers</h2>

                {dossiers.map(dossier => (
                    <div className="dossier-row" key={dossier.id}>
                        <strong>{dossier.id}</strong>

                        <span>{dossier.nom}</span>

                        <span>{dossier.type}</span>

                        <span>{dossier.statut}</span>

                        <button>Voir le dossier</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
