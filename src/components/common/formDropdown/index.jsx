
import React, { useState } from 'react';

import { Controller } from 'react-hook-form';
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function FormDropdown({ name, editButton, selection, dropdownValues, optionButtonClass }) {
    const [options, setOptions] = useState('');
    const handleValues = (index) => {
        setOptions(dropdownValues[index]);
    }

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
                                            value={options}
                                            id={name}
                                            disabled={!editButton}
                                            className={optionButtonClass}
                                            onChange={(e) => setOptions(e.target.value)}
                                        >

                                            {dropdownValues?.map((items, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={`${items}`}
                                                        className="px-4 py-2 flex w-full text-sm hover:bg-green"
                                                        onClick={() => handleValues(i)}
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
