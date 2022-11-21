import React, { FC } from 'react';

interface CheckMarkProps {
    fulfilled: boolean;
    onClick: () => void | Promise<void>
}

/**
 * кнопка флажка выполнения
 */
const CheckMark: FC<CheckMarkProps> = ({ fulfilled, onClick }) => {

    /**
     * подстановка классов по пропсам
     */
    const rootClass = ['checkmark']
    if (fulfilled) {
        rootClass.push('checkmark_fulfilled')
    }

    return (
        <div className={rootClass.join(' ')} onClick={() => onClick()}/>
    );
};

export default CheckMark;

