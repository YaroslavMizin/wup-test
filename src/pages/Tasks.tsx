import React, { useContext, useState } from 'react';
import { collection, doc, addDoc, updateDoc, arrayUnion, query, orderBy } from 'firebase/firestore';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../App';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import Form from '../components/Form/Form';
import Tasklist from '../components/Tasklist/Tasklist';
import Loader from '../components/Loader/Loader';
import Task from '../components/Task/Task';
import { task } from '../types/task';
import dayjs from 'dayjs';
import { useForm } from '../hooks/useForm';

/** единственная страница приложения */
const Tasks = () => {
    /** БД и сторэдж из контекста*/
    const { db, storage } = useContext(Context);
    /** кастомный хук управления состоянием */
    const [taskFields, task, file, setTask, clearTask, clearFile] = useForm();
    /** локальный стейт модального окна новой задачи */
    const [modal, setModal] = useState(false);
    /** коллекция задач */
    const [tasks, loading] = useCollectionData(query(collection(db, 'tasks'), orderBy('createdAt')));

    /** добавления файла в сторэдж по ID задачи, проверка на наличие файла здесь */
    const addFile = async (id: string) => {
        if (file.name) {
            try {
                /** загрузка файла по ID */
                await uploadBytesResumable(ref(storage, `${id}/${file.name}`), file);
                /** получение url файла из сторэдж */
                const url = await getDownloadURL(ref(storage, `${id}//${file.name}`));
                /** добавление массива имён и ссылок файлов в поле туду */
                await updateDoc(doc(db, 'tasks', id), {
                    files: arrayUnion({
                        file: url,
                        filename: file.name,
                    })
                });
                /** очистка стейта */
                clearFile();
                /** закрытие модалки */
                setModal(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** добавление задачи в коллекцию */ 
    const addTask = async () => {
        /** объект туду из стейта, дата добавления и статус по умолчанию присваются тут*/
        const newTask = await addDoc(collection(db, 'tasks'),
            {
                ...task,
                createdAt: dayjs(Date.now()).format('DD.MM.YYYY HH:mm'),
                fulfilled: false,
                files: [],
            });
        /** копируем ID в поле задачи из наименования документа */
        await updateDoc(doc(db, 'tasks', newTask.id), {
            id: newTask.id
        })
        /** добавление файла в сторэдж (функция выше) */
        addFile(newTask.id);
        clearTask();
        setModal(false);
    }

    /** обавление задачи в БД */
    const updateTask = async (id: string) => {
        await addFile(id)
        await updateDoc(doc(db, 'tasks', id), task as {});
    }

    return (
        <main className='tasks'>
            <h1 className='tasks__header'>
                Задачи
            </h1>
            <Button onClick={() => setModal(true)}>Добавить задачу</Button>
            <Tasklist>
                {loading ? <Loader /> : tasks && tasks.map(task =>
                    <Task
                        onSubmit={updateTask}
                        onChange={setTask}
                        key={task.title}
                        task={task as task} />)}
            </Tasklist>
            <Modal visible={modal} setVisible={() => setModal(false)} title='создание'>
                <Form onSubmit={addTask} fields={taskFields} onChange={setTask} type='новая задача' />
            </Modal>
        </main>
    );
};

export default Tasks;