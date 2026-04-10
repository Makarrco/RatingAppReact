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

export async function getMovieById(id) {
    const response = await  fetch(`${API_BASE}`)
}

export const getActorDetails = async (actorId) => {
    const res = await fetch(`/api/movie/actor/${actorId}`);
    if (!res.ok) throw new Error("Failed to fetch actor");
    return res.json();
};

export const getMoviesByActor = async (actorId, page = 1) => {
    const res = await fetch(`/api/movie/actor/${actorId}/movies?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch actor movies");
    return res.json();
};

export const getMoviesByActorName = async (actorName, page = 1) => {
    const res = await fetch(`/api/movie/actor/search?name=${encodeURIComponent(actorName)}&page=${page}`);
    if (!res.ok) throw new Error("Actor not found");
    return res.json();
};