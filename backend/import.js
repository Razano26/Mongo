// Importation des modules nécessaires
const mongoose = require('mongoose'); // Pour interagir avec MongoDB
const fs = require('fs'); // Pour lire les fichiers du système

// Chaîne de connexion à la base de données MongoDB
const dbURI =
  'mongodb://myuser:mypassword@localhost:27017/mydatabase?authSource=admin';

// Connexion à la base de données
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected...')) // En cas de succès de la connexion
  .catch((err) => console.error(err)); // En cas d'erreur de connexion

// Définition du schéma pour la géométrie
const GeometrySchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['Point'] }, // Le type de géométrie (ici, seulement 'Point' est accepté)
  coordinates: { type: [Number], required: true }, // Les coordonnées de la géométrie
});

// Définition du schéma pour les données
const DataSchema = new mongoose.Schema(
  {
    type: String, // Le type de données
    properties: mongoose.Schema.Types.Mixed, // Les propriétés des données (peuvent être de n'importe quel type)
    geometry: GeometrySchema, // La géométrie des données
  },
  { strict: false },
); // L'option 'strict' est définie sur false pour permettre l'ajout de champs qui ne sont pas dans le schéma

// Création du modèle de données à partir du schéma
const DataModel = mongoose.model('data', DataSchema);

// Fonction pour importer les données
async function importData() {
  try {
    // Chemin du fichier à importer
    const filePath = '../Data/OSM_Metropole_restauration_bar.json';
    console.log('Attempting to read from:', fs.realpathSync(filePath)); // Tentative de lecture du fichier

    // Lecture et analyse du fichier JSON
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Extraction des caractéristiques des données brutes
    const data = rawData.features;

    // Insertion des données dans la base de données
    const result = await DataModel.insertMany(data);
    console.log(`${result.length} documents were inserted`); // Affichage du nombre de documents insérés
  } catch (error) {
    console.error('Failed to import data:', error); // En cas d'erreur, affichage de l'erreur
  } finally {
    mongoose.disconnect(); // Déconnexion de la base de données
  }
}

// Appel de la fonction d'importation des données
importData();
