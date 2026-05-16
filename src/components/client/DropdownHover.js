import React, { useEffect } from 'react';
import $ from 'jquery';

const DropdownHover = () => {
    useEffect(() => {
        $('nav .dropdown').hover(
            function () {
                const $this = $(this);
                $this.addClass('show');
                $this.find('> a').attr('aria-expanded', true);
                $this.find('.dropdown-menu').addClass('show');
            },
            function () {
                const $this = $(this);
                $this.removeClass('show');
                $this.find('> a').attr('aria-expanded', false);
                $this.find('.dropdown-menu').removeClass('show');
            }
        );
    }, []);

    return null;
};

export default DropdownHover;
