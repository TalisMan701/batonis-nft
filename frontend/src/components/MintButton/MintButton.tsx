import React, {FC} from 'react';
import {userSlice} from '../../store/reducers/UserReducer/UserSlice';
import Button from '../UiKit/Button/Button';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {useMatchMedia} from '../../hooks/useMatchMedia';
import {changeChainId, connectWallet} from '../../api/web3';

const MintButton: FC = () => {
    const {currentAccount, isRightChainId} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const {isMobile} = useMatchMedia();
    const clickHandler = async () => {
        if (!currentAccount) {
            const address = await connectWallet();
            if(!address) return
            await dispatch(userSlice.actions.setCurrentAccount(address))
        }

        // Wrong chain
        if (!isRightChainId) {
            const changedChainId = await changeChainId()
            if(!changedChainId) return
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