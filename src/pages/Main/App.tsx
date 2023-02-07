import React, {useEffect} from 'react';
import Header from '../../components/Header/Header';
import classes from './App.module.scss';
import CursorTestGSAP from '../../components/Cursor/CursorTestGSAP';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import CarouselSection from '../../components/CarouselSection/CarouselSection';
import AboutMintSection from '../../components/AboutMintSection/AboutMintSection';
import Footer from '../../components/Footer/Footer';
import InfinityText from '../../components/InfinityText/InfinityText';
import ReactPortal from '../../components/ReactPortal/ReactPortal';
import ModalConnectWallet from '../../components/ModalConnectWallet/ModalConnectWallet';
import ModalMint from '../../components/ModalMint/ModalMint';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {modalsSlice} from '../../store/reducers/ModalsReducer/ModalsSlice';
import {_eventOnChangeChain, _eventOnChangeWallet} from '../../store/reducers/UserReducer/UserActionCreators';
import {changeChainId, worknet} from '../../api/web3';
import ToastWrapper from '../../components/Toast/ToastWrapper';
import {toastsSlice} from '../../store/reducers/ToastsReducer/ToastsSlice';

const App = () => {
    const {connectWalletModalIsOpen, mintModalIsOpen} = useAppSelector(state => state.modals);
    const {isRightChainId} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(_eventOnChangeWallet())
        dispatch(_eventOnChangeChain())
    },[])

    useEffect(()=>{
        if(isRightChainId === false){
            dispatch(toastsSlice.actions.show(
                <span>
                    You are not on the {worknet.chainName} network.
                    Please <a className="link" onClick={changeChainId}>Switch Network</a>
                </span>
            ))
        }
    }, [isRightChainId])

    return (
        <>
            <Header/>
            <WelcomeSection/>
            <CarouselSection/>
            <AboutMintSection/>
            <InfinityText>
                <span style={{margin: '0px 16px'}}>Get site for your NFT collection</span>
                <span style={{margin: '0px 16px'}}>Get site for your NFT collection</span>
                <span style={{margin: '0px 16px'}}>Get site for your NFT collection</span>
                <span style={{margin: '0px 16px'}}>Get site for your NFT collection</span>
            </InfinityText>
            <Footer/>

            <ModalConnectWallet isOpen={connectWalletModalIsOpen} handleClose={()=>dispatch(modalsSlice.actions.setConnectWalletModalIsOpen(false))}/>
            <ModalMint isOpen={mintModalIsOpen} handleClose={() => dispatch(modalsSlice.actions.setMintModalIsOpen(false))}/>

            <ToastWrapper/>

            <ReactPortal wrapperId={'react-portal-cursor-container'}>
                <CursorTestGSAP/>
            </ReactPortal>
        </>
    );
};

export default App;