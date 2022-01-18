# image de départ
 FROM alpine:3.15

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
 RUN cd i_want_typescript


 # build avec npm
 RUN npm install
 RUN npm run build 

 # exécution
 CMD ["npx" , "ts-node" , "src/index.ts"]