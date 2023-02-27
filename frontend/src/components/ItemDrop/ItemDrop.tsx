import React, {FC} from 'react';
import classes from './ItemDrop.module.scss';
import {useAppSelector} from '../../hooks/reduxHooks';
import {INFTData} from '../../models/INFTData';

interface ItemDropProps {
    item?: INFTData
}

const tempItem: INFTData = {
    id: 0,
    img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
    cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
    rarity: 'ultraRare',
}

const ItemDrop: FC<ItemDropProps> = ({item = tempItem}) => {
    const {myDrop} = useAppSelector(state => state.user)
    return (
        <div className={classes.wrapper}>
            <h3>Your <span>Baton</span></h3>
            <p>Only 30% users have the same</p>
            <div className={classes.imgWrapper}>
                <img className={classes.img} src={myDrop?.img} alt="Your NFT"/>
                <div className={classes.bg}/>
            </div>
        </div>
    );
};

export default ItemDrop;