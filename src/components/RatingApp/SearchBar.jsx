import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="search-row">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-input"
            />
            <button onClick={onSearch} className="ok-btn">ok</button>
        </div>
    );
};

export default SearchBar;