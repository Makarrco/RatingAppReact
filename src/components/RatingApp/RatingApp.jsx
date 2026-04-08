import React, { useEffect, useState } from "react";
import "../../App.css";

import MovieCard from "./MovieCard.jsx";
import SearchBar from "./SearchBar.jsx";
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";

import {
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
    searchMovies,
    getMoviesByGenre,
    getMoviesByCompany
} from "../../services/MovieApi.js";

const RatingApp = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("top-rated");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Single effect — fires whenever page OR any filter changes
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError("");
                let data;

                if (searchTerm.trim()) {
                    data = await searchMovies(searchTerm, currentPage);
                } else if (selectedCompany) {
                    data = await getMoviesByCompany(selectedCompany, currentPage);
                } else if (selectedGenre) {
                    data = await getMoviesByGenre(selectedGenre, currentPage);
                } else {
                    switch (selectedCategory) {
                        case "top-rated":   data = await getTopRatedMovies(currentPage); break;
                        case "now-playing": data = await getNowPlayingMovies(currentPage); break;
                        case "upcoming":    data = await getUpcomingMovies(currentPage); break;
                        default:            data = await getPopularMovies(currentPage); break;
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
    }, [currentPage, searchTerm, selectedGenre, selectedCompany, selectedCategory]);

    // ✅ Filter handlers only update state — useEffect does the fetching
    const handleSearch = () => {
        setCurrentPage(1); // reset page, effect will fire
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedGenre("");
        setSelectedCompany("");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleGenreChange = (value) => {
        setSelectedGenre(value);
        setSelectedCompany("");
        setSelectedCategory("popular");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
        setSelectedGenre("");
        setSelectedCategory("popular");
        setSearchTerm("");
        setCurrentPage(1);
    };

    return (
        <div className="app-wrapper">
            <h1 className="title">CineLuxe</h1>
            <p className="subtitle">Discover premium cinema picks</p>

            <div className="main-box">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                />

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
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
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
        </div>
    );
};

export default RatingApp;