import React, { useEffect } from 'react';
import $ from 'jquery';

const FullHeightComponent = () => {
    useEffect(() => {
        const setFullHeight = () => {
            $('.js-fullheight').css('height', $(window).height());
        };
        setFullHeight();
        $(window).resize(setFullHeight);
    }, []);

    return null;
};

export default FullHeightComponent;
