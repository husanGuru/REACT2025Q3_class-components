import z from 'zod';
import { formSchema } from '../utils/schema';

export type FormFields = z.infer<typeof formSchema>;
