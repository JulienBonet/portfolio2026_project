# CLIENT.md

# Portfolio 2026 - Frontend

## Présentation

Le frontend du Portfolio 2026 est une application React permettant de présenter mes réalisations, mes compétences techniques et mmon profil de développeur web.

L'application possède deux espaces distincts :

* une partie publique destinée aux visiteurs ;
* une interface d'administration permettant de gérer les contenus du portfolio.

Le frontend communique avec une API backend développée en Express/TypeScript.

---

# Stack technique

## Technologies principales

* React
* TypeScript
* Vite
* React Router
* Material UI (MUI)
* Swiper
* Tiptap
* react-hot-toast
* dnd-kit

## Principes utilisés

Le frontend suit les principes suivants :

* composants réutilisables ;
* typage strict TypeScript ;
* séparation présentation / logique métier ;
* communication API centralisée ;
* architecture orientée fonctionnalités.

---

# Architecture frontend

Organisation principale :

client/src

client/src

├── api
├── assets
├── components
├── hooks
├── layouts
├── pages
├── router
├── admin
├── types
├── utils
├── theme
└── main.tsx


---

# Configuration

## Variables d'environnement

Fichier :
client/.env

Variable principale :
VITE_API_URL=http://localhost:3010/api


En production :
VITE_API_URL=https://domaine.com/api

---

# Communication API

La communication avec le backend est centralisée.

Structure :

src/api

├── apiClient.ts
├── projects.api.ts
├── technologies.api.ts
├── auth.api.ts
└── upload.api.ts


## apiClient

Responsabilités :

* définition de l'URL backend ;
* gestion des requêtes HTTP ;
* ajout du token JWT ;
* gestion des erreurs API.

---

# Types TypeScript

Les interfaces frontend correspondent aux modèles backend.

src/types

├── project.ts
├── technology.ts
├── user.ts
└── api.ts

Les types garantissent la cohérence entre :

* données reçues de l'API ;
* composants React ;
* formulaires administrateurs.

---

# Partie publique

## Routing

Routes principales :

/

├── HomePage
├── LegalPage
└── PrivacyPage

Les pages LegalPage et PrivacyPage sont prévues pour une future mise en conformité RGPD mais ne sont actuellement pas exploitées.

---

# HomePage

Structure :

HomePage

├── Header
├── PresentationSection
├── ProjectsSection
├── ContactSection
└── Footer

---

# PresentationSection

Cette section présente :

* l'identité ;
* le parcours ;
* les compétences ;
* les technologies principales.

Organisation :


PresentationSection

├── AboutMeBlock
├── TechnologiesBlock
└── TechnologyGroup


Les technologies sont chargées dynamiquement depuis l'API.

Endpoint :
GET /technologies/featured


Les technologies sont regroupées côté frontend par catégorie afin d'organiser leur présentation.
GET /technologies/featured?categories=frontend,backend

---

# ProjectsSection

La section projets affiche les réalisations depuis l'API.

Fonctionnalités :

* chargement dynamique ;
* présentation des informations principales ;
* affichage de la stack technique ;
* galerie d'images ;
* intégration de vidéos YouTube ;
* descriptions enrichies ;
* liens externes.

Structure :

ProjectsSection

├── ProjectCard
├── ProjectDetails
├── ProjectTechnologyGroup
└── ProjectVisual


---

# Description enrichie

Le champ :
full_description
contient du HTML généré avec Tiptap.

Le frontend prend en charge :

* paragraphes ;
* mise en forme ;
* liens ;
* contenus riches.

---

# Gestion des médias

## Images projets

Les images projets sont affichées avec :

* Swiper pour les galeries ;
* chargement depuis les URLs Cloudinary.

Les fichiers ne sont jamais stockés côté frontend.

Flux :

Frontend

    |
    | URL image
    v

Backend API

    |
    v

Cloudinary


# Vidéos YouTube

Certains projets peuvent intégrer une vidéo de présentation hébergée sur YouTube.

Le backend fournit une URL vidéo associée au projet.

Le frontend prend en charge :

- la détection de la présence d'une vidéo ; 
- l'affichage d'un lecteur intégré ;
- l'intégration responsive dans la fiche projet.

# Priorité d'affichage des médias

Ordre de priorité :

1. vidéo YouTube lorsqu'une URL est disponible ;
2. galerie d'images lorsqu'aucune vidéo n'est présente ;
3. placeholder par défaut lorsqu'aucun média n'est disponible.

---

# Interface administration

L'administration est accessible via :

/admin/*

Les routes sont protégées par authentification JWT.

---

# Authentification

Fonctionnement :

* connexion administrateur ;
* récupération d'un token JWT ;
* stockage local du token ;
* contrôle d'accès aux routes privées.

Éléments principaux :

admin

├── auth
├── layout
├── pages
└── components


---

# AdminLayout

Contient :

* navigation ;
* sidebar ;
* accès aux différentes sections ;
* déconnexion.

---

# Dashboard

Le tableau de bord affiche :

* nombre de projets ;
* nombre de technologies ;
* nombre de projets publiés ;
* nombre de projets brouillons.

---

# Gestion des technologies

Module terminé.

Fonctionnalités :

* liste paginée ;
* tri des colonnes ;
* création ;
* modification ;
* suppression ;
* upload d'icône ;
* gestion Cloudinary ;
* catégories ;
* technologies mises en avant ;
* ordre d'affichage.

La suppression est protégée lorsqu'une technologie est utilisée par un projet.

---

# Gestion des projets

Module terminé.

Fonctionnalités :

* création ;
* édition ;
* suppression ;
* gestion du statut ;
* upload image de couverture ;
* remplacement image ;
* galerie images ;
* suppression médias ;
* nettoyage Cloudinary ;
* association technologies ;
* ordre d'affichage.

---

# Gestion galerie images

La galerie utilise :

* upload multiple ;
* suppression individuelle ;
* chargement dynamique ;
* réorganisation par glisser-déposer.

Technologie utilisée :
dnd-kit


---

# Notifications et états UI

Composants communs :

components/common

├── AppSnackbar.tsx
├── LoadingBlock.tsx
└── ErrorBlock.tsx


Gestion :

* messages utilisateur ;
* erreurs API ;
* états de chargement.

---

# Responsive design

L'interface utilise le système responsive Material UI.

Objectifs :

* affichage mobile ;
* tablette ;
* desktop.

Les composants doivent rester adaptatifs grâce aux breakpoints MUI.

---

# SEO et performances

Axes pris en compte :

* structure HTML correcte ;
* chargement optimisé des images ;
* limitation des ressources inutiles ;
* composants séparés ;
* build Vite optimisé.

---

# Commandes utilisées :

npm run typecheck

npm run lint

npm run build


---

# État du projet

## Fonctionnalités terminées

✅ Architecture frontend
✅ Connexion API backend
✅ Partie publique
✅ Authentification admin
✅ Dashboard
✅ Gestion technologies
✅ Gestion projets
✅ Gestion des technologies associées aux projets
✅ Gestion de l'ordre d'affichage
✅ Gestion médias
✅ Gestion Cloudinary

---

## Travaux de finition possibles

Axes pris en compte :

* structure HTML correcte ;
* composants séparés ;
* build Vite optimisé.

Améliorations prévues :

* optimisation avancée des images ;
* lazy loading ;
* analyse du bundle.

---

# Principes de maintenance

Le frontend doit rester :

* simple ;
* maintenable ;
* fortement typé ;
* découplé du backend ;
* basé sur des composants réutilisables.
