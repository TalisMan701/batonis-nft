import React, {CSSProperties, FC} from 'react';
import classes from './Logo.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {userSlice} from '../../store/reducers/UserReducer/UserSlice';
import Link from '../UiKit/Link/Link';

interface LogoProps {
    label: string;
    style?: CSSProperties;
}

const Logo: FC<LogoProps> = ({label, style}) => {
    const dispatch = useAppDispatch();
    const {iHaveDrop, goRoulette} = useAppSelector((state) => state.user);
    return (
        <Link
            mode={'secondary'}
            href={'#'}
            onClick={() => {
                if (iHaveDrop && goRoulette) {
                    dispatch(userSlice.actions.breakingMint());
                }
            }}
            className={classes.logo}
            style={{...style}}
            disable={!iHaveDrop && goRoulette}
        >
            {label}
        </Link>
    );
};

export default Logo;
