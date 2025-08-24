import styles from './Form.module.css';
import {
  Checkbox,
  ImageInput,
  Input,
  Radio,
  Select,
  SubmitButton,
} from '../shared';
import { SubmitHandler, useForm } from 'react-hook-form';

import { formSchema } from '../../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useCountries from '../../store/countries';
import { FormFields } from '../../types/form.types';
import useFormStore from '../../store/form';
import { isEmptyObject } from '../../utils/isEmptyObject';

interface FormProps {
  onSubmit: () => void;
}

export default function Form({ onSubmit }: FormProps) {
  const countries = useCountries((selecotor) => selecotor.countries);
  const updateForm = useFormStore((selector) => selector.updateForm);
  const formData = useFormStore((selector) => selector.form);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormFields>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    values: formData ?? undefined,
  });

  const saveFormData: SubmitHandler<FormFields> = (data) => {
    updateForm(data);
    onSubmit();
  };

  console.log(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(saveFormData)}>
      <h2>Form controlled</h2>

      <Input
        label="Enter you name"
        type="text"
        autoComplete={'on'}
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Enter you age"
        type="number"
        min={1}
        error={errors.age?.message}
        {...register('age', { valueAsNumber: true })}
      />
      <Input
        label="Enter you email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Enter password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Confirm password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Radio
        label="Choose your gender"
        options={[
          {
            value: 'male',
            name: 'male',
          },
          {
            value: 'female',
            name: 'female',
          },
        ]}
        error={errors.gender?.message}
        {...register('gender')}
      />

      <Checkbox
        label="Terms and Conditions agreement"
        error={errors.terms?.message}
        {...register('terms', { setValueAs: (v) => (v ? true : false) })}
      />

      <ImageInput
        label="Upload your picture"
        error={errors.image?.message}
        initialValue={getValues('imageBase64')}
        name="image"
        onFileSelect={(file, base64) => {
          setValue('image', file, { shouldValidate: true });

          setValue('imageBase64', base64, { shouldValidate: true });
        }}
      />

      <Select
        label="Select your country"
        options={countries}
        error={errors.country?.message}
        {...register('country')}
      />
      <SubmitButton disabled={!isEmptyObject(errors)} />
    </form>
  );
}
