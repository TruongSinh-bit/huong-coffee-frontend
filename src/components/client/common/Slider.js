import React, { useState, useEffect } from 'react';
import './Slider.css';
import {Link} from "react-router-dom";
const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { backgroundImage: 'url(/images/bg_1.jpg)', heading: "The Best Coffee Testing Experience", subheading: "Welcome", text: "A small river named Duden flows by their place and supplies it with the necessary regelialia." },
        { backgroundImage: 'url(/images/about.jpg)', heading: "Amazing Taste & Beautiful Place", subheading: "Welcome", text: "A small river named Duden flows by their place and supplies it with the necessary regelialia." },
        { backgroundImage: 'url(/images/bg_3.jpg)', heading: "Creamy Hot and Ready to Serve", subheading: "Welcome", text: "A small river named Duden flows by their place and supplies it with the necessary regelialia." }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="home-slider owl-carousel">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slider-item ${currentSlide === index ? 'active' : ''}`}
                    style={{ backgroundImage: slide.backgroundImage, display: currentSlide === index ? 'block' : 'none' }}
                >
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">
                            <div className="col-md-8 col-sm-12 text-center">
                                <span className="subheading">{slide.subheading}</span>
                                <h1 className="mb-4">{slide.heading}</h1>
                                <p className="mb-4 mb-md-5">{slide.text}</p>
                                <p>
                                    <Link to="/order" className="btn btn-primary p-3 px-xl-4 py-xl-3">Order Now</Link>
                                    <Link to="/menu" className="btn btn-white btn-outline-white p-3 px-xl-4 py-xl-3">View Menu</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Slider;
