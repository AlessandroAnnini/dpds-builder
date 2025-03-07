import React, { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { Ajv2020 } from 'ajv/dist/2020';
import { RJSFSchema } from '@rjsf/utils';
import { useStore } from './store';

interface DataLoaderProps {
  onDataLoaded: (data: Record<string, unknown>) => void;
  schema?: RJSFSchema;
}

export const DataLoader: React.FC<DataLoaderProps> = ({
  onDataLoaded,
  schema,
}) => {
  // Get the resetFormData function from the store
  const resetFormData = useStore((state) => state.resetFormData);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Reset form data before loading new data
      resetFormData();

      const content = await file.text();
      const data = JSON.parse(content);

      // Check if data is an object (basic validation)
      if (typeof data !== 'object' || data === null) {
        toast.error(
          'The uploaded file does not contain valid JSON object data',
        );
        return;
      }

      // Validate against schema if available
      if (schema) {
        const ajv = new Ajv2020({
          strict: false,
          allErrors: true,
          verbose: true,
          allowUnionTypes: true,
        });

        const validate = ajv.compile(schema);
        const isValid = validate(data);

        if (!isValid) {
          console.warn('Form data validation warnings:', validate.errors);
          toast.warning(
            'The uploaded data may not fully match the schema. Some validation errors might occur.',
          );
        } else {
          toast.success('Form data loaded and validated successfully');
        }
      } else {
        toast.success('Form data loaded successfully');
      }

      onDataLoaded(data);
    } catch (error) {
      console.error('Error parsing form data:', error);
      toast.error('Failed to parse JSON data. Please check the file format.');
    }
  };

  return (
    <input
      type="file"
      accept=".json"
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100"
    />
  );
};
