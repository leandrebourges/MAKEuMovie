import express from "express";
import { films } from '../src/donnees/films.ts';

//creer une instance de l'application express
const app = express();

//parcours l'ancienne liste et cree une nouvelle avec un statut "seen" initialisé à false
const filmsAvecStatut = films.map((film) => ({
    ...film,
    seen: false,
}));

app.get('/api/films', (_request, response) => {
    response.json(filmsAvecStatut);
});

app.listen(3000, () => {
    console.log('Serveur disponible sur http://localhost:3000/api/films');
});

//node -- watch server/index.ts
//--watch permet de relancer le serveur à chaque modification du code