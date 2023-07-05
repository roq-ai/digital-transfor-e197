import * as yup from 'yup';

export const alternativeValidationSchema = yup.object().shape({
  text: yup.string().required(),
  question_id: yup.string().nullable().required(),
});
