import React, { useEffect } from 'react';
import $ from 'jquery';

const OnePageNav = () => {
    useEffect(() => {
        $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function (e) {
            e.preventDefault();

            const hash = this.hash;
            const navToggler = $('.navbar-toggler');
            $('html, body').animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                700,
                'easeInOutExpo',
                function () {
                    window.location.hash = hash;
                }
            );

            if (navToggler.is(':visible')) {
                navToggler.click();
            }
        });
    }, []);

    return null;
};

export default OnePageNav;
