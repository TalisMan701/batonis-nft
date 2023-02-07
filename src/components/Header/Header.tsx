import React, {useState} from 'react';
import classes from './Header.module.scss'
import Socials from '../Socials/Socials';
import Button from '../UiKit/Button/Button';
import Link from '../UiKit/Link/Link';
import Logo from '../Logo/Logo';
import {useUser} from '../../contexts/User/useUser';

const Header = () => {
    const user = useUser();
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
                        <Link href={'#'} mode={'secondary'}>Collection</Link>
                        <Link href={'#'} mode={'secondary'}>Story</Link>
                        <Link href={'#'} mode={'secondary'}>Projects</Link>
                    </nav>
                    <div className={classes.forUser}>
                        <Socials/>
                        <Button
                            style={{width: 240}}
                            label={buttonText}
                            onClick={()=>user.currentAccount ? user.disconnectWallet() : user.connectWallet()}
                            onMouseEnter={(e)=>setHoverState(true)}
                            onMouseLeave={(e)=>setHoverState(false)}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;