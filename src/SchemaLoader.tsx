import React, { ChangeEvent } from 'react';
import Ajv2020, { AnySchema } from 'ajv/dist/2020';

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

      // Use Ajv2020 with strict mode disabled
      const ajv = new Ajv2020({
        strict: false,
        allowUnionTypes: true,
      });

      // Validate the schema
      const isValid = ajv.validateSchema(rawSchema);
      if (!isValid) {
        console.warn('Schema validation warnings:', ajv.errors);
      }

      // Access the resolved schema
      onSchemaLoaded(rawSchema);
    } catch (error) {
      console.error('Error parsing schema:', error);
    }
  };

  return <input type="file" accept=".json" onChange={handleFileChange} />;
};
