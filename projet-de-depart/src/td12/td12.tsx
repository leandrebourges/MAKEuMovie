import { useEffect, useState, type SubmitEvent } from 'react';
import type { Movie } from '../donnees/films';

type ApiMovie = Movie & { seen: boolean };

export function Td12() {
    const [movies, setMovies] = useState<ApiMovie[]>([]);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFilms() {
            try {
                const response = await fetch('/api/films');
                if (!response.ok) throw new Error('Impossible de charger les films.');
                const data: ApiMovie[] = await response.json();
                setMovies(data);
            } catch {
                setError('Impossible de charger les films.');
            } finally {
                setLoading(false);
            }
        }

        loadFilms();
    }, []);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setSending(true);

        try {
            const response = await fetch('/api/films', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, year: Number(year) }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? 'Impossible d’ajouter le film.');
            }

            const newMovie: ApiMovie = data;
            setMovies((currentMovies) => [...currentMovies, newMovie]);
            setTitle('');
            setYear('');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Impossible d’ajouter le film.');
        } finally {
            setSending(false);
        }
    }

    const visibleMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.trim().toLowerCase()),
    );

    return (
        <main>
            <h1>TD 12 — Ajouter un film</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titre</label>
                <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={80}
                    required
                />

                <label htmlFor="year">Année</label>
                <input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    min={1888}
                    max={2030}
                    step={1}
                    required
                />

                <button type="submit" disabled={sending}>
                    {sending ? 'Ajout en cours…' : 'Ajouter'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {loading && <p>Chargement des films…</p>}

            <label htmlFor="query">Rechercher un film</label>
            <input
                id="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />

            {!loading && (
                <>
                    <p>{visibleMovies.length} film(s)</p>
                    <div className="catalog">
                        {visibleMovies.map((movie) => (
                            <article className="movie" key={movie.id}>
                                <div className={`poster tone-${movie.id % 6}`}>
                                    <span>{movie.seen ? 'Vu' : 'À voir'}</span>
                                    <strong>{movie.title}</strong>
                                    <span>{movie.year}</span>
                                </div>
                                <h3>{movie.title}</h3>
                                <p className="year">{movie.year}</p>
                            </article>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}