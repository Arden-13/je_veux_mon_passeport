# Frontend : Je veux mon passeport

Application web (React + Vite) du projet **Je veux mon passeport**, une plateforme de pré-enrôlement en ligne pour une demande de passeport. Ce document décrit le travail des trois personnes de l'équipe frontend, explique comment installer le projet et comment travailler ensemble sans se gêner.

> Projet pédagogique (Akieni Academy). Utilisez uniquement des **données fictives** pour les tests et la démonstration.

---

## Sommaire

1. [Démarrage rapide](#1-démarrage-rapide)
2. [Technologies](#2-technologies)
3. [Structure du code](#3-structure-du-code)
4. [Qui a fait quoi](#4-qui-a-fait-quoi)
5. [Le formulaire selon le type de demande](#5-le-formulaire-selon-le-type-de-demande)
6. [Données partagées entre les écrans](#6-données-partagées-entre-les-écrans)
7. [Composants et outils partagés](#7-composants-et-outils-partagés)
8. [Connexion avec le backend et Supabase](#8-connexion-avec-le-backend-et-supabase)
9. [Travailler avec Git](#9-travailler-avec-git)
10. [Règles pour éviter les conflits](#10-règles-pour-éviter-les-conflits)
11. [Ajouter une page ou une étape](#11-ajouter-une-page-ou-une-étape)
12. [État d'avancement](#12-état-davancement)
13. [Problèmes fréquents](#13-problèmes-fréquents)

---

## 1. Démarrage rapide

**Prérequis** : [Node.js](https://nodejs.org) 22.12 ou plus (`node -v`) et [Git](https://git-scm.com).

```bash
git clone https://github.com/Arden-13/je_veux_mon_passeport.git
cd je_veux_mon_passeport
git checkout develop
git pull
cd frontend
npm install
npm run dev
```

Le site est disponible sur **http://localhost:5173/**. Pour arrêter le serveur : `Ctrl + C`.

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le site en développement (il se met à jour tout seul) |
| `npm run build` | Construit la version de production |
| `npm run preview` | Prévisualise la version construite |
| `npm run lint` | Vérifie la qualité du code |

**Variables d'environnement.** Créez un fichier **`frontend/.env.local`** (ignoré par Git, ne l'envoyez jamais sur GitHub) :

```
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-publishable
```

| Variable | Rôle |
|---|---|
| `VITE_API_URL` | Adresse de l'API du backend (par défaut `http://localhost:3000/api`) |
| `VITE_SUPABASE_URL` | Adresse du projet Supabase (connexion des utilisateurs) |
| `VITE_SUPABASE_ANON_KEY` | Clé **publishable** de Supabase (elle commence par `sb_publishable_`) |

> **Attention** : n'utilisez jamais la clé **secrète** (`sb_secret_...`) dans le frontend. Supabase la bloque, et n'importe qui peut lire ce qui se trouve dans un navigateur. Les vraies valeurs se demandent à l'équipe backend.
> Redémarrez `npm run dev` après toute modification de ce fichier.

---

## 2. Technologies

- **React** : écrans construits en composants
- **Vite** : outil de développement et de construction
- **React Router** : navigation entre les pages
- **Supabase JS** (`@supabase/supabase-js`) : connexion des utilisateurs
- **CSS** avec variables (aucune bibliothèque de style)
- **ESLint** : contrôle de la qualité du code

---

## 3. Structure du code

```
frontend/
├── public/assets/    Images 
├── index.html        Page de départ (langue déclarée : fr)
└── src/
    ├── components/   Header, Footer, Stepper, FormField, champ mot de passe...
    ├── context/      EnrollmentContext : données saisies, partagées entre les écrans
    ├── hooks/        useStepForm (formulaire d'étape), useDemande (parcours du type de demande)
    ├── pages/        Une page par écran
    │   ├── steps/    Une étape du formulaire par fichier (avec son CSS)
    │   └── agent/    Espace agent
    ├── services/     api.js : appels au backend
    ├── utils/        constants.js, demandeConfig.js, dossier.js, validators.js
    ├── supabaseClient.js   Client Supabase (connexion des utilisateurs)
    ├── App.jsx       Déclaration des routes
    ├── main.jsx      Point d'entrée
    └── index.css     Couleurs (variables) et styles de base
```

---

## 4. Qui a fait quoi

Le frontend suit la maquette en 7 écrans, répartis entre trois personnes. Les routes sont toutes déclarées dans `App.jsx`.

| | Écrans de la maquette | Branche d'origine |
|---|---|---|
| **Diaby** | 1 Accueil, 2 Inscription / Connexion, 3 Type de demande | `feature/page-accueil-authentification-demande` |
| **Akiana** | 4 Formulaire, 5 Pièces justificatives, 6 Récapitulatif | `feature/parcours-dossier-a`, `feature/famille-situation-a` |
| **Louamba** | 7 Confirmation et suivi, espace agent, pages d'information | *à compléter* |

> Les prénoms sont à ajouter dans ce tableau par chaque personne.

### 4.1 Diaby : accueil, authentification, type de demande

| Écran | Route | Rôle |
|---|---|---|
| Accueil | `/` | Présentation du service, bouton « Commencer mon pré-enrôlement » |
| Inscription et connexion | `/inscription` | Création de compte et connexion (e-mail et mot de passe, bouton pour afficher le mot de passe) |
| Type de demande | `/demande/type` | Choix entre adulte, mineur et renouvellement, puis passage à l'étape Identité |

- **Authentification** : elle passe par **Supabase** (`src/supabaseClient.js`). Les styles des formulaires sont dans `authForms.css`.
- **Type de demande** : `pages/RequestType.jsx`. Trois cartes avec leurs icônes (`public/assets/adulte.png`, `enfant.png`, `renouvelable.png`). Le choix est enregistré avec `update('type', { choix })` dans le contexte, valeurs `adulte`, `mineur` ou `renouvellement`. Ce choix décide de tout le formulaire (voir la section 5).
- **Fichiers principaux** : `pages/Home.jsx`, `pages/Auth.jsx`, `pages/RequestType.jsx`, `authForms.css`, `supabaseClient.js`.

*À compléter par la personne 1 : liste exacte des fichiers d'authentification et comportement après la connexion (page d'arrivée, déconnexion).*

### 4.2 Akiana: formulaire, pièces justificatives, récapitulatif

| Écran | Route | Fichier |
|---|---|---|
| Identité | `/demande/identite` | `pages/steps/IdentiteStep.jsx` |
| Famille | `/demande/famille` | `pages/steps/FamilleStep.jsx` |
| Adresse et contact | `/demande/adresse` | `pages/steps/AdresseStep.jsx` |
| Profession (facultative) | `/demande/profession` | `pages/steps/ProfessionStep.jsx` |
| Pièces justificatives | `/demande/documents` | `pages/steps/DocumentsStep.jsx` |
| Récapitulatif | `/demande/recapitulatif` | `pages/steps/RecapitulatifStep.jsx` |

- La page `pages/Enrollment.jsx` affiche la barre d'étapes (`Stepper`) puis l'étape demandée.
- Chaque champ est contrôlé (champs obligatoires, format de l'e-mail et du téléphone, âge selon le type, fichiers de 5 Mo maximum en PDF, JPG ou PNG).
- Le **récapitulatif** affiche les données par section avec un lien « Modifier », signale ce qui manque avec un lien vers l'étape concernée, et n'autorise la validation que si le dossier est complet et la case de confirmation cochée.
- Les **icônes des pièces** sont des images de `public/assets/`, déclarées dans `utils/demandeConfig.js`.

### 4.3 Louamba : confirmation, suivi, espace agent, pages d'information

| Écran | Route | Fichier | Rôle prévu |
|---|---|---|---|
| Confirmation | `/confirmation` | `pages/Confirmation.jsx` | Message de réussite, numéro de référence, date, type de demande, statut |
| Suivi du dossier | `/suivi` | `pages/Tracking.jsx` | Saisie de la référence et frise des statuts |
| Espace agent (liste) | `/agent` | `pages/agent/AgentDashboard.jsx` | Liste des dossiers soumis |
| Espace agent (détail) | `/agent/dossiers/:id` | `pages/agent/AgentFile.jsx` | Consultation, changement de statut, commentaire |
| Informations, centres, FAQ | `/informations`, `/centres`, `/faq` | `pages/Informations.jsx`, `Centres.jsx`, `Faq.jsx` | Pages d'information |

**Statuts d'un dossier** (frise de suivi, liste `STATUSES` dans `utils/constants.js`) :
Demande enregistrée, Vérification des documents, Contrôle administratif, Traitement et impression, Retrait du passeport.

*À compléter par la personne 3 : ce qui est réellement terminé, composants créés (par exemple la frise des statuts) et appels à l'API utilisés.*

---

## 5. Le formulaire selon le type de demande

Sur la page **Type de demande**, le citoyen choisit **adulte**, **mineur** ou **renouvellement**. Ce choix décide de ce que demande le formulaire.

| | Adulte | Mineur | Renouvellement |
|---|---|---|---|
| **Étapes** | Identité, Famille, Adresse, Profession, Documents, Récapitulatif | Identité, Famille, Adresse, Documents, Récapitulatif | Identité, Adresse, Documents, Récapitulatif |
| **Identité** | CNI obligatoire, 18 ans ou plus | Sans CNI, moins de 18 ans | CNI, numéro et date d'expiration du passeport actuel |
| **Famille** | Parents, situation matrimoniale, enfants (1 à 10) | Parents, consentement des deux parents | Étape absente |
| **Documents** | Acte de naissance, CNI, justificatif de domicile, photo | Acte de naissance, justificatif de domicile, photo, pièce d'identité du père et de la mère | Passeport actuel, CNI, justificatif de domicile, photo |

> Ces règles s'appuient sur les règles métier BR01, BR04 et BR06 du dossier d'analyse. .

**Où modifier ces règles** : uniquement dans `src/utils/demandeConfig.js`, objet `REQUEST_CONFIG`. Pour ajouter un document, on le déclare dans l'objet `DOC` du même fichier, puis on l'ajoute à la liste du type concerné. La barre d'étapes, les boutons Précédent et Suivant, le récapitulatif et le contrôle de complétude suivent le type automatiquement grâce au hook `useDemande`.

**Si aucun type n'a été choisi** (page rechargée, accès direct), le type par défaut est `adulte`. Pour tester un autre parcours sans passer par la page de choix, modifier temporairement `TYPE_DEFAUT` dans `demandeConfig.js`, **puis le remettre à `'adulte'` avant d'enregistrer**.

---

## 6. Données partagées entre les écrans

Pendant la saisie, les données sont gardées dans `EnrollmentContext`, rangées par clé :

| Clé | Contenu | Écrit par |
|---|---|---|
| `type` | `choix` : `adulte`, `mineur` ou `renouvellement` | Personne 1 |
| `identite` | nom, prenoms, dateNaissance, lieuNaissance, sexe, nationalite, numeroCni (adulte, renouvellement), numeroPasseport et dateExpirationPasseport (renouvellement) | Personne 2 |
| `famille` | nomPere, nomMere, situationMatrimoniale, aEnfants, nombreEnfants (adulte), consentementParents (mineur) | Personne 2 |
| `adresse` | rue, ville, pays, telephone, email | Personne 2 |
| `profession` | profession, employeur (adulte) | Personne 2 |
| `documents` | acteNaissance, cni, justificatifDomicile, photo, passeportActuel, cniPere, cniMere (selon le type), chacun avec name, size et file | Akiana |

```jsx
import { useEnrollment } from '../context/EnrollmentContext'

const { data, update } = useEnrollment()
update('adresse', { ville: 'Brazzaville' })   // enregistre
console.log(data.adresse?.ville)               // lit
```


---

## 7. Composants et outils partagés

| Élément | Rôle |
|---|---|
| `Header`, `Footer` | En-tête et pied de page, déjà placés dans `App.jsx` |
| `Stepper` | Barre d'étapes du formulaire, adaptée au type de demande : `<Stepper current="famille" />` |
| `FormField` | Libellé, champ et message d'erreur accessible |
| `useStepForm` | Valeurs, erreurs, validation et passage automatique à l'étape suivante |
| `useDemande` | Parcours du type de demande : `steps`, `documents`, `config`, `nextPath(id)`, `previousPath(id)` |
| `utils/validators.js` | Contrôle des fichiers (5 Mo, PDF, JPG ou PNG), format de la référence |
| `utils/dossier.js` | `getMissing(data)` : liste de ce qui manque dans un dossier |
| `utils/constants.js` | Liste des étapes (`STEPS`) et des statuts (`STATUSES`) |
| `services/api.js` | Appel au backend avec gestion des erreurs |

**Exemple : une étape de formulaire**

```jsx
import { Link } from 'react-router-dom'
import FormField from '../../components/FormField'
import useStepForm from '../../hooks/useStepForm'

function validate(v) {
  const e = {}
  if (!v.rue.trim()) e.rue = "L'adresse est obligatoire."
  return e
}

export default function MonEtape() {
  const { errors, field, onSubmit, previousPath } = useStepForm({
    step: 'adresse',          // clé où les données sont rangées
    initial: { rue: '' },     // valeurs de départ
    validate,                 // retourne les erreurs
  })                          // l'étape suivante dépend du type de demande
  return (
    <form onSubmit={onSubmit} noValidate>
      <FormField id="rue" label="Adresse" required error={errors.rue}>
        <input {...field('rue')} />
      </FormField>
      <Link to={previousPath}>Précédent</Link>
      <button type="submit" className="btn btn-primary">Suivant</button>
    </form>
  )
}
```

**Style** : les couleurs sont des variables en haut de `index.css` (`--primary`, `--navy`, `--border`...). Classes communes : `.container`, `.page`, `.btn`, `.btn-primary`, `.step-form`, `.field-grid`, `.step-nav`, `.step-back`. Chaque écran garde son propre fichier CSS.

**Images** : mettre les fichiers dans `public/assets/`

---

## 8. Connexion avec le backend et Supabase

```
Frontend React  ->  API Express (port 3000)  ->  Supabase (base de données et stockage)
```

- **Backend** : API Express sur `http://localhost:3000` (voir le README de la racine et `backend/`). Il enregistre les dossiers étape par étape et range les documents dans le stockage Supabase.
- **Authentification** : le frontend connecte l'utilisateur avec Supabase (`supabaseClient.js`). Les appels à l'API doivent ensuite envoyer le jeton dans l'en-tête `Authorization: Bearer <jeton>`.
- **CORS** : le backend doit autoriser `http://localhost:5173`.
- **Test rapide** : avec le backend lancé, ouvrir la console du navigateur (touche F12) et taper `fetch('http://localhost:3000/').then(r => r.text()).then(console.log)`.
- **À brancher** : l'enregistrement des étapes, l'envoi des documents (fichiers en `FormData`), la soumission du dossier et la récupération de la référence.

> **Règle de sécurité** : aucune clé ni aucun mot de passe dans un fichier envoyé sur GitHub (le dépôt est public). Seule la clé *publishable* de Supabase est acceptée dans le frontend, uniquement dans `.env.local`.

---

## 9. Travailler avec Git

| Branche | Rôle |
|---|---|
| `main` | Version stable (jury). On n'y pousse jamais directement. |
| `develop` | Branche d'intégration. |
| `feature/<sujet>-<prenom>` | Votre branche de travail, créée depuis `develop`. |

**Chaque matin**, récupérer le travail des autres :

```bash
git checkout develop
git pull
git checkout feature/ma-branche
git merge develop
```

**Chaque fois que vous terminez quelque chose** :

```bash
git add src public
git commit -m "feat: description courte"
git push -u origin feature/ma-branche
```

Puis, sur GitHub : **Pull Request vers `develop`** (jamais vers `main`), relue par un autre membre avant la fusion.

| Préfixe de commit | Usage |
|---|---|
| `feat:` | nouvelle fonctionnalité |
| `fix:` | correction de bug |
| `style:` | mise en forme, CSS |
| `docs:` | documentation |
| `chore:` | configuration, outils |

**Avant d'ouvrir une Pull Request**
- [ ] `npm run dev` fonctionne et votre écran s'affiche sans erreur
- [ ] `npm run lint` ne signale pas d'erreur
- [ ] Vous avez testé le cas normal et au moins un cas d'erreur
- [ ] `TYPE_DEFAUT` vaut toujours `'adulte'`
- [ ] `git status` ne montre ni `.env`, ni `.env.local`, ni `node_modules`
- [ ] Aucune clé secrète et aucune vraie donnée personnelle ne sont envoyées
- [ ] Les tableaux de ce README sont à jour si vous avez changé les routes ou les données

---

## 10. Règles pour éviter les conflits

1. Chacun travaille surtout dans **ses propres fichiers** (voir la section 4).
2. Un fichier CSS **par écran** : ne modifiez pas `index.css` sans prévenir.
3. Ne modifiez pas **`App.jsx`**, **`Header`**, **`Footer`**, **`services/api.js`** ni **`utils/demandeConfig.js`** sans prévenir le groupe.
4. **Pull Requests petites et fréquentes** : fusionnez plusieurs fois par jour plutôt qu'un gros bloc à la fin.
5. Faites un `git pull` sur `develop` **tous les matins**.
6. En cas de conflit Git, ne forcez rien : demandez de l'aide au groupe.

---

## 11. Ajouter une page ou une étape

**Une nouvelle étape du formulaire**
1. Ajoutez-la dans `STEPS` (`utils/constants.js`).
2. Ajoutez son identifiant dans la liste `steps` des types concernés (`REQUEST_CONFIG`, dans `utils/demandeConfig.js`).
3. Créez `pages/steps/NomStep.jsx` sur le modèle de `FamilleStep.jsx`.
4. Branchez-la dans la liste `COMPONENTS` de `pages/Enrollment.jsx`.
5. Si elle est obligatoire, ajoutez ses champs dans `utils/dossier.js` pour que le récapitulatif les contrôle.

**Une nouvelle page**
1. Créez `pages/MaPage.jsx`.
2. Déclarez sa route dans `App.jsx` (prévenez le groupe).

---

## 12. État d'avancement

| Écran | Responsable | État |
|---|---|---|
| 1 Accueil | Diaby | Fusionné |
| 2 Inscription / Connexion | Diaby| Fusionné |
| 3 Type de demande | Diaby| Fusionné |
| 4 Formulaire (Identité, Famille, Adresse, Profession) |    Akiana| Fusionné |
| 5 Pièces justificatives | Akiana | Fusionné |
| 6 Récapitulatif | Akiana | Fusionné |
| Formulaire adapté au type de demande | Akiana| Fusionné |
| 7 Confirmation et suivi | Louamba | *à compléter* |
| Espace agent | Louamba | *à compléter* |
| Pages Informations / Centres / FAQ | Louamba | *à compléter* |
| Connexion à l'API et à Supabase | Toute l'équipe | En cours |

>