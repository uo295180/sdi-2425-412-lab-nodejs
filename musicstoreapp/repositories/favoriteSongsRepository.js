module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favorite_songs",
    init: function(app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    getFavoriteSongs: async function(filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoriteSongsCollection = database.collection(this.collectionName);
            const favoriteSongs = await favoriteSongsCollection.find(filter, options).toArray();
            return favoriteSongs;
        } catch (err) {
            throw (err);
        }
    }, insertFavoriteSong: function(song, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favoriteSongsCollection = database.collection(this.collectionName);
                favoriteSongsCollection.insertOne(song)
                    .then(result => { callbackFunction({favoriteSongId: result.insertedId }) })
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}));
    }, deleteFavoriteSong: async function(filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const songsCollection = database.collection(this.collectionName);
            const song = await songsCollection.deleteOne(filter, options);
            return song;
        } catch (error) {
            throw (error);
        }
    },

}