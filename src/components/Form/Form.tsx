import React, { FC, ReactNode } from 'react';
import { formFields } from '../../utils/formFields';
import Button from '../Button/Button';
import FormControl from '../FormControl/FormControl';

interface FormProps {
    onSubmit: () => void;
    onChange: (type: string, payload: any) => void;
    fields?: formFields[];
    type: string;
    children?: ReactNode | ReactNode[];
}
/**
 * Принимает массив полей для рендеринга инпутов
 * @param3 type - текст для кнопки
 * @param4 onChange - передается в инпуты
 * @param5 onSubmit - для сабмита
 */
const Form: FC<FormProps> = ({ fields, children, type, onChange, onSubmit }) => {

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            {fields && fields.map(field =>
                <FormControl
                    key={field.name}
                    onChange={onChange}
                    name={field.name}
                    type={field.type}
                    action={field.action}
                    placeholder={field.placeholder}
                    multiple={field.multiple}
                    required={field.required} />
            ) || children}
            <Button onClick={() => { }} type='submit'>{type}</Button>
        </form>
    );
};

export default Form;