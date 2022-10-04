const { MongoClient } = require('mongodb');
const config = require('./config');

let db = null;

class MongoDB {

    static getDb() {
        return db;
    }

    static connect() {
        console.log("Connecting to mongo server");
        return new Promise((resolve, reject) => {
            console.log(config.mongodb);
            MongoClient.connect(config.mongodb.url, { useUnifiedTopology: true }, function (err, client) {
                if (err) return reject(err);
                console.log("Connected successfully to mongo server");
                db = client.db(config.mongodb.dbName);
                resolve();
            });
        })
    }

    static items() {
        return db.collection("items");
    }

}

module.exports = MongoDB;