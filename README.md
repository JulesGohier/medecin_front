# Frontend du projet Medicine

## Description

Ce projet est l'interface frontend de l'application de gestion de cabinet médical. Il utilise des technologies suivantes : React, TypeScript, Tailwind CSS, ShadcnUI.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Compatibilité du navigateur

Ce projet fonctionne uniquement sur des navigateurs basés sur Chromium, tels que Google Chrome ou Microsoft Edge. Assurez-vous d'utiliser l'un de ces navigateurs pour garantir le bon fonctionnement de l'application.

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/JulesGohier/medecin_front.git
   ```
2. Accédez au répertoire du projet :
   ```sh
   cd medecin_front
   ```
3. Installez les dépendances :
   ```sh
   npm install
   ```

## Démarrage du projet

1. Assurez-vous que les conteneurs backend sont démarrés. Vous pouvez trouver le dépôt backend et les instructions pour démarrer les conteneurs ici : [Backend Repository](https://github.com/JulesGohier/medecin_back)
2. Démarrez le serveur de développement :
   ```sh
   npm run dev
   ```
3. Ouvrez votre navigateur et accédez à `http://localhost:5173` pour voir l'application en action.

## Tester le côté Médecin et Patient simultanément

Si vous souhaitez tester le côté médecin et patient en simultané sur deux pages différentes,
il vous suffit de relancer la commande npm run dev dans un autre terminal. Vous aurez alors
une url avec un port diffèrent.