const {ObjectId} = require("mongodb");
module.exports = function (app, favoritesRepository, songsRepository) {

    app.get('/songs/favorites', function (req, res) {
        let filter = {user : req.session.user};

        favoritesRepository.getFavoriteSongs(filter, {}).then(songs => {
            let response = {
                songs: songs,
                totalPrice: songs.reduce((acc, cur) => acc + parseFloat(cur.price), 0),
            };
            res.render("songs/favorites.twig", response)
        }).catch(error => {
            res.send("Se ha producido un error al listar las canciones favoritas del usuario:" + error)
        });
    });

    app.post('/songs/favorites/add', function (req, res) {
        let filter = {_id: new ObjectId(req.body.song_id)};
        songsRepository.findSong(filter, {}).then(song => {
            let favoriteSong = {
                song_id: new ObjectId(req.body.song_id),
                title: song.title,
                price: song.price,
                user: req.session.user,
                date: new Date().toISOString().split("T")[0]
            }
            favoritesRepository.insertFavoriteSong(favoriteSong, function (result) {
                if(result.error != null) {
                    res.send("Error al añadir canción a favoritos " + result.error);
                } else {
                    res.redirect("/songs/favorites");
                }
            });
        }).catch(error => {
            res.send("Se ha producido un error al recuperar la canción " + error);
        })


    });

    app.get('/songs/favorites/delete/:id', function (req, res) {
        let filter = { _id: new ObjectId(req.params.id) };
        favoritesRepository.deleteFavoriteSong(filter, {})
            .then(result => {
                res.redirect("/songs/favorites");
            }).catch(error => {
                res.send("Error al eliminar la canción " + error);
        })
    });
}