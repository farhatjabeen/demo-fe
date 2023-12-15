import React from 'react'
import { Controller } from 'react-hook-form';
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

export default function ImageUpload({ name, designClass, multiple, handleFileUpload, fileInputRef }) {
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
                                    <label
                                        htmlFor={name}
                                        className={designClass}
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        id={name}
                                        className="hidden"
                                        multiple={multiple}
                                        onChange={handleFileUpload}
                                        ref={fileInputRef}
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
    )
}
