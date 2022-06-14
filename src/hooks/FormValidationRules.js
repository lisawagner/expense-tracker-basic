export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.amount) {
    errors.amount = 'Amount is required';
  }
  return errors;
}