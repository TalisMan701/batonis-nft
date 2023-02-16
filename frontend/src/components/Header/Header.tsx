import React, {useEffect, useRef, useState} from 'react';
import classes from './Header.module.scss'
import Socials from '../Socials/Socials';
import Button from '../UiKit/Button/Button';
import Link from '../UiKit/Link/Link';
import Logo from '../Logo/Logo';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {_connectWallet, _disconnectWallet} from '../../store/reducers/UserReducer/UserActionCreators';
import {useMatchMedia} from '../../hooks/useMatchMedia';
import {ReactComponent as CloseSVG} from '../../assets/icons/close.svg';
import {ReactComponent as BurgerSVG} from '../../assets/icons/burger.svg';
import {useOnClickOutside} from 'usehooks-ts';
import {CSSTransition} from 'react-transition-group';

const Header = () => {
    const {isMobile, isTablet, isDesktop} = useMatchMedia();
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const [hoverState, setHoverState] = useState(false)

    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    const refDropdownMenu = useRef<HTMLDivElement>(null)
    const nodeRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = () => {
        console.log('Clock outside')
        setShowDropdownMenu(false)
    }

    useOnClickOutside(refDropdownMenu, handleClickOutside)

    let buttonText = 'Connect wallet';

    if(user.currentAccount){
        buttonText = hoverState ? 'Disconnect' : user.currentAccount.slice(0, 5) + '...' + user.currentAccount.slice(-5);
    }

    if(isMobile || isTablet){
        return (
            <header className={classes.header}>
                <div className={classes.container}>
                    <Logo label={'Batonis'}/>
                    <div ref={refDropdownMenu}  className={classes.dropdownMenuWrapper}>
                        <Button onClick={()=>setShowDropdownMenu(prev => !prev)} icon={showDropdownMenu ? <CloseSVG/> :<BurgerSVG/>} iconDirection={'left'} color={'secondary'}/>
                        <CSSTransition
                            in={showDropdownMenu}
                            timeout={{ exit: 300 }}
                            unmountOnExit
                            classNames={{
                                enterDone: classes.dropdownMenuEnterDone,
                                exitActive: classes.dropdownMenuExit,
                            }}
                            nodeRef={nodeRef}
                        >
                            <div ref={nodeRef} className={classes.dropdownMenu}>
                                <nav className={classes.links}>
                                    <Link href={'#collection'} mode={'secondary'}>Collection</Link>
                                    <Link href={'#story'} mode={'secondary'}>Story</Link>
                                    <Link href={'#projects'} mode={'secondary'}>Projects</Link>
                                </nav>
                                <Socials/>
                                <Button
                                    style={{width: '100%', marginTop: 24}}
                                    label={buttonText}
                                    onClick={()=>user.currentAccount ? dispatch(_disconnectWallet()) : dispatch(_connectWallet())}
                                    onMouseEnter={(e)=>setHoverState(true)}
                                    onMouseLeave={(e)=>setHoverState(false)}
                                />
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </header>
        )
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