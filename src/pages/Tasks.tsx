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
import { newTaskFields } from '../utils/formFields';
import dayjs from 'dayjs';

/** единственная страница приложения */
const Tasks = () => {
    /** БД и сторэдж из контекста*/
    const { db, storage } = useContext(Context);
    /** верхний стейт задачи*/
    const [task, setNewTask] = useState({} as task);
    /** файл отдельно для функции загрузки*/
    const [file, setFile] = useState<File>({} as File);
    /** локальный стейт модального окна новой задачи */
    const [modal, setModal] = useState(false);
    /** переключение модалки */
    const changeModal = () => {
        modal ? setModal(false) : setModal(true);
    }
    /** коллекция задач */
    const [tasks, loading] = useCollectionData(query(collection(db, 'tasks'), orderBy('createdAt')));

    /**
     * добавление задачи/файла в стейт,
     * @param1 action ключ инпута для определения действия - время в формат, файл в отельный стейт
     * @param2 payload - значение инпута или файлы инпута
     *  */
    const setTask = (action: any, payload: any) => {
        if (action === 'files') {
            setFile(payload[0]);
        } else if (action === 'date') {
            setNewTask({ ...task, [action]: dayjs(payload).valueOf() })
        } else {
            setNewTask({ ...task, [action]: payload });
        }
    }

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
                setNewTask({} as task);
                /** закрытие модалки */
                changeModal();
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
            });
        /** копируем ID в поле задачи из наименования документа */
        await updateDoc(doc(db, 'tasks', newTask.id), {
            id: newTask.id
        })
        /** добавление файла в сторэдж (функция выше) */
        addFile(newTask.id);
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
            <Button onClick={changeModal}>Добавить задачу</Button>
            <Tasklist>
                {loading ? <Loader /> : tasks && tasks.map(task =>
                    <Task
                        onSubmit={updateTask}
                        onChange={setTask}
                        key={task.title}
                        task={task as task} />)}
            </Tasklist>
            <Modal visible={modal} setVisible={changeModal} title='создание'>
                <Form onSubmit={addTask} fields={newTaskFields} onChange={setTask} type='новая задача' />
            </Modal>
        </main>
    );
};

export default Tasks;