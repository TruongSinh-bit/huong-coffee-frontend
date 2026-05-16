import React, { useEffect } from 'react';
import $ from 'jquery';

const Loader = () => {
    useEffect(() => {
        setTimeout(() => {
            $('#ftco-loader').removeClass('show');
        }, 1);
    }, []);

    return <div id="ftco-loader" className="fullscreen"></div>;
};

export default Loader;
