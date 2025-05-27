# Documentation sur la Conteneurisation de PixelWar en Mode Développement

## Table des matières

1. [Introduction](#introduction)
2. [Architecture globale](#architecture-globale)
3. [Analyse détaillée du docker-compose.yml](#analyse-détaillée-du-docker-composeyml)
4. [Analyse détaillée du Dockerfile backend (NestJS)](#analyse-détaillée-du-dockerfile-backend-nestjs)
5. [Analyse détaillée du Dockerfile frontend (React)](#analyse-détaillée-du-dockerfile-frontend-react)
6. [Bonnes pratiques appliquées](#bonnes-pratiques-appliquées)
7. [Le Hot Reload en détail](#le-hot-reload-en-détail)
8. [FAQ et dépannage](#faq-et-dépannage)
9. [Glossaire](#glossaire)

## Introduction

Ce document explique en détail la configuration Docker mise en place pour le développement de l'application PixelWar. L'objectif principal est de créer un environnement de développement efficace qui :

1. Utilise les bonnes pratiques Docker
2. Permet le hot reload (rechargement à chaud)
3. Gère correctement les dépendances et les volumes
4. Facilite le développement tout en maintenant une structure similaire à la production

## Architecture globale

L'application PixelWar est composée de plusieurs services :

- **Base de données MySQL** : Stockage persistant des données
- **Backend NestJS** : API RESTful écrite en TypeScript avec NestJS
- **Frontend React** : Interface utilisateur écrite en React TypeScript
- **Service de migrations** : Gère les migrations de la base de données

Chaque service est conteneurisé avec Docker et orchestré via Docker Compose.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Frontend React │────▶│  Backend NestJS │────▶│   MySQL DB      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │                 │
                        │   Migrations    │
                        │                 │
                        └─────────────────┘
```

## Analyse détaillée du docker-compose.yml

Examinons ligne par ligne le fichier `docker-compose.yml` :

```yaml
version: '3.8'
```
**Explication** : Définit la version du format de fichier Docker Compose utilisée, la version 3.8 est une version récente qui supporte toutes les fonctionnalités dont nous avons besoin.

```yaml
services:
  # Base de données MySQL
  db:
    image: mysql:8.0
    container_name: pixelwar-mysql
    restart: always
```
**Explication** : 
- `services` : Définit les différents services de l'application
- `db` : Nom du service de base de données
- `image: mysql:8.0` : Utilise l'image officielle MySQL version 8.0
- `container_name` : Définit un nom explicite pour le conteneur
- `restart: always` : Le conteneur redémarre automatiquement en cas d'échec

```yaml
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:-root}
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
```
**Explication** : 
- Variables d'environnement pour configurer MySQL
- Utilisation de variables issues du fichier `.env` avec fallback pour `MYSQL_ROOT_PASSWORD`

```yaml
    ports:
      - "3306:3306"
```
**Explication** : Expose le port MySQL (3306) à l'hôte, permettant une connexion directe pour le développement et le débogage

```yaml
    volumes:
      - mysql_data:/var/lib/mysql
```
**Explication** : 
- Crée un volume nommé `mysql_data` pour persister les données
- Les données MySQL sont stockées dans `/var/lib/mysql` dans le conteneur

```yaml
    networks:
      - pixelwar_network
```
**Explication** : Connecte le service au réseau `pixelwar_network` pour la communication entre services

```yaml
    command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
**Explication** : 
- Surcharge la commande par défaut pour configurer MySQL
- Utilise `mysql_native_password` pour la compatibilité
- Configure l'encodage utf8mb4 pour le support complet d'Unicode

```yaml
    labels:
      com.pixelwar.description: "MySQL database for PixelWar application"
      com.pixelwar.service: "database"
      com.pixelwar.environment: "development"
      com.pixelwar.version: "1.0"
```
**Explication** : 
- Ajoute des métadonnées au conteneur via des labels
- Améliore la documentation et facilite la gestion des conteneurs

```yaml
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "${DB_USERNAME}", "-p${DB_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 5
```
**Explication** : 
- Définit un healthcheck pour s'assurer que MySQL est opérationnel
- Exécute `mysqladmin ping` toutes les 10 secondes
- Essentiel pour la gestion des dépendances entre services

```yaml
  # Backend NestJS avec hot-reload utilisant le Dockerfile
  backend:
    build:
      context: ./api-rest-nestjs
      dockerfile: Dockerfile
      target: development
```
**Explication** : 
- Utilise le Dockerfile du backend pour construire l'image
- `context` : Indique le répertoire contenant le Dockerfile
- `target: development` : Spécifie la cible dans le build multi-stage (utilise uniquement l'étape de développement)

```yaml
    container_name: pixelwar-backend
    ports:
      - "3001:3001"
```
**Explication** : 
- Définit un nom explicite pour le conteneur
- Expose le port 3001 pour accéder à l'API

```yaml
    volumes:
      - ./api-rest-nestjs:/usr/src/app
      - /usr/src/app/node_modules
```
**Explication** : 
- **POINT CLÉ** : Monte le code source local dans le conteneur pour le hot reload
- Le volume anonyme `/usr/src/app/node_modules` préserve les node_modules du conteneur

```yaml
    depends_on:
      db:
        condition: service_healthy
```
**Explication** : 
- Définit une dépendance sur le service `db`
- **FONCTIONNALITÉ AVANCÉE** : Attend que le healthcheck de `db` réussisse avant de démarrer, garantissant que MySQL est prêt

```yaml
    environment:
      - NODE_ENV=development
      - DB_HOST=db
      - DB_PORT=3306
      - DB_USERNAME=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_DATABASE=${DB_DATABASE}
```
**Explication** : 
- Configure les variables d'environnement pour NestJS
- `DB_HOST=db` : Utilise le nom du service comme nom d'hôte (résolution DNS de Docker)
- Récupère les identifiants depuis le fichier `.env`

```yaml
  # Migrations de base de données
  migrations:
    build:
      context: ./api-rest-nestjs
      dockerfile: Dockerfile
      target: development
```
**Explication** : 
- Utilise le même Dockerfile que le backend
- La cible `development` inclut toutes les dépendances nécessaires pour les migrations

```yaml
    command: sh -c "npm install && npx typeorm-ts-node-commonjs migration:run -d src/migration-config.ts"
```
**Explication** : 
- Surcharge la commande par défaut pour exécuter les migrations
- Installe d'abord les dépendances puis exécute les migrations

```yaml
    volumes:
      - ./api-rest-nestjs:/usr/src/app
      - ./.env:/usr/src/app/.env
```
**Explication** : 
- Monte le code source pour accéder aux fichiers de migration
- **ASTUCE IMPORTANTE** : Monte directement le fichier `.env` dans le conteneur

```yaml
  # Frontend React avec hot-reload utilisant le Dockerfile
  react-app:
    build:
      context: ./front
      dockerfile: Dockerfile
      target: development
```
**Explication** : 
- Construit l'image frontend à partir du Dockerfile
- Spécifie la cible `development` pour le build multi-stage

```yaml
    volumes:
      - ./front:/app
      - /app/node_modules
```
**Explication** : 
- **POINT CLÉ** : Monte le code source frontend pour le hot reload
- Le volume anonyme `/app/node_modules` préserve les node_modules du conteneur

```yaml
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
      - REACT_APP_API_URL=http://localhost:3001
```
**Explication** : 
- `CHOKIDAR_USEPOLLING=true` : Améliore la détection des changements de fichiers dans Docker
- `REACT_APP_API_URL` : Configure l'URL de l'API backend

```yaml
networks:
  pixelwar_network:
    driver: bridge
```
**Explication** : 
- Définit un réseau nommé pour la communication entre conteneurs
- Le driver `bridge` est le type de réseau standard pour Docker

```yaml
volumes:
  mysql_data:
```
**Explication** : 
- Déclare le volume nommé `mysql_data`
- Géré par Docker et persistant entre les redémarrages

## Analyse détaillée du Dockerfile backend (NestJS)

Examinons ligne par ligne le Dockerfile du backend :

```dockerfile
FROM node:18-alpine AS development
```
**Explication** : 
- Utilise Node.js 18 avec Alpine Linux comme image de base
- Alpine est extrêmement léger (5-10 MB contre 1 GB pour les images basées sur Ubuntu)
- `AS development` : Nomme cette étape pour le build multi-stage

```dockerfile
# Définir le répertoire de travail
WORKDIR /usr/src/app
```
**Explication** : 
- Définit le répertoire de travail dans le conteneur
- Toutes les commandes suivantes s'exécuteront dans ce répertoire

```dockerfile
# Copier les fichiers de dépendances
COPY package*.json ./
```
**Explication** : 
- **BONNE PRATIQUE CRUCIALE** : Copie uniquement package.json et package-lock.json
- Permet d'exploiter le cache de Docker pour les installations de dépendances

```dockerfile
# Installer les dépendances
RUN npm install
```
**Explication** : 
- Installe toutes les dépendances pour le développement
- Cette couche sera mise en cache tant que package.json ne change pas

```dockerfile
# Note: Nous ne copions pas le code source ici et ne construisons pas l'application
# car en mode développement, le code sera monté via un volume pour le hot reload
```
**Explication** : 
- Commentaire expliquant pourquoi nous ne copions pas le code source
- En développement, le code est monté via un volume pour le hot reload

```dockerfile
# Commande par défaut pour le mode développement
CMD ["npm", "run", "start:dev"]
```
**Explication** : 
- Démarre l'application en mode développement
- `start:dev` utilise typiquement nodemon ou nest start --watch pour le hot reload

```dockerfile
# ------- Image de production plus légère -------
FROM node:18-alpine AS production
```
**Explication** : 
- Commence une nouvelle étape pour l'image de production
- Utilise la même image de base mais dans un contexte différent

```dockerfile
# Définir les arguments avec des valeurs par défaut
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
```
**Explication** : 
- `ARG` : Définit un argument de build qui peut être passé lors de la construction
- `ENV` : Définit une variable d'environnement persistante dans l'image

```dockerfile
# Copier uniquement les fichiers package.json et package-lock.json
COPY package*.json ./
```
**Explication** : 
- Même approche que pour l'étape de développement
- Exploite le cache de Docker

```dockerfile
# Installer uniquement les dépendances de production
RUN npm ci --only=production
```
**Explication** : 
- `npm ci` : Installation plus rapide et déterministe que `npm install`
- `--only=production` : N'installe pas les dépendances de développement, réduisant la taille

```dockerfile
# Copier le code compilé depuis l'étape de build
COPY --from=development /usr/src/app/dist ./dist
```
**Explication** : 
- **FONCTIONNALITÉ MULTI-STAGE** : Copie uniquement les fichiers compilés de l'étape précédente
- Réduit considérablement la taille de l'image finale

```dockerfile
# Exposer le port de l'application
EXPOSE 3001
```
**Explication** : 
- Documente que l'application écoute sur le port 3001
- Note : Cette instruction est informative et ne publie pas réellement le port

```dockerfile
# Commande pour démarrer l'application
CMD ["node", "dist/main"]
```
**Explication** : 
- Exécute l'application compilée directement avec Node.js
- Plus performant que d'utiliser npm ou nest en production

```dockerfile
# Healthcheck pour vérifier que l'application fonctionne correctement
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1
```
**Explication** : 
- Définit un healthcheck pour l'image
- Vérifie l'endpoint `/health` toutes les 30 secondes
- Permet aux orchestrateurs (Docker Compose, Kubernetes) de détecter les problèmes

## Analyse détaillée du Dockerfile frontend (React)

Analysons maintenant le Dockerfile du frontend :

```dockerfile
FROM node:18-alpine AS development
```
**Explication** : 
- Utilise Node.js 18 avec Alpine comme image de base légère
- Définit la première étape nommée `development`

```dockerfile
# Définir le répertoire de travail
WORKDIR /app
```
**Explication** : 
- Définit `/app` comme répertoire de travail dans le conteneur

```dockerfile
# Copier les fichiers de dépendances
COPY package*.json ./
```
**Explication** : 
- **BONNE PRATIQUE** : Copie uniquement les fichiers de dépendances
- Optimise le cache de Docker

```dockerfile
# Installer les dépendances
RUN npm install
```
**Explication** : 
- Installe toutes les dépendances pour le développement

```dockerfile
# Note: Nous ne copions pas le code source ici
# car en mode développement, le code sera monté via un volume pour le hot reload
```
**Explication** : 
- Justifie l'absence de `COPY . .` dans cette étape

```dockerfile
# Commande par défaut pour le mode développement
CMD ["npm", "start"]
```
**Explication** : 
- Exécute le serveur de développement React avec hot reload intégré

```dockerfile
# ------- Image de production plus légère -------
FROM node:18-alpine AS build
```
**Explication** : 
- Commence une nouvelle étape nommée `build` pour construire l'application

```dockerfile
# Copier le reste du code source
COPY . .
```
**Explication** : 
- Copie tout le code source dans le conteneur pour la construction

```dockerfile
# Construire l'application en mode production
RUN npm run build
```
**Explication** : 
- Génère les fichiers statiques optimisés pour la production

```dockerfile
FROM nginx:alpine AS production
```
**Explication** : 
- **OPTIMISATION MAJEURE** : Utilise Nginx comme serveur léger pour la production
- Nginx est beaucoup plus performant pour servir des fichiers statiques

```dockerfile
# Copier la configuration Nginx personnalisée si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf
```
**Explication** : 
- Ligne commentée pour une configuration Nginx personnalisée
- Peut être décommentée si nécessaire

```dockerfile
# Copier les fichiers build de l'étape précédente dans le répertoire servi par Nginx
COPY --from=build /app/build /usr/share/nginx/html
```
**Explication** : 
- Copie uniquement les fichiers de build générés dans l'étape précédente
- Les place dans le répertoire standard de Nginx

```dockerfile
# Exposer le port 80
EXPOSE 80
```
**Explication** : 
- Documente que Nginx écoute sur le port standard HTTP

```dockerfile
# Healthcheck pour vérifier que le serveur web fonctionne correctement
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1
```
**Explication** : 
- Définit un healthcheck pour vérifier que Nginx répond

## Bonnes pratiques appliquées

Voici les bonnes pratiques mises en œuvre dans cette configuration :

### 1. Images légères
- Utilisation d'Alpine Linux comme base (`node:18-alpine`)
- Réduction de la taille des images en production avec le multi-stage build

### 2. Optimisation du cache Docker
- Séparation de la copie des dépendances et du code source
- Installation des dépendances avant la copie du code source

### 3. Multi-stage builds
- Séparation des étapes de développement et de production
- Réutilisation des artefacts entre les étapes

### 4. Environnement de développement optimal
- Hot reload configuré pour le frontend et le backend
- Volumes montés pour synchroniser le code source en temps réel

### 5. Gestion efficace des dépendances
- Volumes anonymes pour les node_modules
- Installation déterministe avec `npm ci` en production

### 6. Monitoring et fiabilité
- Healthchecks configurés pour tous les services
- Gestion des dépendances avec `depends_on` et `condition: service_healthy`

### 7. Documentation et organisation
- Labels Docker pour documenter les conteneurs
- Commentaires explicatifs dans les Dockerfiles

### 8. Sécurité
- Variables d'environnement externalisées
- Principe du moindre privilège (conteneurs minimaux)

## Le Hot Reload en détail

Le hot reload (rechargement à chaud) est une fonctionnalité essentielle pour le développement, permettant de voir les changements en temps réel sans redémarrer manuellement les services.

### Comment fonctionne le hot reload dans cette configuration

1. **Bind mounts pour le code source** :
   ```yaml
   volumes:
     - ./api-rest-nestjs:/usr/src/app
   ```
   Cette configuration monte le code source local dans le conteneur, créant une synchronisation bidirectionnelle.

2. **Isolation des node_modules** :
   ```yaml
   volumes:
     - /usr/src/app/node_modules
   ```
   Ce volume anonyme empêche le bind mount de remplacer les node_modules du conteneur.

3. **Outils de surveillance** :
   - Backend : `npm run start:dev` utilise nodemon ou nest start --watch
   - Frontend : `npm start` utilise webpack-dev-server avec hot module replacement

4. **Optimisation pour Docker** :
   ```yaml
   environment:
     - CHOKIDAR_USEPOLLING=true
   ```
   Cette variable améliore la détection des changements de fichiers dans les environnements virtualisés.

### Flux de travail du hot reload

1. Vous modifiez un fichier dans votre IDE
2. Le changement est instantanément reflété dans le conteneur via le bind mount
3. L'outil de surveillance (nodemon, webpack) détecte le changement
4. L'application est rechargée (partiellement ou complètement)
5. Vous voyez les modifications sans interruption du développement

## FAQ et dépannage

### Les node_modules sont-ils reconstruits si je modifie package.json ?

Oui. Lorsque vous modifiez package.json, vous devez redémarrer le conteneur pour que les nouvelles dépendances soient installées. Le Dockerfile est configuré pour installer les dépendances au démarrage du conteneur.

### Comment fonctionne le lien entre docker-compose.yml et les Dockerfiles ?

La directive `build` dans docker-compose.yml indique à Docker d'utiliser le Dockerfile spécifié :
```yaml
build:
  context: ./api-rest-nestjs
  dockerfile: Dockerfile
  target: development
```

### Pourquoi ne pas copier le code source dans le Dockerfile de développement ?

Nous montons le code source via un volume pour permettre le hot reload. Si nous copiions le code dans l'image, les modifications locales ne seraient pas reflétées dans le conteneur.

### Comment gérer les environnements de production ?

Un fichier `docker-compose.prod.yml` séparé peut être créé, utilisant la cible `production` des Dockerfiles. Cela génère des images optimisées sans les outils de développement.

## Glossaire

- **Bind mount** : Montage d'un répertoire de l'hôte dans un conteneur
- **Volume anonyme** : Volume sans nom géré par Docker, utilisé pour persister des données spécifiques
- **Multi-stage build** : Technique utilisant plusieurs étapes dans un Dockerfile pour optimiser l'image finale
- **Hot reload** : Rechargement automatique de l'application lors de modifications du code
- **Healthcheck** : Mécanisme vérifiant régulièrement l'état de santé d'un service
- **Alpine Linux** : Distribution Linux minimaliste optimisée pour les conteneurs
- **Docker Compose** : Outil de définition et d'exécution d'applications Docker multi-conteneurs

---

## Explications vulgarisées

### Niveau débutant

**Qu'est-ce que Docker ?**  
Docker est comme une boîte qui contient tout ce dont votre application a besoin pour fonctionner. Imaginez que vous voulez déménager : au lieu d'emballer tous vos meubles séparément, Docker vous permet de mettre toute votre maison dans une boîte et de la transporter partout.

**Qu'est-ce que le hot reload ?**  
C'est comme si vous peigniez un mur et pouviez voir la nouvelle couleur instantanément, sans attendre que la peinture sèche ou avoir à repeindre tout le mur.

**À quoi servent les volumes ?**  
Les volumes sont comme des ponts entre votre ordinateur et la boîte Docker. Ils permettent d'échanger des fichiers en temps réel.

### Niveau intermédiaire

**Pourquoi utiliser des multi-stage builds ?**  
Imaginez que vous prépariez un repas dans une cuisine professionnelle, mais que vous ne serviez que le plat final au restaurant. Le multi-stage build vous permet d'utiliser tous les outils nécessaires pour la préparation, mais de ne garder que le résultat final pour la production.

**Comment fonctionnent les réseaux Docker ?**  
Les réseaux Docker sont comme un système téléphonique privé entre vos conteneurs. Chaque conteneur a son propre "numéro" (nom) et peut appeler directement les autres sans passer par l'extérieur.

**Pourquoi séparer développement et production ?**  
C'est comme avoir une tenue d'entraînement confortable et une tenue de compétition légère. Chacune est optimisée pour son contexte : développement (confort, outils) vs production (performance, sécurité).
