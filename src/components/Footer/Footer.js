import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';



export default function Footer () {
    
    const location = useLocation();

    return (
        // this footer is set up to render out when navigating to the printable report
        <>
                <footer>
                    &copy; Created by Julian Booher
                </footer>
        </>
    );
}
