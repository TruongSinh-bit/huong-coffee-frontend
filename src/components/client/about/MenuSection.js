import React from 'react';
import {Link} from "react-router-dom";

const MenuSection = () => {
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 pr-md-5">
                        <div className="heading-section text-md-right ">
                            <span className="subheading">Discover</span>
                            <h2 className="mb-4">Our Menu</h2>
                            <p className="mb-4">
                                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics,
                                a large language ocean.
                            </p>
                            <p>
                                <Link to="/menu" className="btn btn-primary btn-outline-primary px-4 py-3">View Full Menu</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <MenuEntry imgSrc="images/menu-1.jpg" />
                            <MenuEntry imgSrc="images/menu-2.jpg" marginTop />
                            <MenuEntry imgSrc="images/menu-3.jpg" />
                            <MenuEntry imgSrc="images/menu-4.jpg" marginTop />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MenuEntry = ({ imgSrc, marginTop }) => {
    return (
        <div className={`col-md-6 ${marginTop ? 'mt-lg-4' : ''}`}>
            <div className="menu-entry">
                <a href="#" className="img" style={{ backgroundImage: `url(${imgSrc})` }}></a>
            </div>
        </div>
    );
};

export default MenuSection;
