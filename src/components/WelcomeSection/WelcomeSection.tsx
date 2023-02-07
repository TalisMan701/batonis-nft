import React, {useEffect} from 'react';
import classes from './WelcomeSection.module.scss';
import MainImage from '../MainImage/MainImage';
import Button from '../UiKit/Button/Button';
import ButtonPageDown from '../UiKit/ButtonPageDown/ButtonPageDown';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {modalsSlice} from '../../store/reducers/ModalsReducer/ModalsSlice';

const WelcomeSection = () => {
    const {currentAccount} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <h4 className={classes.subTitle}>Batonis Agency’s collection</h4>
                    <h1>
                        10 <span className={classes.activeText}>unique</span> NFTs
                    </h1>
                    <h1 style={{marginLeft: 48}}>for our partners</h1>
                    <h1 style={{marginBottom: 24}}>
                        and <span className={classes.selectText}>customers</span>
                    </h1>
                    <Button
                        label={'Mint NFT'}
                        size={'l'}
                        onClick={() =>
                            currentAccount
                                ? dispatch(modalsSlice.actions.setMintModalIsOpen(true))
                                : dispatch(modalsSlice.actions.setConnectWalletModalIsOpen(true))
                        }
                    />
                </div>
                <MainImage />
                <ButtonPageDown
                    label={'DISCOVER'}
                    style={{
                        position: 'absolute',
                        bottom: -48,
                        left: '50%',
                        transform: 'translate(-50%, 50%)',
                    }}
                />
            </div>
        </section>
    );
};

export default React.memo(WelcomeSection);
