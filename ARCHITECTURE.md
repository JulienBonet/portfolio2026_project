# Portfolio 2026

## Objectif

Refonte complète du portfolio développeur personnel.

Le projet est une application fullstack permettant :

* la présentation personnelle ;
* la présentation de projets réalisés ;
* la gestion dynamique des technologies utilisées ;
* l'administration sécurisée du contenu ;
* la gestion des médias associés aux projets.

Le site public reste une landing page composée de plusieurs sections :

* Présentation ;
* Projets ;
* Contact.

Les projets sont administrables via une interface privée permettant :

* création ;
* modification ;
* suppression ;
* publication ;
* gestion des technologies ;
* upload des images.

---

# Stack technique

## Frontend

* React
* TypeScript
* Vite
* React Router
* Material UI
* react-hot-toast
* Tiptap
* Swiper

## Backend

* Node.js
* Express 5
* TypeScript
* JWT
* Multer

## Base de données

* MySQL

## Médias

* Cloudinary

## Infrastructure

* Docker
* Nginx
* VPS Hetzner

---

# Architecture générale

```text
Client React
      |
      |
      v
API Express
      |
      |
      +---- MySQL
      |
      +---- Cloudinary
```

---

# Frontend

Organisation prévue :

```text
src/

├── pages/
│
├── components/
│
├── api/
│
├── admin/
│
└── assets/
```

## Partie publique

Sections principales :

* Présentation
* Projets
* Contact

---

## Section projets

Chaque projet possède :

* un titre ;
* une description courte ;
* une description longue enrichie ;
* une stack technique ;
* une cover ;
* des médias complémentaires.

Les médias peuvent être :

* galerie d'images ;
* vidéo YouTube.

---

## Description enrichie

Le champ `full_description` contient du contenu riche.

Objectifs :

* texte formaté ;
* gras ;
* italique ;
* liens externes ;
* mise en forme personnalisée.

L'éditeur prévu est Tiptap.

---

# Administration

## Authentification

L'administration utilise :

* login ;
* JWT ;
* middleware de protection.

---

## Pages administrateur

Prévision :

```text
admin/

├── Dashboard
│
├── Projects
│
└── Technologies
```

---

## Gestion des projets

Fonctionnalités :

* créer un projet ;
* modifier un projet ;
* supprimer un projet ;
* gérer la publication ;
* uploader une cover ;
* gérer les images ;
* associer les technologies.

---

## Gestion des technologies

Fonctionnalités :

* création ;
* modification ;
* suppression ;
* upload d'icône ;
* association aux projets.

---

# Backend

Architecture :

```text
server/src

├── config
├── controllers
├── middleware
├── models
├── routes
├── services
└── utils
```

Le détail complet est décrit dans :

```
BACKEND.md
```

---

# Base de données

Tables principales :

```text
projects

project_images

technologies

project_technologies

users
```

---

## Relations

```text
projects
    |
    |
    +---- project_images


projects
    |
    |
    +---- project_technologies ---- technologies
```

---

# Médias

Les fichiers ne sont pas stockés sur le serveur.

Flux :

```text
Upload utilisateur

        |
        v

Multer

        |
        v

Cloudinary

        |
        v

URL stockée en MySQL
```

---

# Déploiement

Infrastructure prévue :

```text
Utilisateur

    |
    v

Nginx Reverse Proxy

    |
    v

Frontend React

    |
    v

Backend Express

    |
    v

MySQL


Cloudinary
(stockage médias)
```

Déploiement prévu sur le VPS Hetzner existant.
