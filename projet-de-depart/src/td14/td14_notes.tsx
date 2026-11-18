// Dans index.ts :
//     import { existsSync, readFileSync, writeFileSync } from 'node:fs';
//     Ajout de ", type Movie" dans le 2e import (pour pouvoir utiliser le type Movie dans le code)
//     remplacement de filmsAvecStatut par
//         const dataFile
//         type ServerMovie
//         const startingMovies
//         function loadFilms()
//         const filmsAvecStatut
//     Ajout de function saveFilms()
//         Ajout de saveFilms() dans le POST - PATCH - DELETE

// Maintenant
//     server/films.json existe
//     un film ajouter/vu/supprimer est directement visible dans films.json
//         Ces changements restent persistants même après un redémarrage du serveur !

