# Projet Secret Santa

Une application web full-stack pour organiser des échanges de cadeaux "Secret Santa" avec vos amis et votre famille !

## Structure du Projet

Ce projet est organisé sous forme de monorepo contenant :
- `frontend/` : Application React + Vite
- `backend/` : Serveur Node.js Express
- `shared/` : Types et logique partagés en TypeScript

## Prérequis

- Node.js (v20+ recommandé)
- Docker et Docker Compose (pour une installation facile)

## Variables d'Environnement

Pour que ce projet fonctionne correctement, vous devrez configurer certaines variables d'environnement.
**Ne commitez jamais de vrais secrets dans le système de contrôle de version !** Créez des fichiers `.env` ou passez ces variables lors de l'exécution.

### Variables du Backend

Créez un fichier `.env` dans le répertoire `backend/` (ou définissez-les dans votre environnement) :

| Variable | Description | Par Défaut / Exemple |
|----------|-------------|----------------------|
| `PORT` | Le port sur lequel le serveur backend s'exécute | `5000` |
| `MONGODB_URI` | Chaîne de connexion MongoDB | `mongodb://localhost:27017/secretsanta` |
| `JWT_SECRET` | Clé secrète utilisée pour signer les tokens JWT | `votre_chaine_secrete_aleatoire` |
| `FRONTEND_URL` | URL du frontend pour les paramètres CORS | `http://localhost:5173` |

### Variables du Frontend

Le frontend lit les variables au moment de la compilation ou de l'exécution. Étant donné que Vite est configuré pour autoriser le préfixe `API_URI`, vous n'avez pas strictement besoin d'un fichier `.env` si vous le passez directement (par ex. via Docker).

| Variable | Description | Par Défaut / Exemple |
|----------|-------------|----------------------|
| `API_URI` | L'URL complète de l'API backend | `http://localhost:5000` |

*(Note : Nous utilisons `API_URI` directement sans le préfixe `VITE_` grâce à nos paramètres personnalisés dans `vite.config.js`).*

## Instructions de Configuration

Il existe deux façons de lancer le projet : en utilisant Docker (recommandé) ou en local avec npm.

### Option 1 : Lancement avec Docker Compose (Recommandé)

1. Assurez-vous que Docker est lancé sur votre machine.
2. Depuis le répertoire racine du projet, exécutez :
   ```bash
   docker compose up --build
   ```
3. Les services seront disponibles aux adresses suivantes :
   - Frontend : `http://localhost:5173`
   - Backend : `http://localhost:5000`

### Option 2 : Lancement local avec npm

1. **Installer les dépendances**
   Exécutez la commande suivante depuis la racine pour installer les dépendances de tous les espaces de travail :
   ```bash
   npm install
   ```

2. **Démarrer MongoDB**
   Assurez-vous qu'une instance de MongoDB tourne localement sur le port `27017`.

3. **Démarrer le Backend**
   Ouvrez un nouveau terminal et exécutez :
   ```bash
   cd backend
   npm run dev
   ```

4. **Démarrer le Frontend**
   Ouvrez un nouveau terminal et exécutez :
   ```bash
   cd frontend
   npm run dev
   ```
