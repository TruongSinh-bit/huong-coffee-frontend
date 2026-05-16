import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UseScrollToHash = (dependencies = []) => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash, ...dependencies]);
};

export default UseScrollToHash;
