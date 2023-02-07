import React, {FC, useEffect} from 'react';
import classes from './ModalMint.module.scss';
import Modal from '../Modal/Modal';

interface IModalMintProps {
    isOpen: boolean,
    handleClose: () => void
}

const ModalMint: FC<IModalMintProps> = ({isOpen, handleClose}) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div>Тут будет рулетка</div>
        </Modal>
    );
};

export default React.memo(ModalMint, (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen);