
import React, { useState } from 'react';

import { Controller } from 'react-hook-form';
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function FormDropdown({ name, editButton, dropdownValues, optionButtonClass,value, onCategoryChange,options }) {

    // const testOptions = [
    //     { label: "test", value: 1 }
    // ]
    // const [options, setOptions] = useState('');
    // console.log(options, 'options')
    // const handleValues = (index) => {
    //     setOptions(dropdownValues[index]);
    // }

    return (
        <ConnectForm>
            {({ errors, control }) => (
                <div>
                    <from>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field: { onChange, value: fieldValue, ref, props } }) => (
                                <div>
                                    <div>
                                        <select
                                            {...props}
                                            ref={ref}
                                            value={value}
                                            id={name}
                                            // value={fieldValue || ''}
                                            disabled={!editButton}
                                            className={optionButtonClass}
                                            onChange={(e) => {
                                                let body = {
                                                  target: {
                                                    name: e.target.name,
                                                    value: e.target.value, 
                                                  },
                                                };
                                                onCategoryChange(body);
                                              }}
                                        >

                                            {dropdownValues?.map((items, i) => {
                                                return (

                                                    <option
                                                        {...props}
                                                        ref={ref}
                                                        // key={i}
                                                        value={`${items[i]}`}
                                                        className="px-4 py-2 flex w-full text-sm hover:bg-green"
                                                    // onClick={(e) => onCategoryChange(e.target.value)}
                                                    >
                                                        {items}
                                                    </option>
                                                );
                                            })}
                                        </select>
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

export default FormDropdown;
