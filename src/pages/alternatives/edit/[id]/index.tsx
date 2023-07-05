import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAlternativeById, updateAlternativeById } from 'apiSdk/alternatives';
import { Error } from 'components/error';
import { alternativeValidationSchema } from 'validationSchema/alternatives';
import { AlternativeInterface } from 'interfaces/alternative';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { QuestionInterface } from 'interfaces/question';
import { getQuestions } from 'apiSdk/questions';

function AlternativeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AlternativeInterface>(
    () => (id ? `/alternatives/${id}` : null),
    () => getAlternativeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AlternativeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAlternativeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/alternatives');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AlternativeInterface>({
    initialValues: data,
    validationSchema: alternativeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Alternative
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="text" mb="4" isInvalid={!!formik.errors?.text}>
              <FormLabel>Text</FormLabel>
              <Input type="text" name="text" value={formik.values?.text} onChange={formik.handleChange} />
              {formik.errors.text && <FormErrorMessage>{formik.errors?.text}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<QuestionInterface>
              formik={formik}
              name={'question_id'}
              label={'Select Question'}
              placeholder={'Select Question'}
              fetcher={getQuestions}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.text}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'alternative',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AlternativeEditPage);
