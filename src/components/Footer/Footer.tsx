import React from 'react';
import classes from './Footer.module.scss';
import Socials from '../Socials/Socials';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <h4 className={classes.subTitle}>Batonis Agency</h4>
                <h3 className={classes.title}>FULLStack development for startups</h3>
                <Socials/>
            </div>
        </footer>
    );
};

export default Footer;