export default function Centres() {
    const centres = [
        {
            nom: "Centre administratif Brazzaville",
            adresse: "Brazzaville",
            horaires: "08h00 - 16h00"
        },
        {
            nom: "Centre administratif Pointe-Noire",
            adresse: "Pointe-Noire",
            horaires: "08h00 - 16h00"
        },
        {
            nom: "Centre administratif Dolisie",
            adresse: "Dolisie",
            horaires: "08h00 - 16h00"
        }
    ];

    return (
        <div className="container page">
            <h1>Nos centres</h1>

            <p>
                Retrouvez les centres administratifs disponibles.
            </p>

            <div className="centres-grid">
                {centres.map((centre, index) => (
                    <div className="centre-card" key={index}>
                        <h2>{centre.nom}</h2>
                        <p>
                            <strong>Adresse :</strong> {centre.adresse}
                        </p>
                        <p>
                            <strong>Horaires :</strong> {centre.horaires}
                        </p>

                        <button>Voir sur la carte</button>
                    </div>
                ))}
            </div>
        </div>
    );
}