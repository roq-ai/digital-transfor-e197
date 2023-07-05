import * as yup from 'yup';

export const domainValidationSchema = yup.object().shape({
  name: yup.string().required(),
  dimension_id: yup.string().nullable().required(),
});
