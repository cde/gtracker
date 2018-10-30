import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import classnames from 'classnames';

const InputIconGroup = ({
        name,
        placeholder,
        value,
        error,
        icon,
        type,
        onChange
    }) => {
    return (

        <InputGroup className="m-md-1">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <i className={icon}></i>
                </InputGroupText>
            </InputGroupAddon>
            <Input
                className={classnames('form-control form-control-md', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange} />
            {error && <div className="invalid-feedback">{error}</div>}
        </InputGroup>

    );
};

export default InputIconGroup;
