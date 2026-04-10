import React, { useEffect } from "react";

const IMG_BASE = "https://image.tmdb.org/t/p/";

const MovieModal = ({ movie, onClose }) => {
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const poster = movie.poster_path
        ? `${IMG_BASE}w342${movie.poster_path}`
        : null;

    const backdrop = movie.backdrop_path
        ? `${IMG_BASE}w1280${movie.backdrop_path}`
        : null;

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
                                    <span className="modal-lang">{movie.original_language.toUpperCase()}</span>
                                )}
                                {movie.popularity && (
                                    <span>🔥 {Math.round(movie.popularity)}</span>
                                )}
                            </div>

                            <p className="modal-overview">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;