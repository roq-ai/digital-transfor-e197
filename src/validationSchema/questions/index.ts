import * as yup from 'yup';

export const questionValidationSchema = yup.object().shape({
  text: yup.string().required(),
  domain_id: yup.string().nullable().required(),
});
