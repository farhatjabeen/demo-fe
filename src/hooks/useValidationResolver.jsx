import { useCallback } from 'react'

const useValidationResolver = (validationSchema) => {
  return useCallback(
    async (data) => {
      // Ensure that the validationSchema is a function
      if (typeof validationSchema.validate !== 'function') {
        return { errors: {}, values: {} }
      }
      try {
        // Validating the data using the provided validation schema
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })
        return { errors: {}, values }
      } catch (errors) {
        // Formatting the validation errors into an array
        const formattedErrors = Array.isArray(errors.inner) ? errors.inner : [errors]
        return {
          values: {},
          errors: formattedErrors.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )
}

export default useValidationResolver
