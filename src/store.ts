import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface FormDataState {
  formData: Record<string, unknown>;
  setFormData: (data: Record<string, unknown>) => void;
  resetFormData: () => void;
}

const persistOptions: PersistOptions<FormDataState> = {
  name: 'form-data-storage',
};

export const useStore = create<FormDataState>()(
  persist(
    (set) => ({
      formData: {},
      setFormData: (formData) => set({ formData }),
      resetFormData: () => set({ formData: {} }),
    }),
    persistOptions,
  ),
);
