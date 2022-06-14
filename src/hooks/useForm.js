import { useState, useEffect } from 'react'

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  // const handleSubmit = (event) => {
  //   if (event) event.preventDefault();
  //   setErrors(validate(values));
  //   setIsSubmitting(true);
  // };

  const handleChange = (event) => {
    const { value } = event.target

    if (value < 0) {
      setValues(values => ({ ...values, [value.amount]: value.value * -1 }) )
    }
    // if (value == 0) {
    //   setAmount('')
    // }
    // setValues(values => ({ ...values, [event.target.amount]: event.target.value }));
  };

  return {
    handleChange,
    // handleSubmit,
    values,
    errors,
  }
}

export default useForm