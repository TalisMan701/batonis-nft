import React, {FC} from 'react';
import classes from './InfinityText.module.scss';
import Marquee from 'react-fast-marquee';

interface InfinityTextProps{
    children: React.ReactNode;
}

const InfinityText: FC<InfinityTextProps> = ({children}) => {
    return (
        <div className={classes.wrapper}>
            <Marquee className={classes.line} gradient={false}>
                {children}
            </Marquee>
        </div>
    );
};

export default InfinityText;