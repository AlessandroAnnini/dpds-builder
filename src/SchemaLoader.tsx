import React, { ChangeEvent } from 'react';
import Ajv, { AnySchema } from 'ajv';

interface SchemaLoaderProps {
  onSchemaLoaded: (schema: AnySchema) => void;
}

export const SchemaLoader: React.FC<SchemaLoaderProps> = ({
  onSchemaLoaded,
}) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const rawSchema = JSON.parse(content);

      const ajv = new Ajv({
        allErrors: true,
        strict: false,
        loadSchema: loadSchema,
      });

      // Compile the schema asynchronously to resolve $ref
      const validate = ajv.compile(rawSchema);

      // Access the resolved schema
      onSchemaLoaded(validate.schema);
    } catch (error) {
      console.error('Error parsing schema:', error);
    }
  };

  const loadSchema = async (uri: string) => {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Unable to load schema from ${uri}`);
    }
    return response.json();
  };

  return <input type="file" accept=".json" onChange={handleFileChange} />;
};
