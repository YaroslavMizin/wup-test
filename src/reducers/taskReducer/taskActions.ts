interface actions {
    type: string;
}

interface setTitle extends actions {
    payload: any;
}

interface setDetais extends actions {
    payload: any;
}

interface setDate extends actions {
    payload: any;
}

interface setFile extends actions {
    payload: any;
}

export type taskActions = setTitle | setDate | setDetais | setFile;

export enum newTaskActions {
    title = 'заголовок',
    details = 'описание',
    date = 'дата завершения',
    files = 'файлы',
}