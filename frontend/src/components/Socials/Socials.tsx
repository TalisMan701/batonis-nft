import React, {CSSProperties, FC} from 'react';
import classes from './Socials.module.scss';
import Button from '../UiKit/Button/Button';

import githubSVG from '../../assets/icons/github.svg';
import linkedinSVG from '../../assets/icons/linkedin.svg';
import telegramSVG from '../../assets/icons/telegram.svg';
import openSeaSVG from '../../assets/icons/openSea.svg';

interface SocialsProps {
    style?: CSSProperties
}

const Socials: FC<SocialsProps> = ({style}) => {
    return (
        <div className={classes.container} style={{...style}}>
            <Button type={'link'} href={'https://t.me/Danirill'} target={'_blank'} icon={<img draggable={false} src={telegramSVG} alt="telegram"/>} iconDirection={'left'} color={'secondary'}/>
            <Button type={'link'} href={'https://www.linkedin.com/company/batonis/'} target={'_blank'} icon={<img draggable={false} src={linkedinSVG} alt="linkedin"/>} iconDirection={'left'} color={'secondary'}/>
            <Button type={'link'} href={'https://github.com/Batonis-Tech/Batonis-Open-Projects'} target={'_blank'} icon={<img draggable={false} src={githubSVG} alt="github"/>} iconDirection={'left'} color={'secondary'}/>
            <Button type={'link'} href={'https://testnets.opensea.io/collection/batonisnft-2'} target={'_blank'} icon={<img draggable={false} src={openSeaSVG} alt="telegram"/>} iconDirection={'left'} color={'secondary'}/>
        </div>
    );
};

export default Socials;