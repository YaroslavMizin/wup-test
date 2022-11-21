import React, { FC, ReactNode } from 'react';

interface ButtonProps {
    onClick: () => (void | Promise<void>);
    children: ReactNode;
    small?: boolean;
    danger?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

const Button: FC<ButtonProps> = ({ onClick, children, small, danger, type }) => {

    /**
     * подстановка классов по пропсам
     */
    const rootClass: string[] = ['btn'];
    if (small) {
        rootClass.push(`btn_small`);
    }
    if (danger) {
        rootClass.push('btn_danger')
    }

    return (
        <button type={type} className={rootClass.join(' ')} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;