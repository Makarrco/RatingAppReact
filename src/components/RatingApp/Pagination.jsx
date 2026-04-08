// Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <div className="pagination">
            <button onClick={onPrev} disabled={currentPage <= 1}>⬅</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={onNext} disabled={currentPage >= totalPages}>➡</button>
        </div>
    );
};

export default Pagination;