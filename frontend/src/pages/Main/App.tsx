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
import Roulette from '../../components/Roulette/Roulette';
import ItemDrop from '../../components/ItemDrop/ItemDrop';
import {useMatchMedia} from '../../hooks/useMatchMedia';
import Loading from '../Loading/Loading';
import {userSlice} from '../../store/reducers/UserReducer/UserSlice';
import ContractController from '../../components/ContractController/ContractController';
import Button from '../../components/UiKit/Button/Button';

const App = () => {
    const {connectWalletModalIsOpen, mintModalIsOpen} = useAppSelector(state => state.modals);
    const {isRightChainId, isLoading, goRoulette, iHaveDrop, currentAccount} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()
    const {isMobile, isTablet, isDesktop, isDesktopXL} = useMatchMedia();
    useEffect(()=>{
        dispatch(_eventOnChangeWallet())
        dispatch(_eventOnChangeChain())
    },[])

    useEffect(()=>{
        if(isRightChainId === false && currentAccount){
            dispatch(toastsSlice.actions.show(
                <span>
                    You are not on the {worknet.chainName} network.
                    Please <Button size={'s'} label={'Switch Network'} onClick={changeChainId}/>
                </span>
            ))
        }
    }, [isRightChainId])

    useEffect(()=>{
        if(isLoading){
            setTimeout(()=>{
                dispatch(userSlice.actions.setIsLoading(false))
            },2000)
            document.body.style.overflow = 'hidden'
        } else{
            document.body.style.overflow = 'hidden auto'
        }
    },[isLoading])

    return (
        <>
            {isLoading &&
                <Loading progress={100}/>
            }
            <Header/>
            {!goRoulette?
                <>
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
                </>:
                <>
                    <Roulette sizeItems={isMobile ? 250 : isTablet ? 330 : 400} marginItem={isMobile ? 8 : 16}/>
                </>
            }

            {/* <ModalConnectWallet isOpen={connectWalletModalIsOpen} handleClose={()=>dispatch(modalsSlice.actions.setConnectWalletModalIsOpen(false))}/>*/}
            {/* <ModalMint isOpen={mintModalIsOpen} handleClose={() => dispatch(modalsSlice.actions.setMintModalIsOpen(false))}/>*/}
            {/* <ContractController/>*/}
            <ToastWrapper/>

            {!isMobile &&
                <ReactPortal wrapperId={'react-portal-cursor-container'}>
                    <CursorTestGSAP/>
                </ReactPortal>
            }
        </>
    );
};

export default App;