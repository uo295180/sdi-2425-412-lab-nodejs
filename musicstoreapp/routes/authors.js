module.exports = function (app) {
    app.get('/authors/add', function (req, res) {
        roles = ["Cantante", "Trompetista", "Violinista", "Saxofonista", "Pianista"]
        let response = {
            roles: roles
        }
        res.render('authors/add.twig', response)
    });

    app.post('/authors/add', function (req, res) {
        let name = req.body.name;
        let group = req.body.grupo;
        let rol = req.body.role;
        let errors = []

        if (name === undefined) {
            errors.push({"Error": "Name is undefined"})
        } else if (name === null) {
            errors.push({"Error": "Name is null"})
        } else if (name === "") {
            errors.push({"Error": "Name is empty"})
        }
        if (group === undefined) {
            errors.push({"Error": "Group is undefined"})
        } else if (group === null) {
            errors.push({"Error": "Group is null"})
        } else if (group === "") {
            errors.push({"Error": "Group is empty"})
        }
        if (rol === undefined) {
            errors.push({"Error": "Role is undefined"})
        } else if (rol === null) {
            errors.push({"Error": "Role is null"})
        } else if (group === "") {
            errors.push({"Error": "Group is empty"})
        }

        if(errors.length > 0) {
            res.send(errors);
        } else {
            let response = "Autor agregado: " + name + "<br>"
                + " grupo: " + group + "<br>"
                + " rol: " + rol;
            res.send(response);
        }
    });

    app.get('/authors', function (req, res) {
        let autores = [
            {
                "name": "Carlos Santana",
                "grupo": "Santana",
                "role": "Guitarrista"
            },
            {
                "name": "Luis Miguel",
                "grupo": "Solista",
                "role": "Cantante"
            },
            {
                "name": "Charlie Parker",
                "grupo": "Charlie Parker Quintet",
                "role": "Saxofonista"
            },
            {
                "name": "Wynton Marsalis",
                "grupo": "Jazz at Lincoln Center Orchestra",
                "role": "Trompetista"
            },
            {
                "name": "Rubén González",
                "grupo": "Buena Vista Social Club",
                "role": "Pianista"
            },
            {
                "name": "Itzhak Perlman",
                "grupo": "Solista",
                "role": "Violinista"
            },
            {
                "name": "Frank Sinatra",
                "grupo": "Solista",
                "role": "Cantante"
            },
            {
                "name": "John Coltrane",
                "grupo": "John Coltrane Quartet",
                "role": "Saxofonista"
            },
            {
                "name": "Dizzy Gillespie",
                "grupo": "Dizzy Gillespie Big Band",
                "role": "Trompetista"
            },
            {
                "name": "Chick Corea",
                "grupo": "Return to Forever",
                "role": "Pianista"
            }
        ]
        let response = {
            autores: autores
        };
        res.render('authors/authors.twig', response);

    });

    app.get('/autho*', function (req, res) {
        res.redirect('/authors');
    });

    app.get('/authors/*', function (req, res) {
        res.redirect('/authors');
    });
}