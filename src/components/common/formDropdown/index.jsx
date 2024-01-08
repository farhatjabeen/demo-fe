
import React, { useEffect, useState } from 'react';
import './index.css';
import { Controller } from 'react-hook-form';
// import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

function FormDropdown({ name, editButton, dropdownValues, firstOptionName, isBusinesSignUp=false, isSearchReport=false, valueFromDb, optionButtonClass}) {

    return (
        <ConnectForm>
            {({ errors, control }) => (
                <div>
                    <from>
                        <Controller

                            name={name}
                            control={control}
                            defaultValue={valueFromDb}
                            render={({
                                field: { onChange, value: fieldValue, ref, props }
                            }) => (
                                <div>
                                    <div>
                                        <select
                                            {...props}
                                            ref={ref}
                                            id={name}
                                            disabled={!editButton}
                                            className={`${optionButtonClass} ${isSearchReport ? "custom-arrow": isBusinesSignUp ? "custom-arrow-for-business" : "custom-arrow-for-companyProfile"}`}
                                            onChange={onChange}
                                        >

                                            <option value="" >{
                                                getFormErrorMessage(errors, name)&&isSearchReport ?
                                                    <div className="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6 text-red-600 md:text-sm sm:text-xs mt-1">
                                                        <FormErrorMessage error={getFormErrorMessage(errors, name)} />
                                                    </div>
                                                    :
                                                    `${firstOptionName}`
                                            }</option>
                                            {dropdownValues?.map((items, i) => {
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

export default FormDropdown;
