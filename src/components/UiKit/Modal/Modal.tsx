import React, {FC, useEffect, useRef} from 'react';
import classes from './Modal.module.scss';
import ReactPortal from '../../ReactPortal/ReactPortal';
import { CSSTransition } from 'react-transition-group';
import ButtonCloseModal from '../ButtonCloseModal/ButtonCloseModal';

interface IModal {
    isOpen: boolean
    handleClose: () => void
    children: React.ReactNode
}

const Modal: FC<IModal> = ({isOpen, handleClose, children}) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(isOpen){
            document.body.style.overflow = 'hidden'
        } else{
            document.body.style.overflow = 'hidden auto'
        }
    },[isOpen])

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [handleClose]);

    // if(!isOpen) return null;

    return (
        <ReactPortal wrapperId={'react-portal-modal-container'}>
            <CSSTransition
                in={isOpen}
                timeout={{ exit: 300 }}
                unmountOnExit
                classNames={{
                    enterDone: classes.modalEnterDone,
                    exitActive: classes.modalExit,
                }}
                nodeRef={nodeRef}
            >
                <div ref={nodeRef} className={classes.modal}>
                    <div className={classes.modalContent}>
                        <ButtonCloseModal onClick={handleClose} style={{position: 'absolute', top: -40, right: -40}}/>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </ReactPortal>
    );
};

export default Modal;