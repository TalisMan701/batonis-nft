import React from 'react';
import Header from '../../components/Header/Header';
import classes from './App.module.scss';
import CursorTestGSAP from '../../components/Cursor/CursorTestGSAP';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import CarouselSection from '../../components/CarouselSection/CarouselSection';
import AboutMintSection from '../../components/AboutMintSection/AboutMintSection';
import Footer from '../../components/Footer/Footer';
import InfinityText from '../../components/InfinityText/InfinityText';
import ReactPortal from '../../components/ReactPortal/ReactPortal';
import {useUser} from '../../contexts/User/useUser';
import ModalConnectWallet from '../../components/ModalConnectWallet/ModalConnectWallet';
import ModalMint from '../../components/ModalMint/ModalMint';

const App = () => {
    const user = useUser();
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

            <ModalConnectWallet isOpen={user.connectWalletModalIsOpen} handleClose={()=>user.setConnectWalletModalIsOpen(false)}/>
            <ModalMint isOpen={user.mintModalIsOpen} handleClose={() => user.setMintModalIsOpen(false)}/>

            <ReactPortal wrapperId={'react-portal-cursor-container'}>
                <CursorTestGSAP/>
            </ReactPortal>
        </>
    );
};

export default App;