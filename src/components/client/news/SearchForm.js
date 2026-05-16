import React from 'react';
import Categories from "./Categories";
import TagCloud from "./TagCloud";
import FeaturedNews from "./FeaturedNews";

const SearchForm = () => (
                <div className="col-md-4 sidebar">
                    <div className="sidebar-box">
                        <form action="#" className="search-form">
                            <div className="form-group">
                                <div className="icon">
                                    <span className="icon-search"></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Search..."/>
                            </div>
                        </form>
                    </div>
                    <Categories/>
                    <FeaturedNews/>
                    <TagCloud/>
                </div>
);

export default SearchForm;
