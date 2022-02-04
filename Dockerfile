# image de départ
 FROM alpine:3.15 AS builder

 # chemin de travail
 WORKDIR /app

 # downgrade des privilèges
 USER root

 # installation des paquets système
 RUN apk update && apk upgrade
 RUN apk add git
 RUN apk add nodejs>16 && apk add npm>8
 RUN apk update && apk upgrade

 # copie des fichiers du dépôt

 # installation des dépendances avec npm
 RUN git clone https://github.com/Popoleii/i_want_typescript.git
 WORKDIR /app/i_want_typescript


 # build avec npm
 RUN npm install --only=production 
 RUN cp -R node_modules prod_modules
 RUN npm install
 RUN npm run build 

 # exécution
 FROM alpine:3.15 AS runner

# chemin de travail
 WORKDIR /app

 # downgrade des privilèges
 USER root

 # installation des paquets système
 RUN apk update && apk upgrade
 RUN apk add nodejs>16
 RUN apk update && apk upgrade

 RUN addgroup -S node && adduser -S node -G node

# copie des répertoires nécessaires à l'exécution
 COPY --from=builder --chown=root:root /app/i_want_typescript/dist/ dist
 COPY --from=builder --chown=root:root /app/i_want_typescript/prod_modules/ node_modules

# diminution droits user
 USER node

# exécution
 CMD ["node", "dist/index.js"]
