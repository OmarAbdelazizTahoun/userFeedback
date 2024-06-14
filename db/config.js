const {MongoClient} = require('mongodb');
const { get } = require('../routes');

const url = 'mongodb://localhost:27017';
let _db;

module.exports = {
    connect: function(){
        const client = new MongoClient(url);
        _db = client.db('appReviews');
    },

    getReviews: function(appName){
        return _db.collection('reviews').find({"app_name": appName}).toArray();
    },

    getArtifacts: function(appName){
        // sentiment, score, and toxicity average per version
        return _db.collection('reviews').aggregate([
            { $group: { _id: "$reviewCreatedVersion", 
                        avgSentiment: { $avg: "$sentiment" },
                        avgScore: { $avg: "$score" },
                        avgToxicity: { $avg: "$toxicity" }
            }
        }
        ]).toArray();
    },

    getSmells: function(appName){
        return _db.collection('smells').find({"app_name":appName}).toArray();
    },

    getReleases: function(appName){
        return _db.collection('releases').find({"app_name":appName}).toArray();
    },
}