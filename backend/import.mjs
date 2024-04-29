// Importation des modules nécessaires
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
// Configuration de dotenv
dotenv.config();

// Configuration de la connexion à MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
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
// Fonction principale
async function main() {
  try {
    // Connexion à MongoDB
    await client.connect();
    console.log('Connecté à MongoDB');
    const db = client.db(dbName);

    // Objets pour stocker les résultats et les tags
    const results = {};
    const tagsCollection = [];

    // Lecture du fichier CSV
    fs.createReadStream('../Data/OSM_Metropole_restauration_bar.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Analyse des tags et nettoyage des données
        const tagsData = parseTags(data.tags);
        // Création d'un objet avec les données nettoyées
        const cleanData = {
          id: uuid(),
          amenity: data.amenity,
          name: data.name,
          brand: data.brand,
          openingHours: data.opening_hours,
          ...tagsData,
        };
        // Ajout des données à la bonne collection dans l'objet des résultats
        if (!results[cleanData.amenity]) {
          results[cleanData.amenity] = [];
        }
        results[cleanData.amenity].push(cleanData);

        // Ajout des tags, id et brand à la collection des tags
        // Cette table sera utilisé pour les aggregations
        tagsCollection.push({
          id: uuid(),
          _id: data._id,
          name: data.name,
          amenity: data.amenity,
          brand: data.brand,
          sport: tagsData.sport,
        });
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

        // Insertion des tags dans leur propre collection
        if (tagsCollection.length > 0) {
          const tagsDbCollection = db.collection('tags');
          await tagsDbCollection.insertMany(tagsCollection);
          console.log(
            `Insertion de ${tagsCollection.length} enregistrements dans la collection tags réussie.`,
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
