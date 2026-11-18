import express from "express";
import { films, type Movie } from '../src/donnees/films.ts';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

//creer une instance de l'application express
const app = express();


app.use(express.json());


const dataFile = new URL('./films.json', import.meta.url);

type ServerMovie = Movie & { seen: boolean };

const startingMovies: ServerMovie[] = films.map((film) => ({
    ...film,
    seen: false,
}));

function loadFilms(): ServerMovie[] {
    if (existsSync(dataFile)) {
        const content = readFileSync(dataFile, 'utf8');
        return JSON.parse(content) as ServerMovie[];
    }

    writeFileSync(dataFile, JSON.stringify(startingMovies, null, 2) + '\n', 'utf8');
    return startingMovies;
}

const filmsAvecStatut = loadFilms();

function saveFilms(): void {
    writeFileSync(dataFile, JSON.stringify(filmsAvecStatut, null, 2) + '\n', 'utf8');
}

app.get('/api/films', (_request, response) => {
    response.json(filmsAvecStatut);
});


app.get('/api/films/:id', (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id)) {
        return response.status(400).json({ error: 'Identifiant invalide.' });
    }

    const film = filmsAvecStatut.find((film) => film.id === id);

    if (!film) {
        return response.status(404).json({ error: 'Film introuvable.' });
    }

    response.json(film);
});


app.post('/api/films', (request, response) => {
    const { title, year } = request.body;

    if (typeof title !== 'string' || title.trim().length < 1 || title.trim().length > 80) {
        return response.status(400).json({ error: 'Le titre doit contenir 1 à 80 caractères.' });
    }

    if (!Number.isInteger(year) || year < 1888 || year > 2030) {
        return response.status(400).json({ error: 'L\'année doit être un entier de 1888 à 2030.' });
    }

    const film = {
        id: Math.max(0, ...filmsAvecStatut.map((film) => film.id)) + 1,
        title: title.trim(),
        year,
        overview: '',
        seen: false,
    };

    filmsAvecStatut.push(film);
    saveFilms();
    response.status(201).json(film);
});


app.patch('/api/films/:id', (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id)) {
        return response.status(400).json({ error: 'Identifiant invalide.' });
    }

    const film = filmsAvecStatut.find((film) => film.id === id);

    if (!film) {
        return response.status(404).json({ error: 'Film introuvable.' });
    }

    const { seen } = request.body;

    if (typeof seen !== 'boolean') {
        return response.status(400).json({ error: 'Le statut vu doit être vrai ou faux.' });
    }

    film.seen = seen;
    saveFilms();
    response.json(film);
});


app.delete('/api/films/:id', (request, response) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id)) {
        return response.status(400).json({ error: 'Identifiant invalide.' });
    }

    const index = filmsAvecStatut.findIndex((film) => film.id === id);

    if (index === -1) {
        return response.status(404).json({ error: 'Film introuvable.' });
    }

    filmsAvecStatut.splice(index, 1);
    saveFilms();
    response.status(204).end();
});


app.listen(3000, () => {
    console.log('Serveur disponible sur http://localhost:3000/api/films');
});

//node -- watch server/index.ts
//--watch permet de relancer le serveur à chaque modification du code