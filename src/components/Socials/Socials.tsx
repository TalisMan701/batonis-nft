import React, {CSSProperties, FC} from 'react';
import classes from './Socials.module.scss';
import Button from '../UiKit/Button/Button';

import githubSVG from '../../assets/icons/github.svg';
import linkedinSVG from '../../assets/icons/linkedin.svg';
import telegramSVG from '../../assets/icons/telegram.svg';

interface SocialsProps {
    style?: CSSProperties
}

const Socials: FC<SocialsProps> = ({style}) => {
    return (
        <div className={classes.container} style={{...style}}>
            <Button icon={<img src={githubSVG} alt="github"/>} iconDirection={'left'} color={'secondary'}/>
            <Button icon={<img src={linkedinSVG} alt="linkedin"/>} iconDirection={'left'} color={'secondary'}/>
            <Button icon={<img src={telegramSVG} alt="telegram"/>} iconDirection={'left'} color={'secondary'}/>
        </div>
    );
};

export default Socials;