import { formFields } from "../utils/formFields"
import {useState} from 'react';
import { task } from "../types/task";

export const useForm = (): [formFields[], task, File, (action: any, payload: any) => void, () => void, () => void] => {
    const [task, setTask] = useState({} as task);
    const [file, setFile] = useState<File>({} as File);

    const taskFields: formFields[] = [
        { name: 'заголовок', type: 'text', placeholder: 'название', required: true, action: 'title', value: task.title },
        { name: 'описание', type: 'textarea', placeholder: 'подробности', required: true, action: 'details', value: task.details },
        { name: 'дата завершения', type: 'date', placeholder: 'выполнить до', required: true, action: 'date', value: task.date },
        { name: 'файлы', type: 'file', placeholder: 'файлы', required: false, action: 'files' },
    ]
    const onChange = (action: any, payload: any) => {
          if (action === 'files') {
            setFile(payload[0]);
        } else if (action === 'date') {
            setTask({ ...task, [action]: payload })
        } else {
            setTask({ ...task, [action]: payload });
        }
    }

    const clearTask = () => {
        setTask({} as task);
    }

    const clearFile = () => {
        setFile({} as File);
    }
    
    return [taskFields, task, file, onChange, clearTask, clearFile];
}