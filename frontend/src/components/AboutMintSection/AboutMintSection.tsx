import React from 'react';
import classes from './AboutMintSection.module.scss';
import CountMinted from '../CountMinted/CountMinted';
import MintButton from '../MintButton/MintButton';

const AboutMintSection = () => {
    return (
        <section id={'story'} className={classes.section}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <h3>
                        Baton’s <span className={classes.titleActive}>story</span>
                    </h3>
                    <p className={classes.desc}>
                        Baton was born as a good boy one summer. He was growing up in the IT family
                        watching products launching and startups raising. He was with his parents in
                        every ups and downs. They do love him so much. And worked so hard for better
                        life. Many their aims and wishes came true with Baton. So one day when IT
                        agency had started he became a symbol of Batonis.
                    </p>
                    <div className={classes.info}>
                        <div className={classes.infoItem}>
                            <span className={classes.infoItemTitle}>20 items</span>
                            <span className={classes.infoItemSubtitle}>in collection</span>
                        </div>
                        <div className={classes.infoItem}>
                            <span className={classes.infoItemTitle}>0,01 ETH</span>
                            <span className={classes.infoItemSubtitle}>price</span>
                        </div>
                        <div className={classes.infoItem}>
                            <span className={classes.infoItemTitle}>1 NFT</span>
                            <span className={classes.infoItemSubtitle}>per wallet</span>
                        </div>
                    </div>
                    <MintButton />
                </div>
                <CountMinted />
            </div>
        </section>
    );
};

export default React.memo(AboutMintSection);
