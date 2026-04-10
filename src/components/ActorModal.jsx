import React, { useEffect, useState } from "react";
import { getActorDetails, getMoviesByActor } from "../services/MovieApi.js";

const IMG_BASE = "https://image.tmdb.org/t/p/";

const ActorModal = ({ actorId, onClose, onMovieClick }) => {
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const [actorData, moviesData] = await Promise.all([
                    getActorDetails(actorId),
                    getMoviesByActor(actorId)
                ]);
                setActor(actorData);
                setMovies(moviesData.results?.slice(0, 12) ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [actorId]);

    const photo = actor?.profilePath
        ? `${IMG_BASE}w342${actor.profilePath}`
        : null;

    const age = actor?.birthday
        ? new Date().getFullYear() - new Date(actor.birthday).getFullYear()
        : null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                {loading && <p className="modal-status">Loading...</p>}
                {error && <p className="modal-status error">{error}</p>}

                {actor && (
                    <div className="modal-body">
                        <div className="actor-top">
                            {photo && (
                                <img className="actor-photo" src={photo} alt={actor.name} />
                            )}
                            <div className="actor-info">
                                <h2 className="modal-title">{actor.name}</h2>

                                <div className="modal-meta-row">
                                    {actor.knownForDepartment && (
                                        <span className="modal-lang">{actor.knownForDepartment}</span>
                                    )}
                                    {actor.birthday && (
                                        <span>🎂 {actor.birthday} {age && `(${age} yrs)`}</span>
                                    )}
                                    {actor.deathday && (
                                        <span>✝ {actor.deathday}</span>
                                    )}
                                    {actor.placeOfBirth && (
                                        <span>📍 {actor.placeOfBirth}</span>
                                    )}
                                </div>

                                {actor.biography && (
                                    <p className="actor-bio">{actor.biography}</p>
                                )}
                            </div>
                        </div>

                        {movies.length > 0 && (
                            <div className="modal-cast-section">
                                <h3>Known for</h3>
                                <div className="actor-movies-grid">
                                    {movies.map(movie => (
                                        <div
                                            key={movie.id}
                                            className="actor-movie-card"
                                            onClick={() => { onClose(); onMovieClick(movie); }}
                                        >
                                            {movie.poster_path ? (
                                                <img
                                                    src={`${IMG_BASE}w185${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="actor-movie-poster"
                                                />
                                            ) : (
                                                <div className="actor-movie-poster cast-placeholder">
                                                    🎬
                                                </div>
                                            )}
                                            <p className="cast-name">{movie.title}</p>
                                            <p className="cast-character">
                                                ⭐ {movie.vote_average?.toFixed(1)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActorModal;