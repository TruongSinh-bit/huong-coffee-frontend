import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Forbidden403 = () => {
    return (
        <>
            <Helmet>
                <title>403 &mdash; Forbidden</title>

                {/* Import CSS */}
                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
                <link rel="stylesheet" href="/assets/css/style.css"/>
                <link rel="stylesheet" href="/assets/css/components.css"/>

                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-94034622-3"></script>
                <script>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-94034622-3');
                    `}
                </script>
            </Helmet>

            <div id="app">
                <section className="section">
                    <div className="container mt-5">
                        <div className="page-error">
                            <div className="page-inner">
                                <h1>403</h1>
                                <div className="page-description">
                                    You do not have access to this page.
                                </div>
                                <div className="page-search">
                                    <form>
                                        <div className="form-group floating-addon floating-addon-not-append">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-search"></i>
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Search"/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary btn-lg">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-3">
                                        <Link to="/admin/sell">Back to Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="simple-footer mt-5">
                            Copyright &copy; Stisla 2018
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Forbidden403;
