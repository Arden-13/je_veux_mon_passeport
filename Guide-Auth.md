# Guide authentification — Frontend

Ce guide explique comment se connecter à l'API backend du projet Passeport Congo.

## Principe général

L'authentification (inscription, connexion) se fait **directement avec Supabase**, pas avec notre backend Express. Notre backend sert uniquement à **vérifier** que vous êtes connecté quand vous appelez une route protégée.

```
Vous (frontend)              Supabase Auth            Notre API Express
──────────────                ──────────────           ───────────────
signUp() / signInWithPassword()  ───►
                                  ◄───  renvoie un token (JWT)

Appel vers /api/...          ───────────────────────►  vérifie le token
avec le token dans                                       dans l'en-tête
l'en-tête Authorization                                   Authorization
```

## 1. Installer le SDK Supabase

```bash
npm install @supabase/supabase-js
```

## 2. Initialiser le client Supabase

Créez un fichier `supabaseClient.js` (ou `.ts`) dans votre projet frontend :

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbswpiviataighfjnuzd.supabase.co';  
const supabaseAnonKey = 'sb_publishable_...'; //je vous passerai la vraie valeur

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

> Utilisez bien la **Publishable key** (anon), jamais la Secret key — celle-ci ne doit jamais apparaître côté frontend.

## 3. Inscription (US03)

> Les valeurs ci-dessous (`marie@example.com`, `Marie Koyo`...) sont des **exemples illustratifs**. Dans le vrai code, elles viennent des champs du formulaire rempli par l'utilisateur (écran "Inscription" de la maquette), jamais écrites en dur.

```js
// email, password, nomComplet, telephone proviennent de l'état de votre formulaire
const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    data: {
      full_name: nomComplet,
      phone: telephone
    }
  }
});

if (error) {
  console.error('Erreur inscription :', error.message);
} else {
  console.log('Compte créé, email de vérification envoyé.');
}
```

Le champ `options.data` est important : ces valeurs (`full_name`, `phone`) sont automatiquement utilisées par le backend (via un trigger SQL) pour créer le profil associé (table `profiles`).

### Vérification de l'email (US04)

Après l'inscription, Supabase envoie **automatiquement** un email contenant un lien de confirmation. Tant que l'utilisateur n'a pas cliqué dessus, son compte peut être bloqué en connexion, selon notre configuration Supabase.

**Ce que vous devez prévoir côté UI :**
- Un écran "Vérifiez votre boîte mail" après l'inscription (`data.user` existe mais `data.session` peut être `null` tant que l'email n'est pas confirmé)
- Une page de destination après le clic sur le lien de l'email (ex: `/email-confirme`) — **communiquez-nous l'URL exacte** de cette page, on doit la déclarer côté Supabase (Authentication → URL Configuration → Redirect URLs), sinon le lien ne fonctionnera pas correctement
- Un message clair si l'utilisateur essaie de se connecter avant d'avoir confirmé son email (l'erreur renvoyée par Supabase l'indique dans `error.message`)

## 4. Connexion (US05)

```js
// email, password proviennent de l'état de votre formulaire de connexion
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});

if (error) {
  console.error('Erreur connexion :', error.message);
} else {
  const token = data.session.access_token;
  // conservez ce token (ex: dans le state de votre app, ou un store global)
}
```

## 5. Appeler notre API avec le token

Pour **toute route protégée** de notre backend (création de dossier, upload de documents, etc.), ajoutez le token dans l'en-tête `Authorization` :

```js
const response = await fetch('http://localhost:3000/api/applications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ /* données du dossier */ })
});

const result = await response.json();
```

## 6. Réponses possibles de notre API

| Code | Signification |
|---|---|
| `200` / `201` | Succès |
| `401` | Token manquant ou invalide → redirigez vers la page de connexion |
| `403` | Connecté, mais pas autorisé à accéder à cette ressource précise |
| `404` | Ressource non trouvée |
| `400` | Données envoyées invalides (vérifiez le message retourné) |

## 7. Déconnexion

```js
await supabase.auth.signOut();
```

## 8. Récupérer l'utilisateur actuellement connecté (ex: au chargement de l'app)

```js
const { data: { session } } = await supabase.auth.getSession();

if (session) {
  const token = session.access_token;
  const user = session.user;
}
```

## 9. Garder la session à jour automatiquement

Le token expire après un certain temps. Pour éviter une déconnexion brutale, écoutez les changements de session :

```js
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    const token = session.access_token; // toujours à jour
  } else {
    // utilisateur déconnecté → redirigez vers la page de connexion
  }
});
```

Placez cet écouteur une seule fois, au démarrage de votre application.

## Routes actuellement disponibles

| Méthode | Route | Protégée ? | Statut |
|---|---|---|---|
| `POST` | `/api/applications` | Oui | En cours de finalisation |

D'autres routes seront ajoutées au fur et à mesure (pièces justificatives, récapitulatif, etc.) — ce document sera mis à jour.

## Questions / blocages

Contactez l'équipe backend si vous obtenez une erreur 401/403 inattendue, ou si une route dont vous avez besoin n'existe pas encore.