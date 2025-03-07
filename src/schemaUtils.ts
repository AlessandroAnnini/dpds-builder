/**
 * Recursively processes a schema object to transform oneOf properties
 * Specifically targets oneOf arrays with exactly 2 items where at least one is a $ref
 * and replaces the entire oneOf with the first $ref
 */
export const processSchema = (schema: unknown): unknown => {
  // Handle non-objects
  if (!schema || typeof schema !== 'object') {
    return schema;
  }

  // Handle arrays
  if (Array.isArray(schema)) {
    return schema.map((item) => processSchema(item));
  }

  // Now we know it's an object
  const schemaObj = schema as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  // Special handling for oneOf case
  if (
    'oneOf' in schemaObj &&
    Array.isArray(schemaObj.oneOf) &&
    schemaObj.oneOf.length === 2
  ) {
    const oneOfArray = schemaObj.oneOf;
    const hasRef0 =
      typeof oneOfArray[0] === 'object' &&
      oneOfArray[0] !== null &&
      '$ref' in oneOfArray[0];

    const hasRef1 =
      typeof oneOfArray[1] === 'object' &&
      oneOfArray[1] !== null &&
      '$ref' in oneOfArray[1];

    // if refs are exactly two
    if (hasRef0 && hasRef1) {
      // Choose the ref that is NOT "#/$defs/reference"
      const refItem =
        oneOfArray[0].$ref === '#/$defs/reference'
          ? oneOfArray[1]
          : oneOfArray[0];

      return { $ref: refItem.$ref };
    }
  }

  // Process each property in the schema object
  for (const [key, value] of Object.entries(schemaObj)) {
    if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      result[key] = processSchema(value);
    } else {
      // Keep primitives unchanged
      result[key] = value;
    }
  }

  return result;
};

// Test function for debugging
export const testSchemaProcessor = () => {
  const testSchema = {
    type: 'object',
    properties: {
      inputPortOrReference: {
        oneOf: [
          {
            $ref: '#/$defs/reference',
          },
          {
            $ref: '#/$defs/inputPort',
          },
        ],
      },
      nested: {
        type: 'object',
        properties: {
          anotherOneOf: {
            oneOf: [
              {
                $ref: '#/$defs/nestedRef',
              },
              {
                type: 'string',
              },
            ],
          },
        },
      },
      array: {
        type: 'array',
        items: {
          oneOf: [
            {
              $ref: '#/$defs/arrayItem',
            },
            {
              type: 'number',
            },
          ],
        },
      },
    },
  };

  const processed = processSchema(testSchema);
  console.log('Test schema processed:', processed);
  return processed;
};
