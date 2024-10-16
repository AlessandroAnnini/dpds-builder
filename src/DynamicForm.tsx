import React, { useState } from 'react';
import Form from '@rjsf/fluent-ui';
import { useStore } from './store';
import validator from '@rjsf/validator-ajv8';
import { Button } from '@/components/ui/button';
import {
  FieldTemplate,
  TitleFieldTemplate,
  DescriptionFieldTemplate,
  FieldErrorTemplate,
  ErrorListTemplate,
  BaseInputTemplate,
} from '@/components/templates';
import { SubmitButton } from '@/components/SubmitButton';
import { toast } from 'sonner';

interface DynamicFormProps {
  schema: any;
}

const templates = {
  FieldTemplate,
  TitleFieldTemplate,
  DescriptionFieldTemplate,
  FieldErrorTemplate,
  ErrorListTemplate,
  BaseInputTemplate,
  ButtonTemplates: { SubmitButton },
};

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const formData = useStore((state) => state.formData);
  const setFormData = useStore((state) => state.setFormData);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setFormData(e.formData);
    const dataStr = JSON.stringify(e.formData, null, 2);

    // copy to clipboard
    navigator.clipboard.writeText(dataStr).then(
      () => {
        toast.success('Data copied to clipboard');
      },
      (err) => {
        toast.error('Failed to copy data to clipboard');
      },
    );
  };

  const onSubmit = ({ formData }: any) => {
    console.log('Data submitted: ', formData);
    setDidSubmit(true);
  };

  const handleReset = () => setFormData({});

  return (
    <>
      <Form
        schema={schema}
        formData={formData}
        onChange={handleChange}
        templates={templates}
        validator={validator}
        onSubmit={onSubmit}
        liveValidate={didSubmit}
        noHtml5Validate
      />
      <Button variant="destructive" onClick={handleReset}>
        Reset
      </Button>
    </>
  );
};
