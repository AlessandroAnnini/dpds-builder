import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { JsonViewer } from '@/components/JsonViewer';
import { useCallback } from 'react';

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  const { title, description, properties, schema, formData, idSchema } = props;

  // Check if this is a simple object field that should be displayed as JSON
  const isSimpleObjectField =
    schema.type === 'object' &&
    schema.title === 'object' &&
    schema.description === 'An inline JSON Object';

  // Handle changes to the JSON content
  const handleJsonChange = useCallback(
    (newData: Record<string, unknown> | unknown[] | null) => {
      if (newData !== null) {
        // Use DOM events to update the form data
        // This is a workaround since we can't directly access the onChange handler
        const formElement = document.getElementById('dynamic-form');
        if (formElement) {
          // Create a custom change event
          const event = new CustomEvent('json-editor-change', {
            detail: {
              id: idSchema?.$id,
              value: newData,
            },
          });
          // Dispatch the event on the form
          formElement.dispatchEvent(event);
        }
      }
    },
    [idSchema],
  );

  // If it's a simple object field, display it with the CodeMirror JSON viewer
  if (isSimpleObjectField && formData) {
    return (
      <div className="object-field-template">
        <div className="object-field-title mb-2">
          {title && <h5>{title}</h5>}
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>
        <JsonViewer
          value={formData}
          readOnly={false}
          height="auto"
          onChange={handleJsonChange}
        />
      </div>
    );
  }

  // Otherwise, render the standard object field
  return (
    <div className="object-field-template">
      {title && <h5>{title}</h5>}
      {description && <p className="text-gray-600 text-sm">{description}</p>}
      <div className="object-properties">
        {properties.map((prop) => prop.content)}
      </div>
    </div>
  );
}

export { ObjectFieldTemplate };
