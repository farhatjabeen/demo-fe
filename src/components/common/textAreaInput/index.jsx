
import React from 'react';

import { Controller } from 'react-hook-form';

import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function TextAreaInput({ placeholder, name, disable, className: inputClassName, showPassword, setShowPassword }) {

    return (
        <ConnectForm>
            {({ errors, control }) => (
                <div>
                    <from>
                        <Controller
                            name={name}
                            control={control}
                            render={({
                                field: { onChange, value: fieldValue, ref, props }
                            }) => (
                                <div>
                                    <textarea
                                        {...props}
                                        ref={ref}
                                        onChange={onChange}
                                        value={fieldValue || ''}
                                        placeholder={placeholder}
                                        id={name}
                                        className={inputClassName}
                                        disabled={disable}
                                    />
                                </div>
                            )}
                        />
                        <FormErrorMessage
                            error={getFormErrorMessage(errors, name)}
                        />
                    </from>
                </div>
            )}
        </ConnectForm>
    );
}

export default TextAreaInput;
