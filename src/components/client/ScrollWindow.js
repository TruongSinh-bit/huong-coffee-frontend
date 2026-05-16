import React, { useEffect } from 'react';
import $ from 'jquery';

const ScrollWindow = () => {
    useEffect(() => {
        const scrollWindow = () => {
            $(window).scroll(function () {
                const $w = $(this);
                const st = $w.scrollTop();
                const navbar = $('.ftco_navbar');
                const sd = $('.js-scroll-wrap');

                if (st > 150) {
                    navbar.addClass('scrolled');
                } else {
                    navbar.removeClass('scrolled sleep');
                }

                if (st > 350) {
                    navbar.addClass('awake');
                    sd && sd.addClass('sleep');
                } else {
                    navbar.removeClass('awake').addClass('sleep');
                    sd && sd.removeClass('sleep');
                }
            });
        };
        scrollWindow();
    }, []);

    return null;
};

export default ScrollWindow;
