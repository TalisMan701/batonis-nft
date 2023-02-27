import React, {FC} from 'react';
import classes from './Loading.module.scss';
import Loader from '../../components/Loader/Loader';

interface LoadingProps {
    stage?: string
    infinity?: boolean
}

const Loading: FC<LoadingProps> = ({stage, infinity = false}) => {
    return (
        <div className={classes.wrapper}>
            <Loader scale={1} infinity={infinity}/>
            {stage &&
                <div className={classes.stage}>{stage}</div>
            }
        </div>
    );
};

export default Loading;