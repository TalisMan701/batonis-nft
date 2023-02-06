import React, {useRef} from 'react';
import classes from './CarouselSection.module.scss';
import Carousel from '../Carousel/Carousel';

const itemForCarousel = [
    {
        id: 0,
        url: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    },
    {
        id: 1,
        url: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
    },
    {
        id: 2,
        url: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    },
    {
        id: 3,
        url: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
    },
    {
        id: 4,
        url: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    },
    {
        id: 5,
        url: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
    },
    {
        id: 6,
        url: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    },
    {
        id: 7,
        url: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
    },
    {
        id: 8,
        url: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    },
    {
        id: 9,
        url: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
    },
];

const CarouselSection = () => {
    const scope = useRef<HTMLDivElement>(null)
    return (
        <section ref={scope} className={classes.section}>
            <Carousel items={itemForCarousel} scope={scope} direction={'left'}/>
            <div className={classes.container}>
                <h3 className={classes.text}>We introduce baton to share <br/> our agency spirit</h3>
            </div>
            <Carousel items={itemForCarousel} scope={scope} direction={'right'}/>
        </section>
    );
};

export default CarouselSection;