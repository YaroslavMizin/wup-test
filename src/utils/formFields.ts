import dayjs from "dayjs";

/** описание пропсов одного инпута */
export interface formFields {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
    multiple?: boolean;
    action: string;
}

/**массив с полями для рендеринга инпутов внутри формы*/
export const newTaskFields: formFields[] = [
    { name: 'заголовок', type: 'text', placeholder: 'название', required: true, action: 'title' },
    { name: 'описание', type: 'textarea', placeholder: 'подробности', required: true, action: 'details' },
    { name: 'дата завершения', type: 'date', placeholder: 'выполнить до', required: true, action: 'date' },
    { name: 'файлы', type: 'file', placeholder: 'файлы', required: false, action: 'files' },
]

/**
 * Удаление лишних полей из объекта с БД для map (для рендеринга элементов по массиву)
 * @param action для соотнесения ключа объекта
 * @returns логическое значение для исклюения объектов массива
 */
export const returnField = (action: string): boolean => {
    if (action === 'id' || action === 'createdAt' || action === 'fulfilled') return false;
    return true;
}

/**
 * Подстановка типов инпута по полям объекта БД (для рендеринга элементов по массиву)
 * @param action для соотнесения ключа объекта
 * @returns значения специфических типов по ключам для выбора элемента (textarea/input/select)
 */
export const returnType = (action: string): string => {
    switch (action) {
        case 'details': return 'textarea';
        case 'files': return 'file';
        case 'fulfilled': return 'select'
        default: return 'text';
    }
}

/**
 * @param action для соотнесения ключа объекта
 * @return заголовки для инпутов по ключам объекта
 */
export const returnName = (action: string): string => {
    switch (action) {
        case 'title': return 'заголовок'
        case 'details': return 'описание';
        case 'files': return 'добавить файл';
        case 'fulfilled': return 'выполнено';
        case 'date': return 'дедлайн';
        default: return '';
    }
}

/**
* @param action для соотнесения ключа объекта
* @param value по умолчанию возвращает значение, для файлового инпута возвращает undefined, преобразует для даты
*/
export const returnValue = (action: string, value: string): string | undefined => {
    if (action === 'files') return undefined;
    if (action === 'date') return dayjs(value).format('DD.MM.YYYY');
    return value;
}