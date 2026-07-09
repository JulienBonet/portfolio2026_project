Fullstack Starter

Starter de projet web full stack basé sur :

Frontend : React + Vite + TypeScript
Backend : Node.js + Express + TypeScript
Qualité de code : ESLint + Prettier
Base de données : Docker Compose (MySQL)

------------------------------------------------------

Architecture:

fullstack-starter/
│
├── client/                 # Application React Vite
│   ├── src/
│   ├── public/
│   ├── eslint.config.js
│   ├── vite.config.ts
│   └── tsconfig.app.json
│
├── server/                 # API Express
│   ├── src/
│   │   ├── index.ts        # Point d'entrée serveur
│   │   ├── app.ts          # Configuration Express
│   │   ├── router.ts       # Agrégation des routes API
│   │   ├── routes/
|   |   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── middlewares/
│   │
│   ├── eslint.config.js
│   └── tsconfig.json
│
├── docker-compose.yml
└── README.md

------------------------------------------------------

## BACKEND

Technologies
- Node.js
- Express 5
- TypeScript
- ES Modules

Le backend utilise une architecture séparant :

index.ts : démarrage du serveur
app.ts : configuration Express
router.ts : regroupement des routes
routes/ : définition des endpoints
controllers/ : gestion HTTP
models/: requêtes SQL de la base de données
services/ : logique métier

----

* Démarrage serveur

> Depuis le dossier server :

npm run dev

Le serveur démarre avec tsx watch.

Scripts disponibles :

npm run dev          # développement avec rechargement automatique
npm run build        # compilation TypeScript
npm run start        # lancement depuis dist
npm run typecheck    # vérification TypeScript sans compilation
npm run lint         # analyse ESLint
npm run lint:fix     # correction automatique ESLint
npm run format       # formatage Prettier

------------------------------------------------------

## FRONTEND

Technologies
- React
- Vite
- TypeScript

> Depuis le dossier client :

npm run dev

> Scripts disponibles :

npm run dev
npm run build
npm run lint
npm run lint:fix
npm run format

------------------------------------------------------

## COMMANDES RACINES

Le starter permet de piloter le frontend et le backend depuis la racine du projet.

> Développement

npm run dev

Lance simultanément :
* le serveur Express
* le frontend React/Vite

---

> Build

npm run build

Compile :
* le backend TypeScript
* le frontend React/Vite

---

> Vérification TypeScript

npm run typecheck

Exécute :
* `server/typecheck`
* `client/typecheck`

---

> Analyse ESLint

npm run lint

Exécute :
* `server/lint`
* `client/lint`

---

> Formatage Prettier

npm run format

Exécute :
* `server/format`
* `client/format`

Cette organisation permet de piloter l'ensemble du projet depuis la racine sans avoir à se déplacer dans les dossiers `client` et `server`.

------------------------------------------------------

## ALIAS D'IMPORT REACT

Le frontend utilise un alias @ qui pointe vers src.

Au lieu de :

import Button from "../../../components/Button";

on utilise :

import Button from "@/components/Button";

> Configuration présente dans :
- client/tsconfig.app.json
- client/vite.config.ts

------------------------------------------------------

##  ESLint & Prettier

Les deux applications utilisent :
- ESLint Flat Config
- Prettier
- eslint-config-prettier

Objectif :
- détecter les erreurs TypeScript
- garder un format homogène
- éviter les divergences de style entre fichiers

> Avant un commit important :
npm run typecheck
npm run lint
npm run build

------------------------------------------------------

## DOCKER

Docker Compose est utilisé pour fournir les services externes nécessaires au développement.

Actuellement :

MySQL 8
volume persistant Docker

> Démarrer :
Depuis la racine :
docker compose up -d

> Arrêter :
docker compose down

> Voir les conteneurs :
docker ps

----------------------------------------------

## CHOIX DE CONFIGURATION

> TypeScript <

Le projet utilise :
- module : NodeNext
- ES Modules
- compilation vers dist

Les imports backend utilisent donc l'extension .js :

import app from "./app.js";

Même si le fichier source est :
app.ts

Après compilation, il devient :
dist/app.js

------------------------------------------------------

## VARIABLES D'ENVIRONEMENT

Les fichiers .env ne doivent pas être versionnés.

disponible :

client/.env.example
server/.env.example

pour documenter les variables nécessaires.

--------------------------------------------------------

## STRUCTURE CSS

Le starter fournit une organisation CSS simple et réutilisable.

src/
└── assets/
    └── css/
        ├── reset.css
        ├── common.css
        └── variables.css

* `reset.css` : normaliser
* `variables.css` : configurer
* `common.css` : partager



> reset.css

Fichier de remise à zéro des styles navigateur.

---

> variables.css

Contient les variables CSS globales du projet.

---

> common.css

Contient les styles globaux du projet.

* définir les comportements génériques de l'application
* centraliser les règles communes à tous les écrans

Aucun choix graphique spécifique au projet ne doit idéalement être placé ici.

---

> Ordre de chargement

Les fichiers doivent être importés dans `src/main.tsx` dans l'ordre suivant :

import "@/assets/css/reset.css";
import "@/assets/css/variables.css";
import "@/assets/css/common.css";

--------------------------------------------------------

## FRAMEWORKS UI OPTIONNELS

Selon le projet, il est possible d'ajouter Material UI, Tailwind CSS ou Bootstrap.


### Material UI (MUI)

Documentation : https://mui.com/material-ui/getting-started/installation

> Installation

Depuis le dossier client :

npm install @mui/material @emotion/react @emotion/styled

> Installation des icônes :

npm install @mui/icons-material

MUI utilise Emotion comme moteur de styles par défaut.

> Exemple

import Button from "@mui/material/Button";

export default function App() {
  return (
    <Button variant="contained">
      Hello MUI
    </Button>
  );
}

---

### Tailwind CSS (Vite)

Documentation : https://tailwindcss.com/docs/installation/using-vite

> Installation

Depuis le dossier client :

npm install tailwindcss @tailwindcss/vite

* Ajouter le plugin dans :

client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});

> Créer ou modifier le fichier CSS principal :

@import "tailwindcss";

Puis :

npm run dev


> Exemple

export default function App() {
  return (
    <h1 className="text-3xl font-bold">
      Hello Tailwind
    </h1>
  );
}

---

### Bootstrap

Documentation : https://getbootstrap.com

> Installation

Depuis le dossier client :

npm install bootstrap

Dans :

client/src/main.tsx

ajouter :

import "bootstrap/dist/css/bootstrap.min.css";

> Exemple

export default function App() {
  return (
    <button className="btn btn-primary">
      Hello Bootstrap
    </button>
  );
}

---

### Bootstrap + React Bootstrap

Si l'on souhaite utiliser des composants React dédiés :

npm install react-bootstrap bootstrap

Documentation : https://react-bootstrap.github.io


> Exemple

import Button from "react-bootstrap/Button";

export default function App() {
  return (
    <Button variant="primary">
      Hello React Bootstrap
    </Button>
  );
}





