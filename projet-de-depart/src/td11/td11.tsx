// ajout de "app.get('/api/films/:id', (request, response)"

// localhost:3000/api/films
//     Si .../films/3      --> bien         --> affiche le film avec l'id 3
//     Si .../films/999    --> status 404   --> affiche {"error":"Film introuvable."}
//     Si .../films/a      --> status 400   --> affiche {"error":"Identifiant invalide."}
//         (même chose si ce n'est un un entier)


