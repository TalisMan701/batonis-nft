import React, {useEffect, useState} from 'react';
import classes from './Header.module.scss'
import Socials from '../Socials/Socials';
import Button from '../UiKit/Button/Button';
import Link from '../UiKit/Link/Link';
import Logo from '../Logo/Logo';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {_connectWallet, _disconnectWallet} from '../../store/reducers/UserReducer/UserActionCreators';

const Header = () => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const [hoverState, setHoverState] = useState(false)

    let buttonText = 'Connect wallet';

    if(user.currentAccount){
        buttonText = hoverState ? 'Disconnect' : user.currentAccount.slice(0, 5) + '...' + user.currentAccount.slice(-5);
    }

    return (
        <>
            <header className={classes.header}>
                <div className={classes.container}>
                    <Logo label={'Batonis'}/>
                    <nav className={classes.links}>
                        <Link href={'#collection'} mode={'secondary'}>Collection</Link>
                        <Link href={'#story'} mode={'secondary'}>Story</Link>
                        <Link href={'#projects'} mode={'secondary'}>Projects</Link>
                    </nav>
                    <div className={classes.forUser}>
                        <Socials/>
                        <Button
                            style={{width: 240}}
                            label={buttonText}
                            onClick={()=>user.currentAccount ? dispatch(_disconnectWallet()) : dispatch(_connectWallet())}
                            onMouseEnter={(e)=>setHoverState(true)}
                            onMouseLeave={(e)=>setHoverState(false)}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default React.memo(Header);