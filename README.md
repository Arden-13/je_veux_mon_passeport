# 🛂 MVP — Je veux mon passport

## 📌 Description

Ce projet consiste à développer un MVP permettant aux citoyens congolais de préparer leur dossier de demande de passeport en ligne, afin de réduire les déplacements et les longues files d’attente.

La plateforme permet à l’utilisateur de créer son compte, renseigner progressivement les informations nécessaires, joindre les pièces justificatives, vérifier son dossier puis le soumettre.

Le projet est ainsi conçu autour de la gestion et de la constitution d’un dossier de demande de passeport, et non comme un simple formulaire en ligne.

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