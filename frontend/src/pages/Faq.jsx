export default function Faq() {
    const questions = [
        {
            question: "Comment effectuer une demande ?",
            answer:
                "Choisissez la démarche souhaitée, remplissez le formulaire et envoyez les documents demandés."
        },
        {
            question: "Comment suivre mon dossier ?",
            answer:
                "Utilisez votre numéro de récépissé dans la rubrique de suivi afin de consulter l'état de votre dossier."
        },
        {
            question: "Quels documents dois-je fournir ?",
            answer:
                "Les documents nécessaires dépendent du type de démarche. Ils sont indiqués pendant le remplissage du formulaire."
        },
        {
            question: "Combien de temps prend le traitement ?",
            answer:
                "Le délai dépend du type de demande et des vérifications administratives nécessaires."
        },
        {
            question: "Que faire en cas de problème avec mon dossier ?",
            answer:
                "Consultez les informations de votre dossier ou contactez le centre administratif concerné."
        }
    ];

    return (
        <div className="container page">
            <h1>Questions fréquentes</h1>

            <p>
                Retrouvez les réponses aux questions les plus fréquentes.
            </p>

            <div className="faq-list">
                {questions.map((item, index) => (
                    <details className="faq-item" key={index}>
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                    </details>
                ))}
            </div>
        </div>
    );
}
