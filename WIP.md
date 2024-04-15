# Projet mongoDB

### 2. Comprendre et Structurer les Données
- **Acquisition des données**: Téléchargez les données des établissements de Montpellier depuis le site indiqué.
- **Analyse des données**: Explorez le fichier CSV pour comprendre la structure et les champs disponibles. Identifiez les champs avec des valeurs null et ceux qui sont pertinents pour votre application.
- **Conception du schéma**: Décidez comment vous allez structurer les données dans MongoDB. Pensez à créer une collection par type d'établissement (bar, restaurant, etc.).

### 3. Configuration de l'Environnement de Développement
- **Installation de MongoDB**: Installez MongoDB sur les serveurs prévus par le service provider.
- **Configuration de Node.js**: Configurez un serveur Node.js pour exposer l'API qui interagira avec la base de données MongoDB.
- **Sécurité**: Assurez-vous que la connexion entre le client et le serveur est sécurisée (HTTPS recommandé, même si vous utilisez HTTP pendant le développement).

### 4. Implémentation
- **Importation des données**: Utilisez des scripts pour nettoyer les données et les importer dans les collections MongoDB.
- **Création des index**: Définissez des index sur les champs qui seront fréquemment interrogés pour améliorer les performances des requêtes.
- **Transactions**: Implémentez des transactions pour gérer les opérations qui nécessitent la modification de plusieurs documents ou collections de manière atomique.
- **API REST**: Développez une API REST en Node.js qui permettra les opérations CRUD de base ainsi que des requêtes plus complexes (agrégations, transactions).

### 5. Développement des Fonctionnalités Avancées
- **Agrégations**: Créez des requêtes d'agrégation pour fournir des statistiques ou des informations, comme la liste des établissements avec wifi, ou les bars classés par horaires d'ouverture.
- **Test de l'API**: Utilisez la bibliothèque Requests de Python ou simplement votre navigateur pour tester les différentes routes de l'API.

### 6. Déploiement et Tests
- **Déploiement**: Mettez en œuvre des stratégies de clustering et de sharding pour gérer la distribution et la scalabilité des données.
- **Tests de charge**: Effectuez des tests de charge pour assurer la robustesse et la performance de votre solution.

### 7. Documentation et Présentation
- **Documentation**: Documentez toute l'architecture, les choix de conception, et les endpoints de l'API.
- **Présentation finale**: Préparez une présentation pour exposer votre travail, en décrivant comment les besoins du client ont été satisfaits et comment le système peut évoluer.

### 8. Feedback et Itération
- **Collecte de feedback**: Après la présentation, recueillez les avis pour améliorer la solution.
- **Itération**: Apportez les modifications nécessaires pour optimiser la performance, la sécurité ou la facilité d'utilisation.

Cette roadmap vous offre un cadre complet pour mener à bien votre projet MongoDB, en assurant une couverture détaillée de tous les aspects techniques et pratiques.


## Providers shema

Nous simulurons des datacenter et des serveurs via des contenaires docker.
Il seront identifier par leurs nom et tags.

| Datacenter 1  | Datacenter 2  | Datacenter 3  |
|---------------|---------------|---------------|
| DC1-Server1   | DC2-Server1   | DC3-Server1   |
| DC1-Server2   | DC2-Server2   | DC3-Server2   |
| DC1-Server3   | DC2-Server3   | DC3-Server3   |
| DC1-Server4   | DC2-Server4   | DC3-Server4   |
| DC1-Server5   | DC2-Server5   | DC3-Server5   |