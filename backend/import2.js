const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// Paramètres de connexion à MongoDB
const uri = 'mongodb://myuser:mypassword@localhost:27017';
const client = new MongoClient(uri);

// TODO : Ajouter differente collection pour les differents types d'etablissements

// Nom de la base de données et de la collection
const dbName = 'maBaseDeDonnees';
const collectionName = 'etablissements';

// Fonction pour parser les tags
function parseTags(tagsString) {
  // TODO : Retirer tout les tage avec value de vide
  const tagsObj = {};
  const tags = tagsString.split(', ').map((tag) => tag.split('=>'));
  tags.forEach(([key, value]) => {
    if (key && value) {
      tagsObj[key.trim().replace(/"/g, '')] = value.trim().replace(/"/g, '');
    }
  });
  return tagsObj;
}

async function main() {
  await client.connect();
  console.log('Connecté à MongoDB');
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const results = [];

  fs.createReadStream('../Data/OSM_Metropole_restauration_bar.csv')
    .pipe(csv())
    .on('data', (data) => {
      // TODO : Recupérer les tags plus tot pour les comparer au valeurs
      // Nettoyage et transformation des données ici si nécessaire
      const cleanData = {
        osmId: data.osm_id,
        street: data.addr_street,
        houseNumber: data.addr_housenumber,
        amenity: data.amenity,
        name: data.name,
        brand: data.brand,
        openingHours: data.opening_hours,
        timestamp: data.osm_timestamp,
        tags: parseTags(data.tags),
      };
      results.push(cleanData);
    })
    .on('end', async () => {
      await collection.insertMany(results);
      console.log(`Insertion de ${results.length} enregistrements réussie.`);
      await client.close();
    });
}

main().catch(console.error);
