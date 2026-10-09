function Informations() {
  const documents = [
    {
      title: "Pièce d’identité",
      description:
        "Une copie de la CNI ou du passeport en cours de validité."
    },
    {
      title: "Acte de naissance",
      description:
        "Un acte de naissance ou une copie intégrale."
    },
    {
      title: "Justificatif de domicile",
      description:
        "Un certificat de résidence ou un justificatif de domicile."
    },
    {
      title: "Casier judiciaire",
      description:
        "Un casier judiciaire en cours de validité."
    },
    {
      title: "Certificat de nationalité",
      description:
        "Un certificat de nationalité."
    },
    {
      title: "Convocation ou attestation de sélection",
      description:
        "À présenter obligatoirement le jour du rendez-vous."
    }
  ];

  return (
    <section className="informations">
      <div className="information-header">
        <h2>Informations importantes</h2>
        <p>
          Après votre sélection, veuillez préparer les documents
          nécessaires pour votre présentation à la préfecture.
        </p>
      </div>

      <div className="documents-list">
        {documents.map((document, index) => (
          <div className="document-card" key={index}>
            <div className="document-icon">📄</div>

            <div>
              <h3>{document.title}</h3>
              <p>{document.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="important-info">
        <h3>Date de présentation</h3>
        <p>
          La date de présentation à la préfecture vous sera
          communiquée dès qu’elle sera officiellement connue.
        </p>
      </div>

      <div className="important-info">
        <h3>Somme à prévoir</h3>
        <p>
          Prévoyez une somme de <strong>50 000 FCFA</strong>,
          qui devra être apportée lors de votre présentation
          à la préfecture.
        </p>
      </div>

      <div className="warning-info">
        <strong>Important :</strong>
        <p>
          Veillez à préparer tous les documents à l’avance afin
          d’être prêt le jour du rendez-vous.
        </p>
      </div>
    </section>
  );
}

export default Informations;
