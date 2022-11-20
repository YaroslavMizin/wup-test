import React, { FC, ReactNode } from 'react';

interface TasklistProps {
    children: ReactNode;
    
}

const Tasklist: FC<TasklistProps> = ({ children }) => {
    return (
        <div className='tasklist'>
            <div className='tasklist__body'>
                {children}
            </div>
        </div>

    );
};

export default Tasklist;