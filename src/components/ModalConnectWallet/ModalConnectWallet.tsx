import React, {FC, useEffect} from 'react';
import Button from '../UiKit/Button/Button';
import {ReactComponent as MetamaskSVG} from '../../assets/icons/metamask.svg';
import Modal from '../Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {_connectWallet} from '../../store/reducers/UserReducer/UserActionCreators';

interface IModalConnectWalletProps {
    isOpen: boolean,
    handleClose: () => void
}

const ModalConnectWallet: FC<IModalConnectWalletProps> = ({isOpen, handleClose}) => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(user.currentAccount){
            handleClose()
        }
    },[user.currentAccount])
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <Button icon={<MetamaskSVG/>} label={'Connect Metamask'} iconDirection={'left'} color={'secondary'} onClick={()=>dispatch(_connectWallet())}/>
        </Modal>
    );
};

export default React.memo(ModalConnectWallet, (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen);