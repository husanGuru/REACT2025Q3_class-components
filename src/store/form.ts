import { create } from 'zustand';
import { FormFields } from '../types/form.types';

export interface FormStore {
  form: FormFields | null;
  updateForm: (updatedForm: FormFields) => void;
  isNew: boolean;
}

const useFormStore = create<FormStore>((set) => ({
  form: null,
  isNew: false,
  updateForm: (updatedForm: FormFields) => {
    set({ form: updatedForm, isNew: true });

    setTimeout(() => {
      set({ isNew: false });
    }, 1000);
  },
}));

export default useFormStore;
