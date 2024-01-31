import React from 'react'
import { Controller } from 'react-hook-form';
import { ConnectForm } from '../../../context/ConnectForm';
import { getFormErrorMessage } from "../../../utils/helper"
import { FormErrorMessage } from '../FormErrorMessage';
import { Toast } from '../../toast';

export default function ImageUpload({ name, type = "file", designClass, disabled,
    multiple, handleFileUpload, isEdit }) {
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
                                        type={type}
                                        accept=".jpg, .jpeg, .png"
                                        id={name}
                                        value={handleFileUpload}
                                        disabled={disabled}
                                        className="hidden"
                                        multiple={multiple}
                                        onClick={() => type === "text" ? Toast({ type: "error", message: "Only 3 images allowed" }) : ""}
                                        onChange={isEdit ? handleFileUpload : (e) => {
                                            field.onChange(e);
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
