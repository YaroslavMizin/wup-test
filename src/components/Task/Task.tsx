import React, { FC, useContext, useState } from 'react';
import { task } from '../../types/task';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import FormControl from '../FormControl/FormControl';
import { Context } from '../../App';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { returnField, returnName, returnType, returnValue } from '../../utils/formFields'
import dayjs from 'dayjs';
import CheckMark from '../CheckMark/CheckMark';

interface TaskProps {
    task: task;
    onChange: (action: any, payload: any) => void | Promise<void>;
    onSubmit: (id: string) => void | Promise<void>;
}
/**
* @param1 пропсы туду
* @param2 onChange
* @param3 onSubmit - для формы внутри
* @returns - сам компонент задачи, к нему модальное окно с формой для редактирования,
т.к. данные документа получаются отсюда по id
*/
const Task: FC<TaskProps> = ({ task, onChange, onSubmit }) => {

    /** БД из контекста */
    const { db } = useContext(Context);

    /** локальный стейт модалки */
    const [modal, setModal] = useState(false);

    /** дата задачи с БД по ID из пропсов */
    const [document, loading] = useDocumentData(doc(db, 'tasks', `${task.id}`));;

    /** коллбэк изменения полей задачи, сама функция внутри, сверху */
    const updateTask = async () => {
        await onSubmit(task.id);
        setModal(false);
    }

    /** коллбэк удаления*/
    const deleteTask = async () => {
        await deleteDoc(doc(db, 'tasks', `${task.id}`));
    }

    /** переключение флажка выполнения отдельно, потому что вне модалки*/
    const completeTask = async (value: boolean) => {
        await updateDoc(doc(db, 'tasks', `${task.id}`), { fulfilled: value ? false : true });
    }

    const rootClass = ['task'];
    const outdated = dayjs(document?.date).valueOf() - Date.now() < 0;

    if (outdated) {
        rootClass.push('task_outdated')
    }

    if (task.fulfilled) {
        rootClass.push('task_fulfilled')
    }

    /** массив ключей и значений для рендеринга массива children из компонентов*/
    const fields = document && Object.entries(document).sort((a, b) => b[0].localeCompare(a[0]));

    return (
        <div className={rootClass.join(' ')}>
            <div>
                <p className='task__title'>{task.title}</p>
                <p className='task__details'>Создано: {task.createdAt}</p>
                <p className='task__details'>Дедлайн: {dayjs(task.date).format('DD.MM.YYYY')}</p>
            </div>
            <div className='task__buttons'>
                <CheckMark fulfilled={document?.fulfilled} onClick={() => completeTask(document?.fulfilled)} />
                <Button small onClick={() => setModal(true)}>подробно</Button>
                <Button small danger onClick={deleteTask}>удалить</Button>
            </div>
            <Modal loading={loading} visible={modal} setVisible={() => setModal(false)} title='редактирование'>
                <Form onSubmit={updateTask} onChange={() => { }} type='изменить'>
                    {fields?.map(field =>
                        returnField(field[0]) &&
                        <FormControl
                            key={field[0]}
                            action={field[0]}
                            name={returnName(field[0])}
                            required={false}
                            type={returnType(field[0])}
                            defaultValue={returnValue(field[0], field[1])}
                            onChange={onChange} />
                    )}
                    {task.files &&
                        <div className='form__control'>
                            <label className='control__label'>Файлы</label>
                            {task.files.map(file =>
                                <a key={file.file} href={file.file} download>{file.filename}</a>)}
                        </div>}
                </Form>
            </Modal>
        </div>
    );
};

export default Task;