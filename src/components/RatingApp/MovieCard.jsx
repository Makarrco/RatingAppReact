import React from "react";

const MovieCard = ({ movie }) => {
    const title = movie.title || "Unknown Title";
    const overview = movie.overview || "No description available.";
    const voteAverage = movie.vote_average ?? "N/A";
    const releaseDate = movie.release_date || "Unknown";
    const posterPath = movie.poster_path;

    const imageUrl = posterPath
        ? `https://image.tmdb.org/t/p/w780${posterPath}`
        : "/no-poster.jpg";

    return (
        <div className="movie-card">
            <img
                src={imageUrl}
                alt={title}
                className="movie-poster"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/no-poster.jpg";
                }}
            />

            <div className="movie-info">
                <h3>{title}</h3>

                <div className="movie-meta">
                    <span className="rating-badge">⭐ {voteAverage}</span>
                    <span className="release-date">{releaseDate}</span>
                </div>

                <p className="overview">{overview}</p>
            </div>
        </div>
    );
};

export default MovieCard;