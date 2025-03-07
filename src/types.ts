/**
 * TypeScript definitions for Data Product Descriptor Specification (DPDS)
 * Based on DPDS v1.0.0
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/
 */

/**
 * Base Entity interface that many components extend
 */
export interface Entity {
  /** Unique identifier */
  id?: string;
  /** Fully qualified name */
  fullyQualifiedName?: string;
  /** Entity type */
  entityType?: string;
  /** Name of the entity (required) */
  name: string;
  /** Version of the entity (required) */
  version: string;
  /** Display name */
  displayName?: string;
  /** Description */
  description?: string;
  /** Component group */
  componentGroup?: string;
  /** Tags */
  tags?: string[];
  /** External documentation */
  externalDocs?: ExternalResource;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * External Resource Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#externalResourceObject
 */
export interface ExternalResource {
  /** Description of the external resource */
  description?: string;
  /** Media type */
  mediaType?: string;
  /** URL reference (required) */
  $href: string;
}

/**
 * Reference Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#referenceObject
 */
export interface Reference {
  /** URI reference (required) */
  $ref: string;
  /** Media type */
  mediaType?: string;
  /** Description */
  description?: string;
}

/**
 * Owner Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#ownerObject
 */
export interface Owner {
  /** Owner ID (required) */
  id: string;
  /** Owner name */
  name?: string;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Contact Point Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#contactPointObject
 */
export interface ContactPoint {
  /** Name of the contact point */
  name?: string;
  /** Description */
  description?: string;
  /** Communication channel */
  channel?: string;
  /** Address */
  address?: string;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Info Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#infoObject
 */
export interface Info {
  /** Unique identifier */
  id?: string;
  /** Fully qualified name (required) */
  fullyQualifiedName: string;
  /** Entity type */
  entityType?: string;
  /** Name of the data product (required) */
  name: string;
  /** Version of the data product (required) */
  version: string;
  /** Display name */
  displayName?: string;
  /** Description */
  description?: string;
  /** Domain (required) */
  domain: string;
  /** Owner information (required) */
  owner: Owner;
  /** Contact points */
  contactPoints?: ContactPoint[];
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Standard Definition Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#standardDefinitionObject
 */
export interface StandardDefinition extends Entity {
  /** Specification used */
  specification: string;
  /** Specification version */
  specificationVersion?: string;
  /** Definition content - can be an object, string or reference */
  definition: any;
}

/**
 * Promises Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#promisesObject
 */
export interface Promises {
  /** Platform */
  platform?: string;
  /** Services type */
  servicesType?: string;
  /** API definition */
  api?: StandardDefinition;
  /** Deprecation policy */
  deprecationPolicy?: StandardDefinition;
  /** Service level objectives */
  slo?: StandardDefinition;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Expectations Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#expectationsObject
 */
export interface Expectations {
  /** Audience expectations */
  audience?: StandardDefinition;
  /** Usage expectations */
  usage?: StandardDefinition;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Obligations Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#obligationsObject
 */
export interface Obligations {
  /** Terms and conditions */
  termsAndConditions?: StandardDefinition;
  /** Billing policy */
  billingPolicy?: StandardDefinition;
  /** Service level agreement */
  sla?: StandardDefinition;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Base Port interface that specific port types extend
 */
export interface Port extends Entity {
  /** Port promises */
  promises?: Promises | Reference;
  /** Port expectations */
  expectations?: Expectations | Reference;
  /** Port obligations */
  obligations?: Obligations | Reference;
}

/**
 * Input Port Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#inputPortComponent
 */
export interface InputPort extends Port {}

/**
 * Output Port Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#outputPortComponent
 */
export interface OutputPort extends Port {}

/**
 * Discovery Port Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#discoveryPortComponent
 */
export interface DiscoveryPort extends Port {}

/**
 * Observability Port Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#observabilityPortComponent
 */
export interface ObservabilityPort extends Port {}

/**
 * Control Port Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#controlPortComponent
 */
export interface ControlPort extends Port {}

/**
 * Interface Components Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#interfaceComponentsObject
 */
export interface InterfaceComponents {
  /** Input ports */
  inputPorts?: (InputPort | Reference)[];
  /** Output ports (required) */
  outputPorts: (OutputPort | Reference)[];
  /** Discovery ports */
  discoveryPorts?: (DiscoveryPort | Reference)[];
  /** Observability ports */
  observabilityPorts?: (ObservabilityPort | Reference)[];
  /** Control ports */
  controlPorts?: (ControlPort | Reference)[];
}

/**
 * Application Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#applicationComponent
 */
export interface ApplicationComponent extends Entity {
  /** Platform */
  platform?: string;
  /** Application type */
  applicationType?: string;
  /** Components this application consumes from */
  consumesFrom?: string[];
  /** Components this application provides to */
  providesTo?: string[];
  /** Components this application depends on */
  dependsOn?: string[];
}

/**
 * Infrastructural Component
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#infrastructuralComponent
 */
export interface InfrastructuralComponent extends Entity {
  /** Platform */
  platform?: string;
  /** Infrastructure type */
  infrastructureType?: string;
  /** Components this infrastructure depends on */
  dependsOn?: string[];
}

/**
 * Lifecycle Task Info Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#lifecycleTaskInfoObject
 */
export interface LifecycleTaskInfo {
  /** Name of the task */
  name?: string;
  /** Order of execution */
  order?: number;
  /** Service to execute the task */
  service?: ExternalResource;
  /** Template for the task */
  template?: StandardDefinition | Reference;
  /** Configurations for the task */
  configurations?: object | Reference;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Internal Components Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#internalComponentsObject
 */
export interface InternalComponents {
  /** Lifecycle information */
  lifecycleInfo?: {
    [key: string]: LifecycleTaskInfo[];
  };
  /** Application components */
  applicationComponents?: (ApplicationComponent | Reference)[];
  /** Infrastructural components */
  infrastructuralComponents?: (InfrastructuralComponent | Reference)[];
}

/**
 * Components Object
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#componentsObject
 */
export interface Components {
  /** Reusable input ports */
  inputPorts?: {
    [key: string]: InputPort | Reference;
  };
  /** Reusable output ports */
  outputPorts?: {
    [key: string]: OutputPort | Reference;
  };
  /** Reusable discovery ports */
  discoveryPorts?: {
    [key: string]: DiscoveryPort | Reference;
  };
  /** Reusable observability ports */
  observabilityPorts?: {
    [key: string]: ObservabilityPort | Reference;
  };
  /** Reusable control ports */
  controlPorts?: {
    [key: string]: ControlPort | Reference;
  };
  /** Reusable application components */
  applicationComponents?: {
    [key: string]: ApplicationComponent | Reference;
  };
  /** Reusable infrastructural components */
  infrastructuralComponents?: {
    [key: string]: InfrastructuralComponent | Reference;
  };
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Data Product Descriptor
 * @see https://dpds.opendatamesh.org/specifications/dpds/1.0.0/#dpdsObject
 */
export interface DataProductDescriptor {
  /** Data product descriptor version (required) */
  dataProductDescriptor: string;
  /** Information about the data product (required) */
  info: Info;
  /** Interface components (required) */
  interfaceComponents: InterfaceComponents;
  /** Internal components */
  internalComponents?: InternalComponents;
  /** Reusable components */
  components?: Components;
  /** Tags */
  tags?: string[];
  /** External documentation */
  externalDocs?: ExternalResource;
}
