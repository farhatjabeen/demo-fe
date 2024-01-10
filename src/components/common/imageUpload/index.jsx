import React from 'react'
import { Controller } from 'react-hook-form';
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';

export default function ImageUpload({ name, designClass, multiple, handleFileUpload, isEdit, fileInputRef }) {
    return (
        <ConnectForm>
            {({ errors, control }) => (
                <div>
                    <form>
                        <Controller
                            name={name}
                            control={control}
                            render={({
                                field
                            }) => (
                                <div>
                                    <label
                                        htmlFor={name}
                                        className={designClass}
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        {...field}
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        id={name}
                                        value={handleFileUpload}
                                        className="hidden"
                                        multiple={multiple}
                                        onChange={isEdit ? handleFileUpload : (e) => {
                                            field.onChange(e);
                                            // If you need to perform additional actions on file upload, call handleFileUpload here
                                            if (handleFileUpload) {
                                                handleFileUpload(e);
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <FormErrorMessage
                            error={getFormErrorMessage(errors, name)}
                        />
                    </form>
                </div>
            )}
        </ConnectForm>
    )
}
