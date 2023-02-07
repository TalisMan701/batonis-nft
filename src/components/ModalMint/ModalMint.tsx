import React, {FC, useEffect} from 'react';
import classes from './ModalMint.module.scss';
import Modal from '../UiKit/Modal/Modal';
import {useUser} from '../../contexts/User/useUser';

interface IModalMintProps {
    isOpen: boolean,
    handleClose: () => void
}

const ModalMint: FC<IModalMintProps> = ({isOpen, handleClose}) => {
    const user = useUser();
    useEffect(()=>{
        console.log('Mint')
    })
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div>Тут будет рулетка</div>
        </Modal>
    );
};

export default React.memo(ModalMint);