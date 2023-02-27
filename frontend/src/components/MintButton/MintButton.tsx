import React, {FC} from 'react';
import {userSlice} from '../../store/reducers/UserReducer/UserSlice';
import Button from '../UiKit/Button/Button';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {useMatchMedia} from '../../hooks/useMatchMedia';
import {changeChainId, connectWallet, worknet} from '../../api/web3';
import {toastsSlice} from '../../store/reducers/ToastsReducer/ToastsSlice';

const MintButton: FC = () => {
    const {currentAccount, isRightChainId} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const {isMobile} = useMatchMedia();
    const clickHandler = async () => {
        if (!currentAccount) {
            const address = await connectWallet();
            if(!address) {
                dispatch(toastsSlice.actions.show('Connect wallet'))
                return
            }
            await dispatch(userSlice.actions.setCurrentAccount(address))
        }

        // Wrong chain
        if (!isRightChainId) {
            const changedChainId = await changeChainId()
            console.log(changedChainId)
            if(!changedChainId) {
                dispatch(toastsSlice.actions.show(
                    <span>
                    You are not on the {worknet.chainName} network.
                    Please <Button size={'s'} label={'Switch Network'} onClick={changeChainId}/>
                </span>
                ))
                return
            }
            await dispatch(userSlice.actions.setIsRightChainId(changedChainId));
        }

        dispatch(userSlice.actions.setGoRoulette(true))
    }
    return (
        <Button
            label={'Mint NFT'}
            size={isMobile? 'm' :'l'}
            onClick={clickHandler}
            style={{width: isMobile ? '100%' : 'auto'}}
        />
    );
};

export default MintButton;