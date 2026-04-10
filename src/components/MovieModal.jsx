import React, { useEffect, useState } from "react";
import ActorModal from "./ActorModal.jsx";

const IMG_BASE = "https://image.tmdb.org/t/p/";

const MovieModal = ({ movie, onClose }) => {
    const [cast, setCast] = useState([]);
    const [castLoading, setCastLoading] = useState(true);
    const [selectedActorId, setSelectedActorId] = useState(null);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setCastLoading(true);
                const res = await fetch(`/api/movie/${movie.id}/details`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                // handle both camelCase (C# response) and snake_case
                const credits = data.credits || data.Credits;
                const castList = credits?.cast || credits?.Cast || [];
                setCast(castList.slice(0, 12));
            } catch {
                setCast([]);
            } finally {
                setCastLoading(false);
            }
        };
        fetchCast();
    }, [movie.id]);

    const poster = movie.poster_path
        ? `${IMG_BASE}w342${movie.poster_path}`
        : null;

    const backdrop = movie.backdrop_path
        ? `${IMG_BASE}w1280${movie.backdrop_path}`
        : null;

    if (selectedActorId) {
        return (
            <ActorModal
                actorId={selectedActorId}
                onClose={() => setSelectedActorId(null)}
                onMovieClick={(m) => {
                    setSelectedActorId(null);
                    onClose();
                    window.dispatchEvent(new CustomEvent("open-movie", { detail: m }));
                }}
            />
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                {backdrop && (
                    <div className="modal-backdrop" style={{ backgroundImage: `url(${backdrop})` }}>
                        <div className="modal-backdrop-fade" />
                    </div>
                )}

                <div className="modal-body">
                    <div className="modal-top">
                        {poster && (
                            <img className="modal-poster" src={poster} alt={movie.title} />
                        )}
                        <div className="modal-main-info">
                            <h2 className="modal-title">{movie.title}</h2>

                            {movie.original_title !== movie.title && (
                                <p className="modal-original-title">{movie.original_title}</p>
                            )}

                            <div className="modal-meta-row">
                                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                                <span>{movie.vote_count?.toLocaleString()} votes</span>
                                {movie.release_date && (
                                    <span>📅 {movie.release_date.slice(0, 4)}</span>
                                )}
                                {movie.original_language && (
                                    <span className="modal-lang">
                                        {movie.original_language.toUpperCase()}
                                    </span>
                                )}
                                {movie.popularity && (
                                    <span>🔥 {Math.round(movie.popularity)}</span>
                                )}
                            </div>

                            <p className="modal-overview">{movie.overview}</p>
                        </div>
                    </div>

                    <div className="modal-cast-section">
                        <h3>Cast</h3>
                        {castLoading && (
                            <p className="modal-status" style={{ padding: "1rem 0" }}>
                                Loading cast...
                            </p>
                        )}
                        {!castLoading && cast.length === 0 && (
                            <p className="modal-status" style={{ padding: "1rem 0" }}>
                                No cast info available
                            </p>
                        )}
                        {!castLoading && cast.length > 0 && (
                            <div className="modal-cast-grid">
                                {cast.map((member) => {
                                    const id = member.id || member.Id;
                                    const name = member.name || member.Name;
                                    const character = member.character || member.Character;
                                    const profilePath = member.profile_path || member.profilePath
                                        || member.ProfilePath;
                                    return (
                                        <div
                                            key={id}
                                            className="cast-card"
                                            onClick={() => setSelectedActorId(id)}
                                            title={`See ${name}'s movies`}
                                        >
                                            {profilePath ? (
                                                <img
                                                    src={`${IMG_BASE}w185${profilePath}`}
                                                    alt={name}
                                                    className="cast-photo"
                                                />
                                            ) : (
                                                <div className="cast-photo cast-placeholder">
                                                    {name?.charAt(0)}
                                                </div>
                                            )}
                                            <p className="cast-name">{name}</p>
                                            <p className="cast-character">{character}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;