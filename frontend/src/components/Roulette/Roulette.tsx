import React, {FC, useEffect, useRef, useState} from 'react';
import classes from './Roulette.module.scss';
import RouletteItem from './RouletteItem/RouletteItem';
import lodash from 'lodash';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {userSlice} from '../../store/reducers/UserReducer/UserSlice';
import {INFTData} from '../../models/INFTData';
import {IRarity} from '../../models/IRarity';
import Loading from '../../pages/Loading/Loading';
import {approvePaymentToken, buyProcess, changeChainId, checkChainId, getPaymentAllowance} from '../../api/web3';
import {getFromLocalStorage} from '../../utils/localstorage';
import {_connectWallet, _mint} from '../../store/reducers/UserReducer/UserActionCreators';

const items: INFTData[] = [
    {
        id: 0,
        img: './img/nft/1.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'ultraRare',
    },
    {
        id: 1,
        img: './img/nft/2.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'ultraRare',
    },
    {
        id: 2,
        img: './img/nft/3.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'rare',
    },
    {
        id: 3,
        img: './img/nft/4.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'rare',
    },
    {
        id: 4,
        img: './img/nft/5.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'rare',
    },
    {
        id: 5,
        img: './img/nft/6.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 6,
        img: './img/nft/7.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 7,
        img: './img/nft/8.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 8,
        img: './img/nft/9.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 9,
        img: './img/nft/10.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 10,
        img: './img/nft/11.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 11,
        img: './img/nft/12.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 12,
        img: './img/nft/13.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 13,
        img: './img/nft/14.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 14,
        img: './img/nft/15.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 15,
        img: './img/nft/16.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 16,
        img: './img/nft/17.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 17,
        img: './img/nft/18.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 18,
        img: './img/nft/19.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 19,
        img: './img/nft/20.png',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
]

interface RouletteProps{
    sizeItems?: number
    marginItem?: number
}

type Chances = {[key: string]: number};

const playChances = {
    common: 80,
    rare: 15,
    ultraRare: 5,
};

const fakeChances = {
    common: 70,
    rare: 20,
    ultraRare: 10,
};

const mapChances = (chances: Chances) => {
    return Object.fromEntries(
        Object.entries(chances).map(([name], i) => [
            name,
            Object.values(chances)
                .slice(0, i + 1)
                .reduce((prev, cur) => prev + cur),
        ]),
    );
};

const chancedRandom = (chances: Chances) => {
    const random = Math.random();
    const [name] = Object.entries(mapChances(chances)).find(
        ([, chance]) => random * 100 < chance,
    ) as [IRarity, number];
    return name;
};

const Roulette: FC<RouletteProps> = ({sizeItems = 400, marginItem= 16}) => {
    const {iHaveDrop, currentAccount, fetchMint, fetchBuildRoulette, myDrop} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [properties, setProperties] = useState<{
        result: INFTData;
        itemsBefore: INFTData[];
        itemsAfter: INFTData[];
        offset: number;
    } | null>(null);

    const [margin, setMargin] = useState<number>(0);

    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        dispatch(_mint(currentAccount))
    },[])

    useEffect(() => {
        if(!fetchMint && myDrop){
            dispatch(userSlice.actions.setFetchBuildRoulette(true))
            const getRandomItem = (chances: Chances) => {
                const rolledRarity = chancedRandom(chances);
                const rolledItems = items.filter(({rarity}) => rarity === rolledRarity);
                return lodash.sample(rolledItems) as INFTData;
            };

            const result = {...myDrop};
            const itemWidth = sizeItems + marginItem*2;
            const resultIndex = lodash.random(15, 30);
            const innerOffset = 0.5;

            setProperties({
                result: result,
                itemsBefore: [...new Array(resultIndex).fill(0).map(() => getRandomItem(fakeChances))],
                itemsAfter: [...new Array(4).fill(0).map(() => getRandomItem(fakeChances))],
                offset: itemWidth * (resultIndex + innerOffset) - (wrapperRef.current?.clientWidth || 0)/2,
            });

            dispatch(userSlice.actions.setFetchBuildRoulette(false))

            setTimeout(() => dispatch(userSlice.actions.setIHaveDrop(true)), 10000);
        }
    }, [fetchMint]);

    useEffect(() => setMargin(properties ? -properties.offset : 0), [properties?.offset]);
    const classNamesBG = `${classes.bg} ${iHaveDrop ? classes.bgForDrop: ''}`;
    const classNamesWrapper = `${classes.wrapper} ${iHaveDrop ? classes.wrapperForDrop: ''}`;
    const classNamesDrop = `${classes.img} ${iHaveDrop ? classes.drop: ''}`;
    const classNamesItems = `${classes.items} ${iHaveDrop ? classes.itemsForDrop: ''}`;

    if(fetchMint || fetchBuildRoulette) return <Loading/>

    return (
        <div className={classes.container}>
            <div ref={wrapperRef} className={classNamesWrapper} >
                {iHaveDrop &&
                    <div>
                        <h3>Your <span>Baton</span></h3>
                        <p>Only 30% users have the same</p>
                    </div>
                }
                <div className={classNamesItems} style={{transform: `translateX(${iHaveDrop ? 0 : margin}px)`}}>
                    {!iHaveDrop && properties?.itemsBefore.map((item) => (
                        <RouletteItem key={item.id} item={{...item, size: sizeItems, margin: marginItem}}/>
                    ))}
                    {properties &&
                        <img className={classNamesDrop} src={properties.result.img} alt="Your NFT" style={{minWidth: sizeItems, height: sizeItems, margin: `0 ${marginItem}px`}}/>
                    }
                    {!iHaveDrop &&properties?.itemsAfter.map((item) => (
                        <RouletteItem key={item.id} item={{...item, size: sizeItems, margin: marginItem}}/>
                    ))}
                </div>
                <div className={classNamesBG} style={{height: sizeItems*1.3}}/>
                {!iHaveDrop &&
                    <div className={classes.overlay}/>
                }
            </div>
        </div>
    );
};

export default Roulette;