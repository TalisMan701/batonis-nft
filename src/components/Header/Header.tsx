import React, {useState} from 'react';
import classes from './Header.module.scss'
import Socials from '../Socials/Socials';
import Button from '../UiKit/Button/Button';
import Link from '../UiKit/Link/Link';
import Logo from '../Logo/Logo';
import ModalConnectWallet from '../ModalConnectWallet/ModalConnectWallet';

const Header = () => {
    const [connectWalletModalIsOpen, setConnectWalletModalIsOpen] = useState(false)
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
                        <Button label={'MInt NFt'} onClick={()=>setConnectWalletModalIsOpen(true)}/>
                    </div>
                </div>
            </header>
            <ModalConnectWallet isOpen={connectWalletModalIsOpen} handleClose={()=>setConnectWalletModalIsOpen(false)}/>
        </>
    );
};

export default Header;