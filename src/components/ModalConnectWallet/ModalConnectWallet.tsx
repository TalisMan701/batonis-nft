import React, {FC} from 'react';
import Button from '../UiKit/Button/Button';
import {ReactComponent as MetamaskSVG} from '../../assets/icons/metamask.svg';
import Modal from '../UiKit/Modal/Modal';
import {useToast} from '../UiKit/Toast';

interface IModalConnectWalletProps {
    isOpen: boolean,
    handleClose: () => void
}

const ModalConnectWallet: FC<IModalConnectWalletProps> = ({isOpen, handleClose}) => {
    const toast = useToast();
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <Button icon={<MetamaskSVG/>} label={'Connect Metamask'} iconDirection={'left'} color={'secondary'} onClick={()=>toast.show('Hi world i from Russia')}/>
        </Modal>
    );
};

export default ModalConnectWallet;