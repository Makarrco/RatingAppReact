import React, { useEffect, useState } from "react";
import "../../App.css";

import MovieCard from "./MovieCard.jsx";
import SearchBar from "./SearchBar.jsx";
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";
import MovieModal from "../MovieModal.jsx";

import {
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
    searchMovies,
    getMoviesByGenre,
    getMoviesByCompany,
    getMoviesByActorName,
} from "../../services/MovieApi.js";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

const RatingApp = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [actorSearch, setActorSearch] = useState("");
    const [actorInput, setActorInput] = useState("");
    const [selectedActor, setSelectedActor] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("top-rated");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [lang, setLang] = useState("en-US");

    useEffect(() => {
        const handler = (e) => setSelectedMovie(e.detail);
        window.addEventListener("open-movie", handler);
        return () => window.removeEventListener("open-movie", handler);
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError("");
                let data;

                if (searchTerm.trim()) {
                    data = await searchMovies(searchTerm, currentPage, lang);
                } else if (actorSearch.trim()) {
                    const result = await getMoviesByActorName(actorSearch, currentPage, lang);
                    setSelectedActor({ name: result.actor.name });
                    data = result.movies;
                } else if (selectedCompany) {
                    data = await getMoviesByCompany(selectedCompany, currentPage, lang);
                } else if (selectedGenre) {
                    data = await getMoviesByGenre(selectedGenre, currentPage, lang);
                } else {
                    switch (selectedCategory) {
                        case "top-rated":   data = await getTopRatedMovies(currentPage, lang); break;
                        case "now-playing": data = await getNowPlayingMovies(currentPage, lang); break;
                        case "upcoming":    data = await getUpcomingMovies(currentPage, lang); break;
                        default:            data = await getPopularMovies(currentPage, lang); break;
                    }
                }

                setMovies(data.results || []);
                setTotalPages(data.total_pages || 1);
            } catch (err) {
                setError(err.message || "Something went wrong");
                setMovies([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage, searchTerm, actorSearch, selectedGenre, selectedCompany, selectedCategory, lang]);

    const handleSearch = () => {
        setActorSearch("");
        setSelectedActor(null);
        setActorInput("");
        setCurrentPage(1);
    };

    const handleActorSearch = () => {
        if (!actorInput.trim()) return;
        setActorSearch(actorInput.trim());
        setSearchTerm("");
        setSelectedGenre("");
        setSelectedCompany("");
        setSelectedCategory("popular");
        setCurrentPage(1);
    };

    const clearActorSearch = () => {
        setActorSearch("");
        setActorInput("");
        setSelectedActor(null);
        setSelectedCategory("top-rated");
        setCurrentPage(1);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedGenre("");
        setSelectedCompany("");
        setSearchTerm("");
        setActorSearch("");
        setSelectedActor(null);
        setActorInput("");
        setCurrentPage(1);
    };

    const handleGenreChange = (value) => {
        setSelectedGenre(value);
        setSelectedCompany("");
        setSelectedCategory("popular");
        setSearchTerm("");
        setActorSearch("");
        setSelectedActor(null);
        setActorInput("");
        setCurrentPage(1);
    };

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
        setSelectedGenre("");
        setSelectedCategory("popular");
        setSearchTerm("");
        setActorSearch("");
        setSelectedActor(null);
        setActorInput("");
        setCurrentPage(1);
    };

    return (
        <div className="app-wrapper">
            
            <div className="header-row">
                <div>
                    <h1 className="title">CineLuxe</h1>
                    <p className="subtitle">Discover premium cinema picks</p>
                </div>
                <LanguageSwitcher lang={lang} setLang={(code) => { setLang(code); setCurrentPage(1); }} />
            </div>
            

            <div className="main-box">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                />

                <div className="actor-search-bar">
                    <input
                        type="text"
                        placeholder="🎭 Search by actor name..."
                        className="actor-search-input"
                        value={actorInput}
                        onChange={e => setActorInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") handleActorSearch(); }}
                    />
                </div>

                {selectedActor && (
                    <p className="actor-filter-label">
                        🎭 Showing movies with <strong>{selectedActor.name}</strong>
                        <button onClick={clearActorSearch}>✕</button>
                    </p>
                )}

                <Filters
                    selectedGenre={selectedGenre}
                    setSelectedGenre={handleGenreChange}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={handleCategoryChange}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={handleCompanyChange}
                />

                {loading && <p className="status-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}

                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={() => setSelectedMovie(movie)}
                            />
                        ))
                    ) : (
                        !loading && <p className="status-text">No movies found</p>
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage(p => p - 1)}
                    onNext={() => setCurrentPage(p => p + 1)}
                />
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    lang={lang}
                />
            )}
        </div>
    );
};

export default RatingApp;