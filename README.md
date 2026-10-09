# 🛂 MVP — Je veux mon passport

## 📌 Description

Ce projet consiste à développer un MVP permettant aux citoyens congolais de préparer leur dossier de demande de passeport en ligne, afin de réduire les déplacements et les longues files d’attente.

La plateforme permet à l’utilisateur de créer son compte, renseigner progressivement les informations nécessaires, joindre les pièces justificatives, vérifier son dossier puis le soumettre.

Le projet est ainsi conçu autour de la gestion et de la constitution d’un dossier de demande de passeport, et non comme un simple formulaire en ligne.

Line vers la démo: https://je-veux-mon-passeport.vercel.app/

## Structure du projet 
.
├── backend/     API Express (Node.js)
└── frontend/    Application front-end

## Installation

Cloner le repo, puis installer les dépendances dans chaque dossier séparément :

```bash
git clone https://github.com/Arden-13/je_veux_mon_passeport.git
cd je_veux_mon_passeport

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Configuration

Le backend a besoin d'un fichier `.env` (non inclus dans le repo, car il contient des informations locales/sensibles).

```bash
cd backend
cp .env.example .env
```

Puis ouvrir `.env` et ajuster les valeurs si besoin (le fichier `.env.example` liste les variables attendues).

## Lancer le projet en développement

Dans deux terminaux séparés :

```bash
# Terminal 1 — backend
cd backend
npm run dev
```

Le backend tourne par défaut sur `http://localhost:3000`.

## Scripts disponibles (backend)

- `npm run dev` : démarre le serveur avec rechargement automatique (nodemon)
- `npm start` : démarre le serveur normalement (sans rechargement auto)

## Architecture

Le dépôt contient deux applications indépendantes, chacune avec son propre `package.json` :

- `frontend/` : application monopage React, construite et servie en développement par Vite.
- `backend/` : API REST Express en modules JavaScript ES.

### Frontend

Le code de l’interface se trouve dans `frontend/src/` :

- `App.jsx` déclare les routes React et protège les pages de demande avec l’authentification.
- `pages/` contient les pages publiques, les pages d’authentification et les étapes du dossier.
- `pages/steps/` contient les étapes Identité, Famille, Adresse, Profession, Documents et Récapitulatif.
- `context/AuthContext.jsx` expose la session Supabase et son jeton d’accès.
- `context/EnrollmentContext.jsx` conserve les valeurs du parcours côté client pendant la navigation.
- `hooks/` regroupe la logique commune des étapes et la configuration du parcours.
- `services/api.js` fournit le client HTTP vers l’API ; `services/applicationApi.js` adapte les données du formulaire aux routes et champs de l’API.
- `utils/demandeConfig.js` configure les parcours et documents affichés ; `utils/dossier.js` vérifie les champs manquants avant soumission.

Les données saisies sont conservées dans le contexte React pendant la session de navigation. La création et les mises à jour du dossier sont transmises à l’API aux étapes correspondantes.

### Backend

Le code serveur se trouve dans `backend/` :

- `server.js` démarre Express sur le port défini par `PORT` ou, par défaut, `3000`.
- `app.js` configure CORS, le décodage JSON, la route de santé `/` et monte les routes de dossier sous `/api/applications`.
- `routes/applicationRoutes.js` déclare les routes de création et de mise à jour.
- `middleware/auth.js` valide le jeton Bearer auprès de Supabase Auth.
- `middlewares/validateMiddleware.js` valide les champs attendus ; `middlewares/uploadMiddleware.js` traite les fichiers multipart.
- `controllers/applicationController.js` orchestre les requêtes et `models/Application.js` accède à Supabase.
- `db-schema/schema.sql` décrit la table SQL `applications`.

## Configuration des variables d’environnement

### Frontend

Créer `frontend/.env.local` (ce fichier reste local et ne doit pas être ajouté au dépôt) avec les variables suivantes :

```dotenv
VITE_SUPABASE_URL=https://<votre-projet>.supabase.co
VITE_SUPABASE_ANON_KEY=<votre-cle-publique-supabase>
VITE_API_URL=http://localhost:3000/api
```

`VITE_API_URL` est facultative en développement local : le client frontend utilise alors `http://localhost:3000/api`. Les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont utilisées par Supabase Auth dans le navigateur.

### Backend

Depuis `backend/`, copier le modèle puis renseigner les paramètres correspondant au projet Supabase :

```bash
cp .env.example .env
```

Le serveur utilise `PORT`, `SUPABASE_URL` et `SUPABASE_ANON_KEY`. `DATABASE_URL` et `JWT_SECRET` figurent également dans le modèle ; vérifier les usages réels avant de leur attribuer une valeur. Ne jamais publier de clé privée, de jeton ou de fichier `.env`.

## Démarrage local

Installer les dépendances une fois dans chaque application comme indiqué dans Installation. Démarrer ensuite les deux processus dans des terminaux séparés depuis la racine du dépôt.

Terminal 1 — API :

```bash
cd backend
npm run dev
```

Terminal 2 — interface :

```bash
cd frontend
npm run dev
```

Ouvrir l’adresse affichée par Vite, généralement `http://localhost:5173`. L’API écoute par défaut sur `http://localhost:3000`; la route `GET /` renvoie un message de disponibilité. Pour utiliser des ports ou hôtes différents, mettre à jour `PORT`, `VITE_API_URL` et les règles CORS selon l’environnement.

## Parcours d’un dossier et routes API

Les routes de dossier sont protégées par un jeton Supabase envoyé dans l’en-tête `Authorization: Bearer <access_token>`. Le numéro de suivi créé à l’étape Identité est utilisé comme identifiant dans les routes de mise à jour.

| Étape | Méthode et route | Données principales |
| --- | --- | --- |
| Création — Identité | `POST /api/applications` | `lastName`, `firstName`, `birthDate` (`jj/mm/aaaa`), `birthPlace`, `gender`, `nationality`, `nationalIdNumber` |
| Famille | `PATCH /api/applications/:id/family` | `fatherFullName`, `motherFullName` |
| Adresse | `PATCH /api/applications/:id/address` | `residenceAddress`, `city`, `country`, `phoneNumber`, `email` |
| Profession | `PATCH /api/applications/:id/profession` | `profession`, `employer` (facultatifs selon le validateur) |
| Documents | `PATCH /api/applications/:id/documents` | Formulaire multipart avec `birthCertificateUrl`, `nationalIdCardUrl`, `proofOfAddressUrl`, `idPhotoUrl` |
| Soumission | `PATCH /api/applications/:id/submit` | JSON `{ "isCertified": true }` |

Les documents sont limités aux formats PDF, JPG et PNG, avec une taille maximale de 5 Mo par fichier. Le backend les envoie vers le bucket Supabase Storage `passport_documents`. Les réponses d’erreur de l’API sont renvoyées au formulaire afin que l’utilisateur puisse corriger ou réessayer.

## Parcours actuellement pris en charge

Les parcours présentés par l’interface sont adulte, mineur et renouvellement. Le contrat actuel des validateurs de l’API impose toutefois une CNI à la création et les quatre documents standards à l’étape Documents (acte de naissance, CNI, justificatif de domicile et photo). Le frontend autorise donc actuellement la soumission API du parcours adulte ; les parcours mineur et renouvellement ne correspondent pas entièrement aux champs et documents exigés.

Des champs supplémentaires de l’interface (par exemple situation matrimoniale ou nombre d’enfants) restent côté frontend et ne sont pas envoyés aux routes qui ne les acceptent pas.

## Vérification du frontend

À exécuter depuis `frontend/` :

```bash
npm run lint
npm run build
npm run preview
```

- `npm run lint` lance ESLint.
- `npm run build` génère les fichiers de production dans `frontend/dist/`.
- `npm run preview` sert localement le build pour vérification.

Le backend expose les scripts `npm run dev` et `npm start`. Aucun script de test automatisé n’est défini dans son `package.json`.

## Points d’attention pour Supabase

- Le bucket Storage `passport_documents` doit exister et sa configuration doit permettre le mode d’accès attendu par l’application.
- Vérifier que la structure réelle de la table Supabase correspond aux colonnes utilisées par `backend/models/Application.js` et aux requêtes de l’API.
- `backend/db-schema/schema.sql` commence par supprimer la table `applications` avec `DROP TABLE IF EXISTS`. Ne pas exécuter ce script sur une base contenant des données à conserver sans avoir évalué ses effets et sauvegardé les données.
- En production, configurer les variables d’environnement dans l’hébergeur, définir `VITE_API_URL` vers l’API déployée et limiter CORS aux origines frontend autorisées.
