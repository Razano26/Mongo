// Importation des modules nécessaires
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// Configuration de la connexion à MongoDB
const uri = 'mongodb://myuser:mypassword@localhost:27017';
const client = new MongoClient(uri);

// Nom de la base de données
const dbName = 'mtp_open_data';

// Fonction pour analyser les tags
function parseTags(tagsString) {
  const tagsArray = tagsString.split(', ');
  const tagsObj = {};
  tagsArray.forEach((pair) => {
    const [key, value] = pair.split('=>');
    if (key && value) {
      const cleanKey = key.trim().replace(/^"|"$/g, '');
      const cleanValue = value.trim().replace(/^"|"$/g, '');
      const formattedKey = cleanKey.includes(':')
        ? cleanKey.replace(/:/g, '.')
        : cleanKey;
      tagsObj[formattedKey] = cleanValue;
    }
  });
  return tagsObj;
}

// Fonction principale
async function main() {
  try {
    // Connexion à MongoDB
    await client.connect();
    console.log('Connecté à MongoDB');
    const db = client.db(dbName);

    // Objet pour stocker les résultats
    const results = {};

    // Lecture du fichier CSV
    fs.createReadStream('../Data/OSM_Metropole_restauration_bar.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Analyse des tags et nettoyage des données
        const tagsData = parseTags(data.tags);
        // Création d'un objet avec les données nettoyées
        const cleanData = {
          osmId: data.osm_id,
          street: data.addr_street,
          houseNumber: data.addr_housenumber,
          amenity: data.amenity,
          name: data.name,
          brand: data.brand,
          openingHours: data.opening_hours,
          timestamp: data.osm_timestamp,
          ...tagsData, 
        };
        // Ajout des données à la bonne collection dans l'objet des résultats
        if (!results[cleanData.amenity]) {
          results[cleanData.amenity] = [];
        }
        results[cleanData.amenity].push(cleanData);
      })
      .on('end', async () => {
        // Insertion des données dans MongoDB
        for (const amenity in results) {
          const collection = db.collection(amenity);
          // Insertion des données uniquement si la collection n'est pas vide
          if (results[amenity].length > 0) {
            await collection.insertMany(results[amenity]);
          }
          console.log(
            `Insertion de ${results[amenity].length} enregistrements dans la collection ${amenity} réussie.`,
          );
        }
        // Fermeture de la connexion à MongoDB
        await client.close();
        console.log('Connexion MongoDB fermée.');
      })
      .on('error', (error) => {
        // Gestion des erreurs lors de la lecture du fichier CSV
        console.error('Erreur lors de la lecture du fichier CSV :', error);
      });
  } catch (error) {
    // Gestion des erreurs lors de la connexion à MongoDB
    console.error('Erreur MongoDB :', error);
  }
}

// Exécution de la fonction principale
main().catch(console.error);