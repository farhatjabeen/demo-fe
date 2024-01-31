import React from 'react'
import './index.css'
import { Controller } from 'react-hook-form'
import { ConnectForm } from '../../../context/ConnectForm'
import { getFormErrorMessage } from '../../../utils/helper'
import { FormErrorMessage } from '../FormErrorMessage'

function FormDropdown({
  name,
  editButton,
  iscleared,
  dropdownValues,
  firstOptionName,
  isBusinesSignUp = false,
  isSearchReport = false,
  valueFromDb,
  optionButtonClass,
}) {
  return (
    <ConnectForm>
      {({ errors, control }) => (
        <div>
          <from>
            <Controller
              name={name}
              control={control}
              defaultValue={valueFromDb}
              render={({ field: { onChange, value: fieldValue, ref, props } }) => (
                <div>
                  <div>
                    <select
                      {...props}
                      ref={ref}
                      id={name}
                      disabled={!editButton}
                      className={`${optionButtonClass} 
                                            ${isSearchReport ? 'custom-arrow' : isBusinesSignUp ? 'custom-arrow-for-business' : 'custom-arrow-for-companyProfile'} 
                                            ${getFormErrorMessage(errors, name) && isSearchReport ? 'text-red' : ''}`}
                      onChange={onChange}
                    >
                      <option
                        value=""
                        selected={iscleared}
                        className="w-full mx-4 my-2 text-black text-sm"
                      >
                        {getFormErrorMessage(errors, name) && isSearchReport ? (
                          <div className="absolute xl:bottom-7 md:bottom-4 sm:bottom-3 left-6  md:text-sm sm:text-xs mt-1">
                            <FormErrorMessage error={getFormErrorMessage(errors, name)} />
                          </div>
                        ) : (
                          `${firstOptionName}`
                        )}
                      </option>
                      {dropdownValues?.map((items, i) => {
                        return (
                          <option
                            key={i}
                            value={items}
                            selected={items === valueFromDb ? true : false}
                            className="px-4 py-2 text-black flex w-full text-sm "
                          >
                            {items}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              )}
            />
            {isSearchReport ? '' : <FormErrorMessage error={getFormErrorMessage(errors, name)} />}
          </from>
        </div>
      )}
    </ConnectForm>
  )
}

export default FormDropdown
