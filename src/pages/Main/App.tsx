import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import classes from './App.module.scss';
import CursorTestGSAP from '../../components/Cursor/CursorTestGSAP';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import CarouselSection from '../../components/CarouselSection/CarouselSection';
import AboutMintSection from '../../components/AboutMintSection/AboutMintSection';
import Footer from '../../components/Footer/Footer';
import InfinityText from '../../components/InfinityText/InfinityText';
import ReactPortal from '../../components/ReactPortal/ReactPortal';

const App = () => {
    const {ethereum} = window;
    const [currentAccount, setCurrentAccount] = useState('');
    const [isRightChainId, setIsRightChainId] = useState(false)



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
            <ReactPortal wrapperId={'react-portal-cursor-container'}>
                <CursorTestGSAP/>
            </ReactPortal>
        </>
    );
};

export default App;