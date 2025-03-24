const {ObjectId} = require("mongodb");
module.exports = function (app, commentsRepository) {
    app.post('/comments/:song_id', function (req, res) {
        let filter = {_id: new ObjectId(req.body.song_id)};

        commentsRepository.addComments(favoriteSong, function (result) {
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

}