import { useState } from 'react';
import useCountries from '../../store/countries';
import {
  Checkbox,
  ImageInput,
  Input,
  Radio,
  Select,
  SubmitButton,
} from '../shared';

import styles from './FormUncontrolled.module.css';
import { formSchema } from '../../utils/schema';
import useFormUncontrolledStore from '../../store/formUncontrolled';
import { FormFields } from '../../types/form.types';

interface FormProps {
  onSubmit: () => void;
}

export default function FormUncontrolled({ onSubmit }: FormProps) {
  const { countries } = useCountries();
  const updateFormData = useFormUncontrolledStore(
    (selector) => selector.updateForm
  );

  const formData = useFormUncontrolledStore((selector) => selector.form);

  const [errors, setErrors] = useState<
    { [K in keyof FormFields]?: string } | null
  >(null);

  const [imageBase64, setImageBase64] = useState(formData?.imageBase64);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newFormData = new FormData(e.currentTarget);

    const data = {
      name: newFormData.get('name'),
      age: Number(newFormData.get('age')),
      email: newFormData.get('email'),
      password: newFormData.get('password'),
      confirmPassword: newFormData.get('confirmPassword'),
      gender: newFormData.get('gender'),
      terms: newFormData.get('terms') ? true : false,
      image: newFormData.get('image'),
      country: newFormData.get('country'),
      imageBase64,
    };

    const validateResult = formSchema.safeParse(data);

    if (!validateResult.success) {
      console.log(validateResult.error.issues);
      const fieldErrors: { [K in keyof FormFields]?: string } = {};

      validateResult.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof FormFields;
        fieldErrors[fieldName] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }
    setErrors(null);

    updateFormData(data as FormFields);
    onSubmit();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Form Uncontrolled</h2>

      <Input
        label="Enter you name"
        type="text"
        name="name"
        error={errors?.name}
        value={formData?.name}
      />

      <Input
        label="Enter you age"
        type="number"
        name="age"
        min={1}
        error={errors?.age}
        value={formData?.age}
      />
      <Input
        label="Enter you email"
        type="email"
        name="email"
        error={errors?.email}
        value={formData?.email}
      />
      <Input
        label="Enter password"
        type="password"
        name="password"
        error={errors?.password}
        value={formData?.password}
      />
      <Input
        label="Confirm password"
        type="password"
        name="confirmPassword"
        error={errors?.confirmPassword}
        value={formData?.confirmPassword}
      />

      <Radio
        label="Choose your gender"
        name="gender"
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
        error={errors?.gender}
      />

      <Checkbox
        name="terms"
        label="Terms and Conditions agreement"
        error={errors?.terms}
      />

      <ImageInput
        label="Upload your picture"
        error={errors?.image}
        name="image"
        initialValue={imageBase64}
        onFileSelect={(file, base64) => {
          setImageBase64(base64);
        }}
      />

      <Select
        label="Select your country"
        name="country"
        options={countries}
        error={errors?.country}
        value={formData?.country}
      />
      <SubmitButton />
    </form>
  );
}
