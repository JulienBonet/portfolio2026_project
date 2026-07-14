# Backend Portfolio 2026

## Présentation

Le backend est une API REST développée avec :

* Node.js
* Express 5
* TypeScript
* MySQL

Il gère :

* les projets ;
* les images ;
* les technologies ;
* l'authentification administrateur ;
* les uploads Cloudinary.

---

# Structure

```text
server/src

├── app.ts
├── index.ts
├── router.ts
│
├── config
│   ├── database.ts
│   ├── cloudinary.ts
│   └── jwt.ts
│
├── controllers
│   ├── authController.ts
│   ├── projectController.ts
│   ├── projectImageController.ts
│   └── technologyController.ts
│
├── middleware
│   ├── adminAuthMiddleware.ts
│   └── uploadMiddleware.ts
│
├── models
│   ├── projectModel.ts
│   ├── projectImageModel.ts
│   ├── projectTechnologyModel.ts
│   ├── technologyModel.ts
│   └── userModel.ts
│
├── routes
│   ├── authRoute.ts
│   ├── healthRoute.ts
│   ├── projectRoute.ts
│   ├── projectImageRoute.ts
│   └── technologyRoute.ts
│
├── services
│   ├── authService.ts
│   ├── cloudinaryService.ts
│   └── projectService.ts
│
└── utils
    └── slugify.ts
```

---

# Architecture

Séparation des responsabilités :

## Routes

Définissent les endpoints HTTP.

## Controllers

Gèrent :

* requête HTTP ;
* validation ;
* réponse JSON.

## Models

Contiennent les requêtes SQL.

## Services

Contiennent la logique métier :

* authentification ;
* Cloudinary ;
* traitements complexes.

---

# API

Toutes les routes sont préfixées par :

```
/api
```

---

# Health

```http
GET /api/health
```

Retourne :

* état API ;
* connexion MySQL ;
* timestamp.

---

# Authentification

## Connexion

```http
POST /api/auth/login
```

Retour :

* token JWT.

---

## Vérification utilisateur

```http
GET /api/auth/me
```

Protection :

```
adminAuthMiddleware
```

---

# Projets

## Public

Liste :

```http
GET /api/projects
```

Détail :

```http
GET /api/projects/:id
```

Seuls les projets :

```
status = published
```

sont accessibles publiquement.

---

## Administration

Liste complète :

```http
GET /api/projects/admin
```

Détail :

```http
GET /api/projects/admin/:id
```

Créer :

```http
POST /api/projects
```

Modifier :

```http
PUT /api/projects/:id
```

Supprimer :

```http
DELETE /api/projects/:id
```

---

# Cover projet

Upload :

```http
POST /api/projects/:id/cover/upload
```

Processus :

1. réception Multer ;
2. upload Cloudinary ;
3. sauvegarde URL MySQL.

---

# Images projets

Liste :

```http
GET /api/projects/:id/images
```

Création :

```http
POST /api/projects/:id/images
```

Upload :

```http
POST /api/projects/:id/images/upload
```

Modification position :

```http
PUT /api/projects/:projectId/images/:imageId
```

Suppression :

```http
DELETE /api/projects/:projectId/images/:imageId
```

La position est gérée par :

```text
moveProjectImage()
```

---

# Technologies

Liste :

```http
GET /api/technologies
```

Technologies mises en avant :

```http
GET /api/technologies/featured
```

Détail :

```http
GET /api/technologies/:id
```

Création :

```http
POST /api/technologies
```

Modification :

```http
PUT /api/technologies/:id
```

Suppression :

```http
DELETE /api/technologies/:id
```

---

# Icônes technologies

Upload :

```http
POST /api/technologies/:id/icon/upload
```

Processus :

1. Multer reçoit l'image ;
2. Cloudinary stocke le fichier ;
3. URL sauvegardée dans MySQL.

Lors d'une suppression :

1. récupération URL Cloudinary ;
2. suppression Cloudinary ;
3. suppression MySQL.

---

# Base MySQL

## projects

Contient les informations principales :

* titre ;
* slug ;
* descriptions ;
* liens ;
* statut publication ;
* cover.

Types :

```text
school
hackathon
personal
professional
```

---

## project_images

Galerie projet :

```text
id
project_id
image_url
position
```

Relation :

```
projects 1 ---- N project_images
```

---

## technologies

Technologies disponibles :

```text
id
name
icon_url
category
is_featured
```

Catégories actuelles :

```text
frontend
backend
database
design
cms
management
devops
```

---

## project_technologies

Table relationnelle N:N :

```text
project_id
technology_id
```

---

## users

Compte administrateur :

```text
id
login
password
created_at
```

---

# Uploads Cloudinary

Organisation actuelle :

```text
portfolio/

├── projects/
│   └── {slug}/
│       ├── cover/
│       └── images/
│
└── technologies_ico/
    └── {technology}/
```

Les URLs Cloudinary sont stockées directement en base.

---

# Commandes développement

Depuis `server` :

```bash
npm run dev
```

Compilation :

```bash
npm run build
```

Vérification TypeScript :

```bash
npm run typecheck
```

Lint :

```bash
npm run lint
```

Formatage :

```bash
npm run format
```

---

# Etat actuel

Fonctionnel :

* API Express ;
* connexion MySQL ;
* JWT admin ;
* CRUD projets ;
* CRUD technologies ;
* upload Cloudinary ;
* gestion galerie images ;
* suppression Cloudinary ;
* slugification automatique.
