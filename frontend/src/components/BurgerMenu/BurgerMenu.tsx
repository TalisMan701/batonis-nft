import React from 'react';
import classes from './BurgerMenu.module.scss';
import Link from '../UiKit/Link/Link';
import Socials from '../Socials/Socials';

const BurgerMenu = () => {
    return (
        <div className={classes.wrapper}>
            <nav className={classes.links}>
                <Link href={'#collection'} mode={'secondary'}>
                    Collection
                </Link>
                <Link href={'#story'} mode={'secondary'}>
                    Story
                </Link>
                <Link href={'#projects'} mode={'secondary'}>
                    Projects
                </Link>
            </nav>
            <Socials />
        </div>
    );
};

export default BurgerMenu;
