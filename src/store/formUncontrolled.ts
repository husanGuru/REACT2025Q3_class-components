import { create } from 'zustand';
import { FormFields } from '../types/form.types';

export interface FormStore {
  form: FormFields | null;
  isNew: boolean;
  updateForm: (updatedForm: FormFields) => void;
}

const useFormUncontrolledStore = create<FormStore>((set) => ({
  form: null,
  isNew: false,
  updateForm: (updatedForm: FormFields) => {
    set({ form: updatedForm, isNew: true });

    setTimeout(() => {
      set({ isNew: false });
    }, 1000);
  },
}));

export default useFormUncontrolledStore;
