import React, { useState } from "react";

const SearchNews = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="input-group" style={{ width: "300px" }}>
            <input
                type="text"
                className="form-control"
                placeholder="Search News by Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleSearch}>
                    <i className="fas fa-search"></i> Search
                </button>
            </div>
        </div>
    );
};

export default SearchNews;
