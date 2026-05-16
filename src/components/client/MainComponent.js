import {useEffect} from "react";
import React from "react";
import AOS from 'aos';
import ScrollWindow from "./ScrollWindow";
import FullHeightComponent from "./FullHeightComponent";
import OnePageNav from "./OnePageNav";
import Loader from "./Loader";
import DropdownHover from "./DropdownHover";
import 'aos/dist/aos.css';
const MainComponent = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'slide',
        });
    }, []);

    return (
        <div className="js-fullheight">
            <ScrollWindow />
            {/*<FullHeightComponent></FullHeightComponent>*/}
            {/*<OnePageNav></OnePageNav>*/}
            <Loader></Loader>
            <DropdownHover></DropdownHover>
        </div>
    );
}
export default MainComponent;