// Ajout dans index.ts de:
//     app.patch('/api/films/:id', (request, response)
//     app.delete('/api/films/:id', (request, response)

// Dans td13.tsx :
//     Modif de export et de < h1 > pour adapter au TD13
//     Ajout de const [updating, setUpdating]
//     Ajout de handleToggleSeen
//     Ajout de handleDelete
//     Ajout des 2 boutons à la fin de chaque article de film


// .findIndex(...) cherche la position du film dans le tableau.Contrairement à.find(...), qui renvoie le film lui - même, findIndex renvoie un numéro de position.Il renvoie - 1 si le film n’existe pas
// splice(index, 1) retire un élément du tableau, à la position trouvée.Comme filmsAvecStatut est la liste en mémoire du serveur, la prochaine requête GET ne contiendra plus ce film.


//try-catch-finally : comme dans td12.tsx mais écrit ici car déjà trop de trucs dans notes_td12
//     finally est exécuté dans les 2 cas, ici il sert à réactiver le bouton (en mettant updating à false)
