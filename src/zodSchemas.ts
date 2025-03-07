/**
 * Zod schema definitions for Data Product Descriptor Specification (DPDS)
 * These schemas provide runtime validation matching the TypeScript types
 * from types.ts and align with the official JSON schema
 *
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/
 */

import { z } from 'zod';
import type {
  DataProductDescriptor,
  InterfaceComponents,
  Components,
} from './types';

// ===============================================================
// Custom Validators
// ===============================================================

/**
 * UUID format validator
 * Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx where x is a hexadecimal character
 */
const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isValidUuid = (val?: string) => val === undefined || uuidRegex.test(val);

/**
 * Fully Qualified Name format validator
 * For Data Products:
 *   Format: A URN of the form urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version}
 *   Example: "urn:dpds:it.quantyca:dataproducts:tripExecution:1"
 * For Input Ports:
 *   Format: A URN of the form urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version}:inputports:{port-name}
 *   Example: "urn:dpds:it.quantyca:dataproducts:tripExecution:1:inputports:tmsTripCDC"
 * For Output Ports:
 *   Format: A URN of the form urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version}:outputports:{port-name}
 *   Example: "urn:dpds:it.quantyca:dataproducts:tripExecution:1:outputports:tripDetails"
 *
 * Where mesh-namespace is typically a company's domain name in reverse dot notation (e.g., it.quantyca)
 */
const fqnRegex =
  /^urn:dpds:[a-zA-Z0-9][\w\.\-]*:dataproducts:[a-zA-Z0-9][\w\-]*:[0-9]+(:(input|output)ports:[a-zA-Z0-9][\w\-]*)?$/;
const isValidFqn = (val?: string): val is string =>
  val === undefined || fqnRegex.test(val);

/**
 * Alphanumeric format validator
 */
const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const isValidAlphanumeric = (val?: string) =>
  val === undefined || alphanumericRegex.test(val);

/**
 * Domain format validator
 */
const domainRegex = /^[a-zA-Z0-9][\w\.\-]*$/;
const isValidDomain = (val?: string) =>
  val === undefined || domainRegex.test(val);

/**
 * Name camel case validator
 */
const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;
const isValidCamelCase = (val?: string) =>
  val === undefined || camelCaseRegex.test(val);

/**
 * Version format validator
 * Format: semantic versioning format
 */
const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9\.]+)?(\+[a-zA-Z0-9\.]+)?$/;
const isValidVersion = (val?: string) =>
  val === undefined || versionRegex.test(val);

/**
 * URI format validator
 */
const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const isValidUri = (val?: string) => val === undefined || uriRegex.test(val);

/**
 * URI reference format validator
 * Can be a relative path or absolute URI
 */
const uriReferenceRegex =
  /^(\.{0,2}\/[^\s]*|[a-z][a-z0-9+\-.]*:[^\s]*|#[^\s]*)$/i;
const isValidUriReference = (val?: string) =>
  val === undefined || uriReferenceRegex.test(val);

// ===============================================================
// Base Schemas
// ===============================================================

/**
 * Entity schema - base for many components
 * @see types.ts Entity interface
 * @see schema.json $defs.entity
 */
export const entitySchema = z
  .object({
    // readOnly in the schema
    id: z
      .string()
      .optional()
      .refine(isValidUuid, { message: 'id must be a valid UUID format' }),
    fullyQualifiedName: z.string().optional().refine(isValidFqn, {
      message:
        'fullyQualifiedName must be a URN of the form urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version} or urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version}:(input|output)ports:{port-name}',
    }),
    // readOnly in the schema
    entityType: z.string().optional().refine(isValidAlphanumeric, {
      message: 'entityType must contain only alphanumeric characters',
    }),
    name: z.string().refine(isValidCamelCase, {
      message: 'name must be in a valid format (camelCase)',
    }),
    version: z.string().refine(isValidVersion, {
      message: 'version must follow semantic versioning format',
    }),
    displayName: z.string().optional(),
    description: z.string().optional(),
    componentGroup: z.string().optional(),
    tags: z.array(z.string()).optional(),
    externalDocs: z
      .object({
        description: z.string().optional(),
        mediaType: z.string().optional(),
        $href: z
          .string()
          .refine(isValidUri, { message: '$href must be a valid URI' }),
      })
      .optional(),
  })
  .passthrough();

/**
 * Reference schema - for referencing other resources
 * @see types.ts Reference interface
 * @see schema.json $defs.reference
 */
export const referenceSchema = z.object({
  $ref: z.string().refine(isValidUriReference, {
    message: '$ref must be a valid URI reference',
  }),
  mediaType: z.string().optional(),
  description: z.string().optional(),
});

/**
 * External Resource schema
 * @see types.ts ExternalResource interface
 * @see schema.json $defs.externalResource
 */
export const externalResourceSchema = z.object({
  description: z.string().optional(),
  mediaType: z.string().optional(),
  $href: z
    .string()
    .refine(isValidUri, { message: '$href must be a valid URI' }),
});

// ===============================================================
// Common Components
// ===============================================================

/**
 * Owner schema
 * @see types.ts Owner interface
 * @see schema.json $defs.owner
 */
export const ownerSchema = z
  .object({
    id: z.string(), // Required field
    name: z.string().optional(),
  })
  .passthrough();

/**
 * Contact Point schema
 * @see types.ts ContactPoint interface
 * @see schema.json $defs.contactPoint
 */
export const contactPointSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    channel: z.string().optional(),
    address: z.string().optional(),
  })
  .passthrough();

/**
 * Object or string schema (for definitions)
 * @see schema.json $defs.objectOrStringOrReference
 */
export const objectOrStringSchema = z.union([z.record(z.any()), z.string()]);

/**
 * Object or Reference schema
 * @see schema.json $defs.objectOrReference
 */
export const objectOrReferenceSchema = z.union([
  z.record(z.any()),
  referenceSchema,
]);

/**
 * Standard Definition schema
 * @see types.ts StandardDefinition interface
 * @see schema.json $defs.standardDefinition and $defs.definition
 */
export const standardDefinitionSchema = entitySchema.extend({
  specification: z.string(), // Required field
  specificationVersion: z.string().optional(),
  definition: objectOrStringSchema, // Can be object, string per schema
});

// ===============================================================
// Port-Related Schemas
// ===============================================================

/**
 * Promises schema
 * @see types.ts Promises interface
 * @see schema.json $defs.promises
 */
export const promisesSchema = z
  .object({
    platform: z.string().optional(),
    servicesType: z.string().optional(),
    api: standardDefinitionSchema.optional(),
    deprecationPolicy: standardDefinitionSchema.optional(),
    slo: standardDefinitionSchema.optional(),
  })
  .passthrough();

/**
 * Expectations schema
 * @see types.ts Expectations interface
 * @see schema.json $defs.expectations
 */
export const expectationsSchema = z
  .object({
    audience: standardDefinitionSchema.optional(),
    usage: standardDefinitionSchema.optional(),
  })
  .passthrough();

/**
 * Obligations schema
 * @see types.ts Obligations interface
 * @see schema.json $defs.obligations
 */
export const obligationsSchema = z
  .object({
    termsAndConditions: standardDefinitionSchema.optional(),
    billingPolicy: standardDefinitionSchema.optional(),
    sla: standardDefinitionSchema.optional(),
  })
  .passthrough();

/**
 * Port schema - base for all port types
 * @see types.ts Port interface
 * @see schema.json $defs.port
 */
export const portSchema = entitySchema.extend({
  promises: z.union([promisesSchema, referenceSchema]).optional(),
  expectations: z.union([expectationsSchema, referenceSchema]).optional(),
  obligations: z.union([obligationsSchema, referenceSchema]).optional(),
});

// ===============================================================
// Port Types (using lazy to handle circular references)
// ===============================================================

/**
 * Input Port schema
 * @see types.ts InputPort interface
 * @see schema.json $defs.inputPort
 */
export const inputPortSchema = z.lazy(() => portSchema.extend({}));

/**
 * Output Port schema
 * @see types.ts OutputPort interface
 * @see schema.json $defs.outputPort
 */
export const outputPortSchema = z.lazy(() => portSchema.extend({}));

/**
 * Discovery Port schema
 * @see types.ts DiscoveryPort interface
 * @see schema.json $defs.discoveryPort
 */
export const discoveryPortSchema = z.lazy(() => portSchema.extend({}));

/**
 * Observability Port schema
 * @see types.ts ObservabilityPort interface
 * @see schema.json $defs.observabilityPort
 */
export const observabilityPortSchema = z.lazy(() => portSchema.extend({}));

/**
 * Control Port schema
 * @see types.ts ControlPort interface
 * @see schema.json $defs.controlPort
 */
export const controlPortSchema = z.lazy(() => portSchema.extend({}));

// ===============================================================
// Component Schemas
// ===============================================================

/**
 * Application Component schema
 * @see types.ts ApplicationComponent interface
 * @see schema.json $defs.applicationComponent
 */
export const applicationComponentSchema = entitySchema.extend({
  platform: z.string().optional(),
  applicationType: z.string().optional(),
  consumesFrom: z.array(z.string()).optional(),
  providesTo: z.array(z.string()).optional(),
  dependsOn: z.array(z.string()).optional(),
});

/**
 * Infrastructure Component schema
 * @see types.ts InfrastructuralComponent interface
 * @see schema.json $defs.infrastructuralComponent
 */
export const infrastructuralComponentSchema = entitySchema.extend({
  platform: z.string().optional(),
  infrastructureType: z.string().optional(),
  dependsOn: z.array(z.string()).optional(),
});

/**
 * Lifecycle Task Info schema
 * @see types.ts LifecycleTaskInfo interface
 * @see schema.json $defs.lifecycleTaskInfo
 */
export const lifecycleTaskInfoSchema = z
  .object({
    name: z.string().optional(),
    order: z.number().optional(),
    service: externalResourceSchema.optional(),
    template: z.union([standardDefinitionSchema, referenceSchema]).optional(),
    configurations: objectOrReferenceSchema.optional(),
  })
  .passthrough();

// ===============================================================
// Container Schemas
// ===============================================================

/**
 * Interface Components schema
 * @see types.ts InterfaceComponents interface
 * @see schema.json $defs.interfaceComponents
 */
export const interfaceComponentsSchema = z.object({
  inputPorts: z.array(z.union([inputPortSchema, referenceSchema])).optional(),
  // Required field per schema
  outputPorts: z.array(z.union([outputPortSchema, referenceSchema])),
  discoveryPorts: z
    .array(z.union([discoveryPortSchema, referenceSchema]))
    .optional(),
  observabilityPorts: z
    .array(z.union([observabilityPortSchema, referenceSchema]))
    .optional(),
  controlPorts: z
    .array(z.union([controlPortSchema, referenceSchema]))
    .optional(),
}) as z.ZodType<InterfaceComponents>;

/**
 * Internal Components schema
 * @see types.ts InternalComponents interface
 * @see schema.json $defs.internalComponents
 */
export const internalComponentsSchema = z.object({
  lifecycleInfo: z.record(z.array(lifecycleTaskInfoSchema)).optional(),
  applicationComponents: z
    .array(z.union([applicationComponentSchema, referenceSchema]))
    .optional(),
  infrastructuralComponents: z
    .array(z.union([infrastructuralComponentSchema, referenceSchema]))
    .optional(),
});

/**
 * Components schema - for reusable components
 * @see types.ts Components interface
 * @see schema.json $defs.components
 */
export const componentsSchema = z
  .object({
    inputPorts: z
      .record(z.union([inputPortSchema, referenceSchema]))
      .optional(),
    outputPorts: z
      .record(z.union([outputPortSchema, referenceSchema]))
      .optional(),
    discoveryPorts: z
      .record(z.union([discoveryPortSchema, referenceSchema]))
      .optional(),
    observabilityPorts: z
      .record(z.union([observabilityPortSchema, referenceSchema]))
      .optional(),
    controlPorts: z
      .record(z.union([controlPortSchema, referenceSchema]))
      .optional(),
    applicationComponents: z
      .record(z.union([applicationComponentSchema, referenceSchema]))
      .optional(),
    infrastructuralComponents: z
      .record(z.union([infrastructuralComponentSchema, referenceSchema]))
      .optional(),
  })
  .passthrough() as z.ZodType<Components>;

/**
 * Info schema - metadata about the data product
 * @see types.ts Info interface
 * @see schema.json $defs.info
 */
export const infoSchema = z
  .object({
    // readOnly in the schema
    id: z
      .string()
      .optional()
      .refine(isValidUuid, { message: 'id must be a valid UUID format' }),
    // Required fields per schema
    fullyQualifiedName: z.string().refine(isValidFqn, {
      message:
        'fullyQualifiedName must be a URN of the form urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version} or urn:dpds:{mesh-namespace}:dataproducts:{product-name}:{product-major-version}:(input|output)ports:{port-name}',
    }),
    // readOnly in the schema
    entityType: z.string().optional().refine(isValidAlphanumeric, {
      message: 'entityType must contain only alphanumeric characters',
    }),
    name: z.string().refine(isValidCamelCase, {
      message: 'name must be in a valid format (camelCase)',
    }),
    version: z.string().refine(isValidVersion, {
      message: 'version must follow semantic versioning format',
    }),
    displayName: z.string().optional(),
    description: z.string().optional(),
    // Required field per schema
    domain: z.string(),
    // Required field per schema
    owner: ownerSchema,
    contactPoints: z.array(contactPointSchema).optional(),
  })
  .passthrough();

// ===============================================================
// Main Data Product Descriptor Schema
// ===============================================================

/**
 * Data Product Descriptor schema - the root schema
 * @see types.ts DataProductDescriptor interface
 * @see schema.json root object
 */
export const dataProductDescriptorSchema = z.object({
  // Required field per schema
  dataProductDescriptor: z.string().refine(isValidVersion, {
    message: 'dataProductDescriptor must follow semantic versioning format',
  }),
  // Required field per schema
  info: infoSchema,
  // Required field per schema
  interfaceComponents: interfaceComponentsSchema,
  internalComponents: internalComponentsSchema.optional(),
  components: componentsSchema.optional(),
  tags: z.array(z.string()).optional(),
  externalDocs: externalResourceSchema.optional(),
}) as z.ZodType<DataProductDescriptor>;

// ===============================================================
// Type Inference Helpers
// ===============================================================

/**
 * Utility type for inferring Zod schema types
 * This allows using the zod schemas to validate at runtime
 * while getting TypeScript types that match the interfaces
 *
 * @example
 * // Get the type from a schema
 * type MyInfo = z.infer<typeof infoSchema>;
 *
 * // Validate data at runtime
 * const result = infoSchema.safeParse(myData);
 * if (result.success) {
 *   // result.data is typed as Info
 *   console.log(result.data);
 * }
 */
export type InferSchema<T extends z.ZodTypeAny> = z.infer<T>;

// Type aliases for convenience
export type ZodDataProductDescriptor = InferSchema<
  typeof dataProductDescriptorSchema
>;
export type ZodInfo = InferSchema<typeof infoSchema>;
export type ZodReference = InferSchema<typeof referenceSchema>;
export type ZodInputPort = InferSchema<typeof inputPortSchema>;
export type ZodOutputPort = InferSchema<typeof outputPortSchema>;
export type ZodInterfaceComponents = InferSchema<
  typeof interfaceComponentsSchema
>;
export type ZodComponents = InferSchema<typeof componentsSchema>;
