
import React from 'react';

import { Controller } from 'react-hook-form';

import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function TextInput({ type = 'text', placeholder, name, disable, isSearchReport=false, eyeClass, className: inputClassName, showPassword, setShowPassword }) {

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
                                <div className={` flex ${type === 'password' && 'relative'}`}>
                                    <div className="relative w-full">
                                    <input
                                        {...props}
                                        ref={ref}
                                        type={showPassword ? 'text' : type}
                                        onChange={onChange}
                                        value={fieldValue || ''}
                                        placeholder={getFormErrorMessage(errors, name) ? " " : placeholder}
                                        id={name}
                                        className={inputClassName}
                                        disabled={disable}

                                    />
                                    {type === 'password' && <div className={eyeClass} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <BsFillEyeFill className='h-6 w-6' /> : <BsFillEyeSlashFill className='h-6 w-6' />}
                                    </div>}
                                    {
                                        isSearchReport && (
                                            <div className="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1">
                                              <FormErrorMessage error={getFormErrorMessage(errors, name)} />
                                            </div>
                                          )
                                    }
                                    </div>
                                </div>
                            )}
                        />
                        {
                            isSearchReport ?
                                ""
                                :
                                <FormErrorMessage
                                    error={getFormErrorMessage(errors, name)}
                                />
                        }

                    </from>
                </div>
            )}
        </ConnectForm>
    );
}

export default TextInput;
