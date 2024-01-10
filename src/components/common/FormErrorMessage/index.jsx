/**
 * FormErrorMessage: Common Re-usable Component to show the error messages.
 * @return {JSX.Element} The JSX Code for FormErrorMessage
 */
import PropTypes from 'prop-types';

export const FormErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <span className="text-danger text-red fs-14 fw-500">
      {error.message ? error.message : ''}
    </span>
  );
};

FormErrorMessage.propTypes = {
  error: PropTypes.oneOf([
    { message: PropTypes.string },
    null
  ])
};
FormErrorMessage.defaultProps = {
  error: [{ message: '' }]
};
