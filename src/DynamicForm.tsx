import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
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
  ObjectFieldTemplate,
} from '@/components/templates';
import { SubmitButton } from '@/components/SubmitButton';
import { toast } from 'sonner';
import { IChangeEvent } from '@rjsf/core';
import { RJSFSchema, UiSchema } from '@rjsf/utils';

interface DynamicFormProps {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  formData?: Record<string, unknown>;
}

// Type for the custom event
interface JsonEditorChangeDetail {
  id: string;
  value: Record<string, unknown> | unknown[];
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  uiSchema = {},
  formData: initialFormData,
}) => {
  // Create memoized templates to prevent unnecessary re-renders
  const templates = useMemo(
    () => ({
      FieldTemplate,
      TitleFieldTemplate,
      DescriptionFieldTemplate,
      FieldErrorTemplate,
      ErrorListTemplate,
      BaseInputTemplate,
      ObjectFieldTemplate,
      ButtonTemplates: { SubmitButton },
    }),
    [],
  );

  // Use any for the form ref to avoid type errors with the Form component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);
  const formData = useStore((state) => state.formData);
  const setFormData = useStore((state) => state.setFormData);
  const [shouldValidate, setShouldValidate] = useState<boolean>(true);

  // Initialize form data from props if provided
  useEffect(() => {
    if (initialFormData && Object.keys(initialFormData).length > 0) {
      setFormData(initialFormData);
      // Give a short delay before validating to ensure form has updated
      setTimeout(() => {
        setShouldValidate(true);
      }, 100);
    }
  }, [initialFormData, setFormData]);

  // Listen for custom JSON editor changes
  useEffect(() => {
    const handleJsonEditorChange = (event: Event) => {
      const customEvent = event as CustomEvent<JsonEditorChangeDetail>;
      if (customEvent.detail) {
        const { id, value } = customEvent.detail;

        // Use the existing form data and update only the changed field
        // This is a simple implementation that works for top-level fields
        // For nested fields, you would need more logic to update the right path
        const updatedFormData = { ...formData };

        // Extract the field name from the ID (usually in format "root_fieldName")
        const fieldName = id?.split('_').pop();

        if (fieldName) {
          updatedFormData[fieldName] = value;
          setFormData(updatedFormData);
        }
      }
    };

    // Add event listener
    const formElement = document.getElementById('dynamic-form');
    if (formElement) {
      formElement.addEventListener(
        'json-editor-change',
        handleJsonEditorChange,
      );
    }

    // Clean up event listener
    return () => {
      if (formElement) {
        formElement.removeEventListener(
          'json-editor-change',
          handleJsonEditorChange,
        );
      }
    };
  }, [formData, setFormData]);

  // Implement a debounced change handler for performance
  const handleChange = useCallback(
    (e: IChangeEvent) => {
      if (e && e.formData) {
        // Use a microtask to defer state update for better performance
        Promise.resolve().then(() => {
          setFormData(e.formData);
        });
      }
    },
    [setFormData],
  );

  // Submit handler with improved performance
  const onSubmit = useCallback(
    (e: IChangeEvent) => {
      if (e && e.formData) {
        try {
          console.log('Data submitted: ', e.formData);
          const dataStr = JSON.stringify(e.formData, null, 2);

          navigator.clipboard.writeText(dataStr).then(
            () => toast.success('Data copied to clipboard'),
            () => toast.error('Failed to copy data to clipboard'),
          );

          // Enable validation only after form submission
          setShouldValidate(true);
        } catch (error) {
          console.error('Submission error:', error);
          toast.error('Error processing form data');
        }
      } else {
        toast.error('No form data available');
      }
    },
    [setShouldValidate],
  );

  // Reset handler
  const handleReset = useCallback(() => {
    setShouldValidate(false);
    setFormData({});
    if (formRef.current && typeof formRef.current.reset === 'function') {
      formRef.current.reset();
    }
  }, [setFormData]);

  // Enhanced uiSchema with performance optimizations
  const enhancedUiSchema = useMemo(
    () => ({
      ...uiSchema,
      'ui:submitButtonOptions': {
        submitText: 'Copy to clipboard',
        props: {
          id: 'submit-button-id',
          className: 'text-white bg-blue-800',
        },
      },
      'ui:options': {
        ...uiSchema['ui:options'],
        disableReadOnly: true,
        validate: true,
        label: false, // Disable labels for better performance
        submitButtonOptions: {
          norender: false,
          submitText: 'Copy to clipboard',
        },
      },
    }),
    [uiSchema],
  );

  return (
    <>
      <Form
        ref={formRef}
        schema={schema}
        uiSchema={enhancedUiSchema}
        formData={formData}
        onChange={handleChange}
        templates={templates}
        validator={validator}
        onSubmit={onSubmit}
        liveValidate={shouldValidate}
        noHtml5Validate
        id="dynamic-form"
        focusOnFirstError={true}
        disabled={false}
        readonly={false}
        omitExtraData={false}
      />
      <Button
        variant="destructive"
        onClick={handleReset}
        id="reset-button"
        type="button"
      >
        Reset
      </Button>
    </>
  );
};
