import React, {FC} from 'react';
import classes from './CountMinted.module.scss';
import vector1SVG from '../../assets/img/Vector1.svg';
import vector2SVG from '../../assets/img/Vector2.svg';
import groupVectorsSVG from '../../assets/img/GroupVectors.svg';

interface ICountMintedProps {
    count?: number
}


const CountMinted: FC<ICountMintedProps> = ({count= 5}) => {
    return (
        <div className={classes.countMinted}>
            <img className={classes.img1} src={groupVectorsSVG} alt="groupVectors"/>
            <span className={classes.countMintedText}>{count} minted</span>
        </div>
    );
};

export default CountMinted;