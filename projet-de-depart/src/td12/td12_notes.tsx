// Ajout de "app.use(express.json());" dans index.ts
// Ajout de "app.post('/api/films', (request, response) => {...});" dans index.ts
//Ajout de td12.tsx
//Ajout dans Menu.tsx import (au début) et de l'id (dans const pages)

// Eh ! Pourquoi tu lis ça ?? C'est mes notes pas les tiennes !
// Nan en vrai force chef <3



// express.json est un middleware
//     (qui permet de parser le corps des requêtes HTTP en JSON.
//     Cela est nécessaire pour pouvoir traiter les données envoyées par le client dans le corps de la requête,
//     notamment pour les méthodes POST et PUT.)
//
//     "Un middleware est une étape intermédiaire qui intercepte une requête pour effectuer une tâche avant de la transmettre à la suite de l'application"
//     Imaginons :
//         Moi : Je peux entrer ?
//         Middleware : [regarde si j'ai un badge]
//             - D'accord tu peux entrer            (si j'ai un badge)
//             - Désolé, tu ne peux pas entrer      (si je n'ai pas de badge)
//
//      Dans notre cas,
//      Il ne vérifie pas et ne bloque pas, il lit et décode les données JSON envoyées par le navigateur.
//          1. Le navigateur envoie un petit colis contenant {"title":"...", "year":2026}
//          2. express.json() ouvre le colis et transforme son contenu en objet JavaScript, accessible avec request.body
//          3. La route POST /api/films prend le relais : ce sont ses if qui vérifient le titre et l’année. Elle refuse les données invalides avec une réponse 400, ou ajoute le film et répond 201


// app.post(...) crée une route pour recevoir une requête POST, utilisée ici pour envoyer un nouveau film.
// const { title, year } = request.body récupère le titre et l’année préparés par le middleware.
// Les deux if vérifient les données. trim() enlève les espaces au début et à la fin.
// Math.max(...) + 1 choisit un nouvel identifiant supérieur à ceux déjà utilisés. Le 0 permet aussi de commencer à 1 si la liste était vide.
// filmsAvecStatut.push(film) ajoute le film à la liste gardée en mémoire par le serveur.
// response.status(201).json(film) répond avec le statut 201 — « créé » — et renvoie le film ajouté.

