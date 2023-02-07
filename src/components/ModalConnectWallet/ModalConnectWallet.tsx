import React, {FC, useEffect} from 'react';
import Button from '../UiKit/Button/Button';
import {ReactComponent as MetamaskSVG} from '../../assets/icons/metamask.svg';
import Modal from '../UiKit/Modal/Modal';
import {useToast} from '../UiKit/Toast';
import {useUser} from '../../contexts/User/useUser';

interface IModalConnectWalletProps {
    isOpen: boolean,
    handleClose: () => void
}

const ModalConnectWallet: FC<IModalConnectWalletProps> = ({isOpen, handleClose}) => {
    const user = useUser();
    useEffect(()=>{
        if(user.currentAccount){
            handleClose()
        }
    },[user.currentAccount])
    useEffect(()=>{
        console.log('Connect')
    })
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <Button icon={<MetamaskSVG/>} label={'Connect Metamask'} iconDirection={'left'} color={'secondary'} onClick={user.connectWallet}/>
        </Modal>
    );
};

export default React.memo(ModalConnectWallet, (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen);