import { useState } from 'react';
import { SchemaLoader } from './SchemaLoader';
import { DynamicForm } from './DynamicForm';
import { Button } from '@/components/ui/button';
import { version } from '../package.json';

function App() {
  const [schema, setSchema] = useState<any>();

  const handleUseDataProductSchemaBtn = async () => {
    const res = await fetch('/schema.json');
    const data = await res.json();
    setSchema(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">
        Dynamic JSON Schema Form Editor
      </h1>
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-orange-600">
          Data Product Descriptor Specification{' '}
        </span>
        - Explore & Edit Edition
      </h2>
      <div className="flex flex-row items-center space-x-4 pb-2">
        <div>
          <Button variant="outline" onClick={handleUseDataProductSchemaBtn}>
            Data Product Descriptor Specs
          </Button>
        </div>
        <span className="text-lg font-bold">or</span>{' '}
        <SchemaLoader onSchemaLoaded={setSchema} />
      </div>
      {schema && (
        <div className="mt-4">
          <DynamicForm schema={schema} />
        </div>
      )}
      <div className="fixed bottom-4 right-4 text-sm text-gray-400">
        v{version}
      </div>
    </div>
  );
}

export default App;
