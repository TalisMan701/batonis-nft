import React, {FC, useEffect} from 'react';
import classes from './ModalMint.module.scss';
import Modal from '../Modal/Modal';
import Roulette from '../Roulette/Roulette';

interface IModalMintProps {
    isOpen: boolean;
    handleClose: () => void;
}

const ModalMint: FC<IModalMintProps> = ({isOpen, handleClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            styleModalContent={{padding: 0, backgroundColor: 'transparent', borderRadius: 0}}
        >
            <Roulette />
        </Modal>
    );
};

export default React.memo(
    ModalMint,
    (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen,
);
