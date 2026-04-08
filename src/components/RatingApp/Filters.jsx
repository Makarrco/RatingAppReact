import React from "react";

const Filters = ({
    selectedGenre,
    setSelectedGenre,
    selectedCategory,
    setSelectedCategory,
    selectedCompany,
    setSelectedCompany
}) => {
    return (
        <div className="filters-bar">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="luxury-select"
            >
                <option value="popular">Popular</option>
                <option value="top-rated">Top Rated</option>
                <option value="now-playing">Now Playing</option>
                <option value="upcoming">Upcoming</option>
            </select>

            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="luxury-select"
            >
                <option value="">All Genres</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="horror">Horror</option>
                <option value="drama">Drama</option>
                <option value="romance">Romance</option>
                <option value="animation">Animation</option>
                <option value="thriller">Thriller</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="adventure">Adventure</option>
                <option value="fantasy">Fantasy</option>
            </select>

            <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="luxury-select"
            >
                <option value="">All Studios</option>
                <option value="marvel">Marvel</option>
                <option value="pixar">Pixar</option>
                <option value="warner bros">Warner Bros</option>
                <option value="universal">Universal</option>
                <option value="disney">Disney</option>
                <option value="dreamworks">DreamWorks</option>
            </select>
        </div>
    );
};

export default Filters;