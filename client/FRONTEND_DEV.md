# FRONTEND_DEV.md

# Conduite du développement frontend - Portfolio 2026

## Objectif

Construire l'interface frontend du portfolio à partir du backend existant.

Le frontend doit permettre :

* l'affichage public du portfolio ;
* la consultation des projets ;
* la présentation des technologies ;
* l'accès à l'espace administrateur ;
* la gestion complète des contenus via une interface sécurisée.

---

# Stack frontend

## Technologies principales

* React
* TypeScript
* Vite
* React Router
* Material UI
* Swiper
* react-hot-toast
* Tiptap

---

# Organisation cible

```text
client/src

├── api
│
├── assets
│
├── components
│
├── hooks
│
├── layouts
│
├── pages
│
├── router
│
├── admin
│
├── types
│
└── utils
```

---

# Phase 1 - Préparation frontend

Objectifs :

* vérifier la configuration Vite ;
* vérifier TypeScript ;
* préparer l'organisation des dossiers ;
* connecter l'API backend.

Actions :

* créer les types TypeScript correspondant aux modèles SQL ;
* créer le client API ;
* définir la gestion des variables d'environnement.

---

# Variables d'environnement

Créer :

```text
client/.env.example
```

Prévoir :

```env
VITE_API_URL=http://localhost:3010/api
```

En production :

```env
VITE_API_URL=https://domaine.com/api
```

---

# Types TypeScript

Créer :

```text
src/types/

├── project.ts
├── technology.ts
├── user.ts
└── api.ts
```

Correspondance avec le backend.

Exemple :

```ts
interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  cover_image_url: string | null;
  technologies: Technology[];
  images: ProjectImage[];
}
```

---

# Couche API

Créer :

```text
src/api/

├── apiClient.ts
├── projects.api.ts
├── technologies.api.ts
├── auth.api.ts
└── upload.api.ts
```

Responsabilités :

## apiClient

Gestion commune :

* URL backend ;
* headers ;
* token JWT.

---

## projects.api.ts

Gestion :

* liste publique ;
* détail projet ;
* CRUD admin.

---

## technologies.api.ts

Gestion :

* récupération technologies ;
* CRUD admin.

---

## auth.api.ts

Gestion :

* login ;
* vérification session.

---

# Partie publique

## Routes

Prévision :

```text
/

├── HomePage
│
├── LegalPage
│
└── PrivacyPage
```

---

# HomePage

Structure :

```text
HomePage

├── Header
├── PresentationSection
├── ProjectsSection
├── ContactSection
└── Footer
```

---

# PresentationSection

Contenu :

* identité ;
* métier ;
* présentation ;
* technologies principales.

Les technologies affichées utilisent :

```http
GET /technologies/featured
```

---

# ProjectsSection

Chargement :

```http
GET /projects
```

Affichage :

```text
ProjectsSection

├── ProjectCard
│
├── ProjectDetails
│
├── ProjectStack
│
└── ProjectCarousel
```

---

# Affichage projet

Chaque projet doit gérer :

## Informations principales

* titre ;
* description courte ;
* durée ;
* type ;
* liens.

---

## Stack technique

Affichage des technologies associées.

Source :

```json
project.technologies
```

---

## Support visuel

Deux cas :

### Galerie images

Utilisation :

* Swiper.

Source :

```json
project.images
```

---

### Vidéo YouTube

Source :

```json
project.youtube_url
```

---

# Description enrichie

Le champ :

```text
full_description
```

contient du HTML riche.

Le frontend devra afficher :

* gras ;
* italique ;
* liens ;
* paragraphes.

La création/modification sera réalisée avec Tiptap côté administration.

---

# Administration

## Protection

Routes privées :

```text
/admin/*
```

Protection :

* JWT ;
* token stocké côté client ;
* vérification utilisateur.

---

# Structure admin

```text
src/admin

├── auth
│
├── layout
│
├── pages
│
├── components
│
└── api
```

---

# AdminLayout

Contient :

* sidebar ;
* navigation ;
* déconnexion.

---

# Pages admin

## Dashboard

Première version :

* état général ;
* nombre de projets ;
* nombre de technologies.

---

## Projects

Gestion :

* liste ;
* création ;
* édition ;
* suppression.

Composants prévus :

```text
ProjectFormDialog

ProjectImagesManager

ProjectTechnologySelector
```

Utilisation possible :

* MUI DataGrid.

---

## Technologies

Gestion :

* liste ;
* création ;
* modification ;
* suppression ;
* upload icône.

Composants :

```text
TechnologyFormDialog
```

---

# Gestion des uploads

Flux :

```text
Frontend

   |
   |
FormData

   |
   v

API Express

   |
   v

Cloudinary

   |
   v

URL MySQL
```

Le frontend ne stocke jamais les fichiers.

---

# Gestion état utilisateur

Version initiale :

* Context API possible ;
* stockage JWT localStorage ;
* hooks personnalisés.

Prévoir :

```text
src/hooks/

useAuth.ts
useProjects.ts
useTechnologies.ts
```

---

# Notifications

Utilisation :

```text
react-hot-toast
```

Cas :

* création réussie ;
* suppression ;
* erreur API ;
* upload terminé.

---

# Ordre de développement recommandé

## Étape 1

Connexion frontend/backend.

Validation :

```http
GET /api/health
```

---

## Étape 2

Types TypeScript + API client.

---

## Étape 3

Création de la HomePage.

Ordre :

1. Header
2. Présentation
3. Technologies
4. Projets
5. Contact

---

## Étape 4

Affichage projets :

* cartes ;
* détails ;
* galerie ;
* vidéo.

---

## Étape 5

Authentification admin.

---

## Étape 6

Interface administration :

1. technologies ;
2. projets ;
3. médias.

---

## Étape 7

Finitions :

* responsive ;
* animations ;
* SEO ;
* performances.

---

# Validation avant commit

Toujours exécuter :

```bash
npm run typecheck

npm run lint

npm run build
```

---

# Principe général

Le frontend doit rester :

* simple ;
* maintenable ;
* typé ;
* découplé du backend ;
* orienté composants réutilisables.

Les choix pourront évoluer pendant le développement si l'expérience montre une meilleure approche.
