export default function Centres() {
    const centres = [
        {
            nom: 'Centre administratif Brazzaville',
            adresse: 'Brazzaville',
            horaires: '08h00 - 16h00'
        },
        {
            nom: 'Centre administratif Pointe-Noire',
            adresse: 'Pointe-Noire',
            horaires: '08h00 - 16h00'
        },
        {
            nom: 'Centre administratif Dolisie',
            adresse: 'Dolisie',
            horaires: '08h00 - 16h00'
        }
    ]

    return (
        <div className="container page">
            <div className="section-heading">
                <p className="eyebrow">Nos centres d&apos;enrôlement</p>
                <h1>Nos centres d&apos;enrôlement</h1>
                <p>Retrouvez les centres administratifs disponibles pour votre demande.</p>
            </div>

            <div className="centres-grid">
                {centres.map((centre, index) => (
                    <div className="centre-card" key={index}>
                        <h2>{centre.nom}</h2>
                        <p><strong>Adresse :</strong> {centre.adresse}</p>
                        <p><strong>Horaires :</strong> {centre.horaires}</p>
                        <button type="button">Voir sur la carte</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
