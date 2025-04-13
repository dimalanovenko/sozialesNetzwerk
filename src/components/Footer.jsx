import React from 'react';
import {useLocation} from "react-router-dom";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    const location = useLocation();
    const isFeed = location.pathname === "/feed";

    return (
        <footer className={`hidden lg:block lg:text-[#838B98] lg:right-1/20 lg:w-1/5 lg:fixed lg:text-center ${isFeed ? 'lg:top-113' : 'lg:top-180'}`}>
            © {currentYear} Sociales-Netzwerk. Alle Rechte vorbehalten.
        </footer>
    )
}

export default Footer
