import { useState, useEffect } from 'react';
import { SchemaLoader } from './SchemaLoader';
import { DataLoader } from './DataLoader';
import { DynamicForm } from './DynamicForm';
import { Button } from '@/components/ui/button';
import { version } from '../package.json';
import { RJSFSchema } from '@rjsf/utils';
import { AnySchema } from 'ajv/dist/2020';
import { toast } from 'sonner';
import { processSchema, testSchemaProcessor } from './schemaUtils';

// Define a uiSchema to customize form appearance and behavior
const defaultUiSchema = {
  // Customize specific fields
  info: {
    contactPoints: {
      items: {
        'ui:options': {
          orderable: false,
        },
      },
    },
  },
  interfaceComponents: {
    inputPorts: {
      items: {
        'ui:options': {
          orderable: false,
        },
      },
    },
    outputPorts: {
      items: {
        'ui:options': {
          orderable: false,
        },
      },
    },
  },
};

function App() {
  const [schema, setSchema] = useState<RJSFSchema>();
  const [formData, setFormData] = useState<Record<string, unknown>>();

  // For debugging - test the schema processor in the browser console
  useEffect(() => {
    // @ts-expect-error - Make the test function available in the console
    window.testSchemaProcessor = testSchemaProcessor;
  }, []);

  const handleSchemaLoaded = (loadedSchema: AnySchema) => {
    console.log('Original schema loaded:', loadedSchema);

    // Process the schema to transform oneOf properties
    const processedSchema = processSchema(loadedSchema);
    console.log('Processed schema:', processedSchema);

    setSchema(processedSchema as RJSFSchema);
    toast.success('Schema loaded and processed successfully');
  };

  const handleUseDataProductSchemaBtn = async () => {
    const res = await fetch('/schema.json');
    const data = await res.json();

    // Process the schema to transform oneOf properties
    const processedSchema = processSchema(data);
    console.log('Processed schema from file:', processedSchema);

    setSchema(processedSchema as RJSFSchema);
    toast.success('Schema loaded and processed successfully');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        <span className="text-orange-600">
          Data Product Descriptor Specification
        </span>
        <span className="text-gray-800"> — Dynamic JSON Schema Editor</span>
      </h1>
      <div className="flex flex-row items-center space-x-4 pb-2">
        <div>
          <Button variant="outline" onClick={handleUseDataProductSchemaBtn}>
            Data Product Descriptor Specs
          </Button>
        </div>
        <span className="text-lg font-bold">or</span>{' '}
        <SchemaLoader onSchemaLoaded={handleSchemaLoaded} />
        {schema && (
          <>
            <span className="text-lg font-bold ml-4">|</span>{' '}
            <span className="text-sm font-medium w-60">Load Form Data:</span>{' '}
            <DataLoader onDataLoaded={setFormData} schema={schema} />
          </>
        )}
      </div>
      {schema && (
        <>
          <div className="mt-4">
            <DynamicForm
              schema={schema}
              uiSchema={defaultUiSchema}
              formData={formData}
            />
          </div>
        </>
      )}
      <div className="fixed bottom-4 right-4 text-sm text-gray-400">
        v{version}
      </div>
    </div>
  );
}

export default App;
