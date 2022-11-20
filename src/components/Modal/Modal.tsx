import React, { FC, ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
    visible: boolean;
    title: string;
    setVisible: () => void;
}

const Modal: FC<ModalProps> = ({ children, title, visible, setVisible }) => {

    const rootClass = ['modal'];

    if(visible) {
        rootClass.push('modal_active');
    }

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