import { IRarity } from "../interfaces/IRarity";
import { INFTData } from "../interfaces/INftData";
import lodash from 'lodash';
import { items } from "../data/img";

type Chances = {[key: string]: number};

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

export default (chances: Chances) => {
    const rolledRarity = chancedRandom(chances);
    const rolledItems = items.filter(({rarity}) => rarity === rolledRarity);
    return lodash.sample(rolledItems) as INFTData;
};
