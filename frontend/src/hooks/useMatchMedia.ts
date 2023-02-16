import {useState, useLayoutEffect} from 'react';

const queries = [
    '(max-width: 450px)',
    '(min-width: 451px) and (max-width: 1024px)',
    '(min-width: 1025px) and (max-width: 1440px)',
    '(min-width: 1441px)'
];

export const useMatchMedia = () => {
    const mediaQueryLists = queries.map((query) => matchMedia(query));

    const getValues = () => mediaQueryLists.map((mql) => mql.matches);

    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () => setValues(getValues);
        mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));
        return () => mediaQueryLists.forEach((mql) => mql.removeEventListener('change', handler));
    });

    return ['isMobile', 'isTablet', 'isDesktop', 'isDesktopXL'].reduce(
        (acc, screen, index) => ({...acc, [screen]: values[index]}),
        {},
    ) as {isMobile: boolean; isTablet: boolean; isDesktop: boolean, isDesktopXL: boolean};
};
