
import React from 'react';

import { Controller } from 'react-hook-form';

import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function TextInput({ type = 'text', placeholder, name, className: inputClassName, showPassword, setShowPassword }) {

    return (
        <ConnectForm>
            {({ errors, control, watch }) => (
                <div>
                    <from>
                        <Controller
                            name={name}
                            control={control}
                            render={({
                                field: { onChange, value: fieldValue, ref, props }
                            }) => (
                                <div className={type === 'password' && 'relative'}>
                                    <input
                                        {...props}
                                        ref={ref}
                                        type={showPassword ? 'text' : type}
                                        onChange={onChange}
                                        value={fieldValue || ''}
                                        placeholder={placeholder}
                                        id={name}
                                        className={inputClassName}
                                    />
                                    {type === 'password' && <div className='absolute top-7 left-3/4 ml-16' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <BsFillEyeSlashFill className='h-6 w-6' /> : <BsFillEyeFill className='h-6 w-6' />}
                                    </div>}
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

export default TextInput;
