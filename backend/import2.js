const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = "mongodb://myuser:mypassword@localhost:27017";
const client = new MongoClient(uri);

const dbName = 'import2';
const collectionName = 'etablissements';

function parseTags(tagsString) {
    const tagsArray = tagsString.split(', ');
    const tagsObj = {};
    tagsArray.forEach(pair => {
        const [key, value] = pair.split('=>');
        if (key && value) {
            const cleanKey = key.trim().replace(/^"|"$/g, '');
            const cleanValue = value.trim().replace(/^"|"$/g, '');
            const formattedKey = cleanKey.includes(':') ? cleanKey.replace(/:/g, '.') : cleanKey;
            tagsObj[formattedKey] = cleanValue;
        }
    });
    return tagsObj;
}

async function main() {
    try {
        await client.connect();
        console.log("Connecté à MongoDB");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const results = [];

        fs.createReadStream('../Data/OSM_Metropole_restauration_bar.csv')
            .pipe(csv())
            .on('data', (data) => {
                const tagsData = parseTags(data.tags);
                const cleanData = {
                    osmId: data.osm_id,
                    street: data.addr_street,
                    houseNumber: data.addr_housenumber,
                    amenity: data.amenity,
                    name: data.name,
                    brand: data.brand,
                    openingHours: data.opening_hours,
                    timestamp: data.osm_timestamp,
                    ...tagsData
                };
                results.push(cleanData); 
            })
            .on('end', async () => {
                if (results.length > 0) {
                    await collection.insertMany(results);
                }
                console.log(`Insertion de ${results.length} enregistrements réussie.`);
                await client.close();
                console.log("Connexion MongoDB fermée.");
            })
            .on('error', (error) => {
                console.error("Erreur lors de la lecture du fichier CSV :", error);
            });
    } catch (error) {
        console.error("Erreur MongoDB :", error);
    }
}

main().catch(console.error);
