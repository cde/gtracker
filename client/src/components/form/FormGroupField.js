import React from 'react';
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
}) =>  {
    return (
        <FormGroup>
            <Label for="exampleEmail">{label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <FormText className="text-muted">{info}</FormText>}
            {error && <FormText className="invalid-feedback">{error}</FormText>}
        </FormGroup>
    )
}

FormGroupField.defaultProps = {
    type: 'text'
};

export default FormGroupField;



