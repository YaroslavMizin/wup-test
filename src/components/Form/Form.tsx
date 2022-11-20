import React, { FC, ReactNode } from 'react';
import { formFields } from '../../utils/formFields';
import Button from '../Button/Button';

interface FormProps {
    onSubmit: (event: React.SyntheticEvent) => void;
    onChange: (type: string, payload: any) => void;
    fields?: formFields[];
    type: string;
    children?: ReactNode;
}

const Form: FC<FormProps> = ({ fields, children, type, onChange, onSubmit }) => {
    return (
        <form className='form' onSubmit={onSubmit}>
            {fields && fields.map(field =>
                <div className='form__control' key={field.name}>
                    <label className='form__label'>{field.name}</label>
                    <input
                        className='form__input'
                        onChange={(e) => onChange(field.name, e.currentTarget.value)}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required} />
                </div>
            ) || children}
            <Button onClick={() => { }} type='submit'>{type}</Button>
        </form>
    );
};

export default Form;