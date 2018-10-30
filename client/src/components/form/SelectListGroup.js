import React from 'react';
import classnames from 'classnames';
import { FormGroup, Label, Input, FormText } from 'reactstrap';

const SelectListGroup = ({
    name,
    value,
    label,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type="select"
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}>
                {selectOptions}
            </Input>
            {info && <FormText className="text-muted">{info}</FormText>}
            {error && <FormText className="invalid-feedback" color='#dc3545'>{error}</FormText>}
        </FormGroup>
    )
};

export default SelectListGroup;
