import React from "react";
import styles from '../styles/Home.module.css'


const Footer = () => {

    const year = new Date().getFullYear();
    
    return(
        <div>
        <footer className={styles.footer}>Copywright {year} Antonio Beltran</footer>
        </div>
    )
};

export default Footer;