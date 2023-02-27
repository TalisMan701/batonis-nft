import React from 'react';
import classes from './Loading.module.scss';
import Loader from '../../components/Loader/Loader';

const Loading = () => {
    return (
        <div className={classes.wrapper}>
            <Loader scale={1}/>
        </div>
    );
};

export default Loading;