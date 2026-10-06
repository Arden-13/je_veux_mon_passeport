import { useNavigate } from "react-router-dom";

export default function RequestType() {
    const navigate = useNavigate();

    const chooseType = (type) => {
        localStorage.setItem("typeDemande", type);
        navigate("/enrollment");
    };

    return (
        <div className="container page">
            <h1>Choisissez votre type de demande</h1>

            <div className="request-types">
                <button onClick={() => chooseType("adulte")}>
                    Passeport pour adulte
                </button>

                <button onClick={() => chooseType("mineur")}>
                    Passeport pour mineur
                </button>

                <button onClick={() => chooseType("renouvellement")}>
                    Renouvellement de passeport
                </button>
            </div>
        </div>
    );
}