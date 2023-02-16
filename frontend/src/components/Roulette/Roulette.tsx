import React, {FC, useEffect, useRef, useState} from 'react';
import classes from './Roulette.module.scss';
import RouletteItem from './RouletteItem/RouletteItem';
import lodash from 'lodash';

export interface NFTData {
    id: number;
    img: string;
    cid: string;
    rarity: Rarity;
}

const items: NFTData[] = [
    {
        id: 0,
        img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'ultraRare',
    },
    {
        id: 1,
        img: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'ultraRare',
    },
    {
        id: 2,
        img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'rare',
    },
    {
        id: 3,
        img: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'rare',
    },
    {
        id: 4,
        img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'rare',
    },
    {
        id: 5,
        img: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 6,
        img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 7,
        img: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 8,
        img: 'https://bafybeie562kbomuteitcznj6dqxdud4xe2tmwbymysfh3tfw2ozyiq6s3m.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
    {
        id: 9,
        img: 'https://bafybeieiqsuu2hovs2zvfdjmluu53vvthzdthznqvch3oo4lxwnp5y4x2y.ipfs.nftstorage.link/',
        cid: 'bafkreibipqzz7rvyl4a5kqzwezqthriqc4silzt7isnjog6ugbzlslq4bi',
        rarity: 'common',
    },
]

interface RouletteProps{
    sizeItems?: number
    marginItem?: number
}

type Chances = {[key: string]: number};

type Rarity = 'common' | 'rare' | 'ultraRare';

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
    ) as [Rarity, number];
    return name;
};

const Roulette: FC<RouletteProps> = ({sizeItems = 400, marginItem= 16}) => {
    const [properties, setProperties] = useState<{
        result: NFTData;
        items: NFTData[];
        offset: number;
    } | null>(null);

    const [margin, setMargin] = useState<number>(0);

    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getRandomItem = (chances: Chances) => {
            const rolledRarity = chancedRandom(chances);
            const rolledItems = items.filter(({rarity}) => rarity === rolledRarity);
            return lodash.sample(rolledItems) as NFTData;
        };

        const result = getRandomItem(playChances);
        const itemWidth = sizeItems + marginItem*2;
        const resultIndex = lodash.random(15, 30);
        const innerOffset = 0.5;
        console.log(wrapperRef)
        setProperties({
            result: result,
            items: [
                ...new Array(resultIndex).fill(0).map(() => getRandomItem(fakeChances)),
                result,
                ...new Array(4).fill(0).map(() => getRandomItem(fakeChances)),
            ],
            offset: itemWidth * (resultIndex + innerOffset) - (wrapperRef.current?.clientWidth || 0)/2,
        });

        // setTimeout(() => props.onDrop(result), 10000);
    }, []);

    useEffect(() => setMargin(properties ? -properties.offset : 0), [properties?.offset]);

    return (
        <div className={classes.container}>
            <div ref={wrapperRef} className={classes.wrapper} >
                <div className={classes.items} style={{transform: `translateX(${margin}px)`}}>
                    {properties?.items.map((item) => (
                        <RouletteItem key={item.id} item={{...item, size: sizeItems, margin: marginItem}}/>
                    ))}
                </div>
                <div className={classes.bg} style={{height: sizeItems*1.3}}/>
                <div className={classes.overlay}/>
            </div>
        </div>
    );
};

export default Roulette;