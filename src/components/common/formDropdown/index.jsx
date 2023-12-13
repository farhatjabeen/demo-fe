
import React, { useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
// import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function FormDropdown({ name, editButton, dropdownValues, optionButtonClass, value, handleData }) {

    const [options, setOptions] = useState('');
    console.log(options, 'options')

    useEffect(() => {
        handleData(options);
    }, [options, handleData]);

    return (
        <ConnectForm>
            {({ errors, control }) => (
                <div>
                    <from>
                        <Controller
                            name={name}
                            control={control}
                            render={() => (
                                <div>
                                    <div>
                                        <select
                                            id={name}
                                            defaultValue=""
                                            disabled={!editButton}
                                            className={optionButtonClass}
                                            onChange={(e)=>{setOptions(e.target.value)}}
                                        >

                                            {dropdownValues?.map((items, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={`${items}`}
                                                        className="px-4 py-2 flex w-full text-sm hover:bg-green"
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
