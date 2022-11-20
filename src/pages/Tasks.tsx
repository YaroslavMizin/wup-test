import React, { useReducer, useContext, useState } from 'react';
import { collection, addDoc, serverTimestamp, DocumentData } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../App';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import Form from '../components/Form/Form';
import Tasklist from '../components/Tasklist/Tasklist';
import { newTaskReducer } from '../reducers/taskReducer/taskReducer';
import { newTask } from '../types/task';
import { newTaskFields } from '../utils/formFields';
import Task from '../components/Task/Task';
import dayjs from 'dayjs';

const Tasks = () => {

    const [task, dispatch] = useReducer(newTaskReducer, {} as newTask);
    const { db } = useContext(Context);
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [editTaskModal, setEditTaskModal] = useState(false);
    const [tasks, loading, error] = useCollectionData(collection(db, 'tasks'));

    const setTask = (type: string, payload: any) => {
        dispatch({ type, payload });
    }

    const addTask = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const doc = await addDoc(collection(db, 'tasks'),
                {
                    ...task,
                    createdAt: dayjs(Date.now()).format('DD.MM.YYYY'),
                });
            setNewTaskModal(false);
            console.log('written with ID ' + doc.id);
        } catch (e) {
            console.log(e);
        }
    }

    const setNewModal = () => {
        newTaskModal ? setNewTaskModal(false) : setNewTaskModal(true);
        setEditTaskModal(false);
    }


    const setEditModal = () => {
        editTaskModal ? setEditTaskModal(false) : setEditTaskModal(true);
        setNewTaskModal(false);
    }

    return (
        <main className='tasks'>
            <h1 className='tasks__header'>
                Задачи
            </h1>
            <Button onClick={setNewModal}>Добавить задачу</Button>
            <Tasklist>
                {tasks && tasks.map(task =>
                    <Task
                        edit={setEditModal}
                        remove={() => ({})}
                        key={task.title}
                        task={task as newTask}></Task>)}
            </Tasklist>
            <Modal visible={newTaskModal} setVisible={setNewModal} title='создание'>
                <Form onSubmit={addTask} fields={newTaskFields} onChange={setTask} type='новая задача' />
            </Modal>
            <Modal visible={editTaskModal} setVisible={setEditModal} title='редактирование'>
                <Form onSubmit={() => { }} onChange={setTask} type='изменить'>
                    <input></input>
                    <input></input>
                    <input></input>
                    <input></input>
                </Form>
            </Modal>
        </main>
    );
};

export default Tasks;