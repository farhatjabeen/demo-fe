
import React, { useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
// import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function FormDropdown({ name, editButton, dropdownValues, valueFromDb, optionButtonClass, value, handleData }) {

    const [options, setOptions] = useState('');
    console.log(options, 'options')
   
    useEffect(()=>{
        handleData(options ? options : valueFromDb)
    },[options,valueFromDb])
    return (
        <ConnectForm>
            {({ errors, control }) => (
                <div>
                    <from>
                        <Controller
                            name={name}
                            control={control}
                            defaultValue={valueFromDb}
                            render={() => (
                                <div>
                                    <div>
                                        <select
                                            id={name}
                                            disabled={!editButton}
                                            className={optionButtonClass}
                                            onChange={(e) => setOptions(e.target.value) }
                                        >
                                            <option value="" >Select an option</option>
                                            {dropdownValues?.map((items,i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={items}
                                                        selected={items === valueFromDb ? true : false}
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
