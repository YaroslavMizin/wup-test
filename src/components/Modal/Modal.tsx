import React, { FC, ReactNode } from 'react';
import Loader from '../Loader/Loader';

interface ModalProps {
    loading?: boolean;
    children: ReactNode;
    visible: boolean;
    title: string;
    setVisible: () => void;
}

/**
 * @setVisible - коллбэк для закрытия окна
 * @param visible - пропс видимости
 * @returns - Модальное окно для добавления и редактирования
 */
const Modal: FC<ModalProps> = ({ loading, children, title, visible, setVisible }) => {

    /** класс видимости */
    const rootClass = ['modal'];

    if(visible) {
        rootClass.push('modal_active');
    }
    if(loading) return <Loader/>
    return (
        <div onClick={setVisible} className={rootClass.join(' ')}>
            <div onClick={e => e.stopPropagation()} className='modal__content'>
                <p className='modal__title'>{title}</p>
                {children}
            </div>
        </div>
    );
};

export default Modal;