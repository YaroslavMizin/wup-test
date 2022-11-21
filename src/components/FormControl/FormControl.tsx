import React, { FC, ReactNode } from 'react';

interface FormControlProps {
    name: string;
    type: string;
    placeholder?: string;
    disabled?: boolean;
    required: boolean;
    onChange: (action: string, payload: any) => void;
    value?: string | number;
    defaultValue?: string | number;
    action: string;
    children?: ReactNode;
    multiple?: boolean;
}

/**
 * @param name - для лэйбла
 * @param action - для создания ключа в стейте выше
 * @param type - для определения типа элемента/инпута 
 * @returns textarea / input / select
 */
const FormControl: FC<FormControlProps> = ({
    name,
    type,
    action,
    placeholder,
    required,
    value,
    defaultValue,
    disabled,
    multiple,
    onChange
}) => {
    return (
        <div className='form__control' key={name}>
            <label className='control__label'>{name}</label>
            {type === 'textarea' ?
                <textarea
                    defaultValue={value? undefined : defaultValue}
                    value={defaultValue? undefined : value}
                    className='control__input control__input_textarea'
                    onChange={(e) => onChange(action, e.currentTarget.value)}
                    placeholder={placeholder}
                    required={required} />
                :
                <input
                    disabled={disabled}
                    defaultValue={value? undefined : defaultValue}
                    value={defaultValue? undefined : value}
                    className='control__input'
                    onChange={(e) => onChange(action, type === 'file'?
                    e.currentTarget.files : e.currentTarget.value)}
                    type={type}
                    multiple={multiple}
                    name={name}
                    placeholder={placeholder}
                    required={required} />}
        </div>
    );
};

export default FormControl;