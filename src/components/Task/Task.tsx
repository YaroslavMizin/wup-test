import React, { FC } from 'react';
import { task } from '../../types/task';
import Button from '../Button/Button';

interface TaskProps {
    task: task;
    remove: () => void;
    edit: () => void;
}

const Task: FC<TaskProps> = ({ task, edit, remove }) => {

    const rootClass = ['task'];
    
    if (task.outdated) {
        rootClass.push('task_outdated')
    }

    if (task.fulfilled) {
        rootClass.push('task_fulfilled')
    }

    return (
        <div className={rootClass.join(' ')}>
            <div>
                <p className='task__title'>{task.title}</p>
                <p className='task__details'>Дедлайн: {task.date}</p>
                <p className='task__details'>Создано: {task.createdAt}</p>
            </div>
            <div className='task__buttons'>
                <Button small onClick={edit}>подробно</Button>
                <Button small danger onClick={remove}>удалить</Button>
            </div>
        </div>
    );
};

export default Task;