import z from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: z
      .number({ error: 'Enter number' })
      .min(1, { error: 'Enter positive value' }),
    email: z.email(),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),

    confirmPassword: z.string(),

    gender: z.string({ error: 'Choose one of the options' }),
    terms: z.literal(true, {
      error: 'You must accept the terms',
    }),
    image: z
      .custom<File>((file) => file instanceof File, {
        message: 'Upload the image',
      })
      .refine(
        (file) => file && ['image/jpeg', 'image/png'].includes(file.type),
        { message: 'Only PNG and JPEG images are allowed' }
      )
      .refine((file) => file && file.size <= 2 * 1024 * 1024, {
        message: 'File must be smaller than 2MB',
      }),
    imageBase64: z.string(),
    country: z.string().min(1, { message: 'Choose the country' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
    when(payload) {
      return formSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });
