import React from 'react';
import classes from './Footer.module.scss';
import Socials from '../Socials/Socials';
import Button from '../UiKit/Button/Button';

const Footer = () => {
    return (
        <footer id={'projects'} className={classes.footer}>
            <div className={classes.container}>
                <h4 className={classes.subTitle}>Batonis Agency</h4>
                <h3 className={classes.title}>FULLStack development for startups</h3>
                <Button style={{marginBottom: 24}} type={'link'} target={'_blank'} href={'https://airtable.com/shr3QMVzvsDzsf94W'} label={'Explore us'} size={'m'}/>
                <Socials/>
            </div>
        </footer>
    );
};

export default Footer;