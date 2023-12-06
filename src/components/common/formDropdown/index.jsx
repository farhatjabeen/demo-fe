
import React from 'react';

import { Controller } from 'react-hook-form';

import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function DropDown({ placeholder, name, editButton, selection, dropdownValues, disable, optionButtonClass, showPassword, setShowPassword }) {

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
                                    <div>
                                        <button
                                            onClick={() => setSelect(!select)}
                                            disabled={!editButton}
                                            className={optionButtonClass}>
                                            {options || "Options"}
                                            {select ? <RxChevronUp className='h-6 w-6' /> : <RxChevronDown className='h-6 w-6' />}
                                        </button>
                                    </div>

                                    <div className={`absolute right-0 z-10 mt-2 w-full h-28 overflow-y-scroll rounded-md bg-white shadow-lg border border-solid border-[#B6B6B6] ${selection && select ? '' : 'hidden'} `}>
                                        <div className="py-1">
                                            {dropdownValues?.map((items, i) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        className="px-4 py-2 flex w-full text-sm hover:bg-green"
                                                        onClick={() => handleValues(i)}
                                                    >
                                                        {items}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
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

export default DropDown;
