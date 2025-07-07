FROM node:18-alpine AS development

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Note: Nous ne copions pas le code source ici
# car en mode développement, le code sera monté via un volume pour le hot reload

# Commande par défaut pour le mode développement
CMD ["npm", "start"]

# ------- Image de production plus légère -------
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du code source
COPY . .

# Construire l'application en mode production
RUN npm run build

# ------- Image de production légère basée sur Nginx -------
FROM nginx:alpine AS production

# Copier la configuration Nginx personnalisée si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers build de l'étape précédente dans le répertoire servi par Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Healthcheck pour vérifier que le serveur web fonctionne correctement
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Nginx démarre automatiquement, pas besoin de CMD
