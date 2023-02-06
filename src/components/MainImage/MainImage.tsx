import React from 'react';
import classes from './MainImage.module.scss';
import mainImg from '../../assets/img/main-dog.png';

const MainImage = () => {
    return (
        <div className={classes.container}>
            <div className={classes.circle}/>
            <img className={classes.img} src={mainImg} alt="corgi main"/>
            <div className={classes.shadow}/>
        </div>
    );
};

export default MainImage;