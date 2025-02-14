# E-commerce Project

Ce projet est une application e-commerce construite avec Next.js, Prisma et TypeScript.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Une base de données PostgreSQL

## Installation

1. Clonez le repository :
```bash
git clone <votre-repo-url>
cd e-commerce
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurez les variables d'environnement :
   - Copiez le fichier `.env.example` en `.env`
   - Remplissez les variables d'environnement nécessaires :
     - DATABASE_URL
     - NEXTAUTH_SECRET
     - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
     - STRIPE_SECRET_KEY

4. Initialisez la base de données :
```bash
npx prisma generate
npx prisma db push
```

## Lancement du projet

1. Pour lancer le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```
L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

2. Pour accéder à Prisma Studio (interface de gestion de la base de données) :
```bash
npm run prisma:studio
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile le projet pour la production
- `npm run start` : Lance le serveur de production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run prisma:studio` : Lance l'interface Prisma Studio
- `npm run prisma:seed` : Remplit la base de données avec des données de test
- `npm run test` : Lance les tests
- `npm run test:watch` : Lance les tests en mode watch
- `npm run test:coverage` : Lance les tests avec la couverture de code

## Tests

Le projet inclut différents types de tests :
```bash
npm run test:unit        # Tests unitaires
npm run test:integration # Tests d'intégration
npm run test:coverage    # Rapport de couverture
```

