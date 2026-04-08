const API_BASE = "https://localhost:7149/api/movie";

async function fetchJson(url, errorMessage) {
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || errorMessage);
    }
    return await response.json();
}

export async function getTopRatedMovies(page = 1) {
    return fetchJson(`${API_BASE}/top-rated?page=${page}`, "Failed to fetch top rated movies");
}

export async function getPopularMovies(page = 1) {
    return fetchJson(`${API_BASE}/popular?page=${page}`, "Failed to fetch popular movies");
}

export async function getNowPlayingMovies(page = 1) {
    return fetchJson(`${API_BASE}/now-playing?page=${page}`, "Failed to fetch now playing movies");
}

export async function getUpcomingMovies(page = 1) {
    return fetchJson(`${API_BASE}/upcoming?page=${page}`, "Failed to fetch upcoming movies");
}

export async function searchMovies(query, page = 1) {
    return fetchJson(`${API_BASE}/search?query=${encodeURIComponent(query)}&page=${page}`, "Failed to search movies");
}

export async function getMoviesByGenre(genre, page = 1) {
    return fetchJson(`${API_BASE}/genre?name=${encodeURIComponent(genre)}&page=${page}`, "Failed to fetch movies by genre");
}

export async function getMoviesByCompany(company, page = 1) {
    return fetchJson(`${API_BASE}/company?name=${encodeURIComponent(company)}&page=${page}`, "Failed to fetch movies by company");
}