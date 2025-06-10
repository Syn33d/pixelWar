FROM node:18-alpine AS development
# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Note: Nous ne copions pas le code source ici et ne construisons pas l'application
# car en mode développement, le code sera monté via un volume pour le hot reload

# Commande par défaut pour le mode développement
CMD ["npm", "run", "start:dev"]

# ------- Image de production plus légère -------
FROM node:18-alpine AS production

# Définir les arguments avec des valeurs par défaut
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copier uniquement les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier le code compilé depuis l'étape de build
COPY --from=development /usr/src/app/dist ./dist

# Exposer le port de l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "dist/main"]

# Healthcheck pour vérifier que l'application fonctionne correctement
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1
