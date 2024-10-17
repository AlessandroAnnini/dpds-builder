import { useState } from 'react';
import { SchemaLoader } from './SchemaLoader';
import { DynamicForm } from './DynamicForm';
import { Button } from '@/components/ui/button';

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
        Explore & Edit Edition
      </h2>
      <div className="mb-4">
        <Button variant="outline" onClick={handleUseDataProductSchemaBtn}>
          Data Product Descriptor Specs
        </Button>
      </div>
      <span className="text-lg font-bold">or</span>{' '}
      <SchemaLoader onSchemaLoaded={setSchema} />
      {schema && (
        <div className="mt-4">
          <DynamicForm schema={schema} />
        </div>
      )}
    </div>
  );
}

export default App;
