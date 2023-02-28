import React, {FC} from 'react';
import classes from './CountMinted.module.scss';
import vector1SVG from '../../assets/img/Vector1.svg';
import vector2SVG from '../../assets/img/Vector2.svg';
import groupVectorsSVG from '../../assets/img/GroupVectors.svg';
import Loader from '../Loader/Loader';
import {useMatchMedia} from '../../hooks/useMatchMedia';

interface ICountMintedProps {
    count?: number;
}

const CountMinted: FC<ICountMintedProps> = ({count = 5}) => {
    const {isTablet, isMobile} = useMatchMedia();
    return (
        <div className={classes.countMinted}>
            {/* <img className={classes.img1} src={groupVectorsSVG} alt="groupVectors"/>*/}
            <Loader
                progress={100}
                playAnimation={'paused'}
                scale={isMobile ? 0.75 : 2}
                style={{
                    position: 'absolute',
                    top: isMobile ? 400 : 374,
                    left: isTablet || isMobile ? -230 : 105,
                    zIndex: -1,
                }}
            />
            {/* <span className={classes.countMintedText}>{count} minted</span>*/}
        </div>
    );
};

export default CountMinted;
