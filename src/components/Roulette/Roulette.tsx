import React, {FC} from 'react';
import classes from './Roulette.module.scss';
import RouletteItem from './RouletteItem/RouletteItem';

const items = [
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
]

interface RouletteProps{
    sizeItems?: number
}

const Roulette: FC<RouletteProps> = ({sizeItems = 400}) => {
    return (
        <div className={classes.container}>
            <div className={classes.wrapper} style={{transform: 'translateX(-500px)'}}>
                {items.map((item) => (
                    <RouletteItem key={item.id} item={{...item, size: sizeItems}}/>
                ))}
                <div className={classes.overlay}/>
            </div>
        </div>
    );
};

export default Roulette;