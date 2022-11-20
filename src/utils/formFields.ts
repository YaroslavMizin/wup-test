export interface formFields {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
}

export const newTaskFields: formFields[] = [
    {name: 'заголовок', type: 'text', placeholder: 'название', required: true},
    {name: 'описание', type: 'textarea', placeholder: 'подробности', required: true},
    {name: 'дата завершения', type: 'date', placeholder: 'выполнить до', required: true},
    {name: 'файлы', type: 'file', placeholder: 'файлы', required: false},
]