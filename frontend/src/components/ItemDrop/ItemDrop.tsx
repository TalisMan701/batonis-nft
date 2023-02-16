import React, {FC} from 'react';
import classes from './ItemDrop.module.scss';
import {NFTData} from '../Roulette/Roulette';

interface ItemDropProps {
    item?: NFTData
}

const tempItem: NFTData = {
    id: 0,
    img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
    rarity: 'ultraRare',
}

const ItemDrop: FC<ItemDropProps> = ({item = tempItem}) => {
    return (
        <div className={classes.wrapper}>
            <h3>Your <span>Baton</span></h3>
            <p>Only 30% users have the same</p>
            <div className={classes.imgWrapper}>
                <img className={classes.img} src={item.img} alt="Your NFT"/>
                <div className={classes.bg}/>
            </div>
        </div>
    );
};

export default ItemDrop;