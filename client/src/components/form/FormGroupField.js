import React from 'react';
import classnames from 'classnames';
import { FormGroup, Label, Input, FormText } from 'reactstrap';

const FormGroupField = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <FormText className="text-muted">{info}</FormText>}
            {error && <FormText className="invalid-feedback" color='#dc3545'>{error}</FormText>}
        </FormGroup>
    )
};

export default FormGroupField;



