export type Root = {
  $id: string;
  $schema: string;
  $comment: string;
  title: string;
  description: string;
  type: string;
  properties: {
    dataProductDescriptor: {
      description: string;
      type: string;
      format: string;
    };
    info: {
      $ref: string;
    };
    interfaceComponents: {
      $ref: string;
    };
    internalComponents: {
      $ref: string;
    };
    components: {
      $ref: string;
    };
    tags: {
      description: string;
      type: string;
      items: {
        type: string;
      };
    };
    externalDocs: {
      $ref: string;
    };
  };
  required: Array<string>;
  $defs: {
    info: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        id: {
          description: string;
          type: string;
          readOnly: boolean;
          format: string;
        };
        fullyQualifiedName: {
          description: string;
          type: string;
          format: string;
        };
        entityType: {
          description: string;
          type: string;
          readOnly: boolean;
          format: string;
        };
        name: {
          description: string;
          type: string;
          format: string;
        };
        version: {
          description: string;
          type: string;
          format: string;
        };
        displayName: {
          description: string;
          type: string;
        };
        description: {
          description: string;
          type: string;
        };
        domain: {
          description: string;
          type: string;
          format: string;
        };
        owner: {
          $ref: string;
        };
        contactPoints: {
          type: string;
          items: {
            $ref: string;
          };
        };
      };
      required: Array<string>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    owner: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        id: {
          description: string;
          type: string;
        };
        name: {
          description: string;
          type: string;
        };
      };
      required: Array<string>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    contactPoint: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        name: {
          description: string;
          type: string;
          format: string;
        };
        description: {
          description: string;
          type: string;
        };
        channel: {
          description: string;
          type: string;
        };
        address: {
          description: string;
          type: string;
        };
      };
      patternProperties: {
        "^x-": boolean;
      };
    };
    interfaceComponents: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        inputPorts: {
          type: string;
          items: {
            $ref: string;
          };
        };
        outputPorts: {
          type: string;
          items: {
            $ref: string;
          };
        };
        discoveryPorts: {
          type: string;
          items: {
            $ref: string;
          };
        };
        observabilityPorts: {
          type: string;
          items: {
            $ref: string;
          };
        };
        controlPorts: {
          type: string;
          items: {
            $ref: string;
          };
        };
      };
      required: Array<string>;
    };
    inputPortOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    inputPort: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref: string;
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    outputPortOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    outputPort: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref: string;
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    discoveryPortOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    discoveryPort: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref: string;
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    observabilityPortOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    observabilityPort: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref: string;
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    controlPortOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    controlPort: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref: string;
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    port: {
      properties: {
        promises: {
          $ref: string;
        };
        expectations: {
          $ref: string;
        };
        obligations: {
          $ref: string;
        };
      };
    };
    promisesOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    promises: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        platform: {
          description: string;
          type: string;
        };
        servicesType: {
          description: string;
          type: string;
        };
        api: {
          $ref: string;
        };
        deprecationPolicy: {
          $ref: string;
        };
        slo: {
          $ref: string;
        };
      };
      patternProperties: {
        "^x-": boolean;
      };
    };
    definition: {
      properties: {
        specification: {
          type: string;
        };
        specificationVersion: {
          description: string;
          type: string;
        };
        definition: {
          $ref: string;
        };
      };
      required: Array<string>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    standardDefinition: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref: string;
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    expectationsOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    expectations: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        audience: {
          $ref: string;
        };
        usage: {
          $ref: string;
        };
      };
      patternProperties: {
        "^x-": boolean;
      };
    };
    obligationsOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    obligations: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        termsAndConditions: {
          $ref: string;
        };
        billingPolicy: {
          $ref: string;
        };
        sla: {
          $ref: string;
        };
      };
      patternProperties: {
        "^x-": boolean;
      };
    };
    internalComponents: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        lifecycleInfo: {
          type: string;
          additionalProperties: {
            type: string;
            items: {
              $ref: string;
            };
          };
        };
        applicationComponents: {
          description: string;
          type: string;
          items: {
            $ref: string;
          };
        };
        infrastructuralComponents: {
          description: string;
          type: string;
          items: {
            $ref: string;
          };
        };
      };
    };
    lifecycleTaskInfo: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        name: {
          type: string;
        };
        order: {
          type: string;
        };
        service: {
          $ref: string;
        };
        template: {
          $ref: string;
        };
        configurations: {
          $ref: string;
        };
      };
      required: Array<any>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    standardDefinitionOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    applicationComponentOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    applicationComponent: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref?: string;
        title?: string;
        properties?: {
          platform: {
            description: string;
            type: string;
          };
          applicationType: {
            description: string;
            type: string;
          };
          consumesFrom: {
            description: string;
            type: string;
            items: {
              type: string;
            };
          };
          providesTo: {
            description: string;
            type: string;
            items: {
              type: string;
            };
          };
          dependsOn: {
            description: string;
            type: string;
            items: {
              type: string;
            };
          };
        };
      }>;
      patternProperties: {
        "^x-": boolean;
      };
    };
    infrastructuralComponentOrReference: {
      oneOf: Array<{
        $ref: string;
      }>;
    };
    infrastructuralComponent: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      allOf: Array<{
        $ref?: string;
        title?: string;
        properties?: {
          platform: {
            description: string;
            type: string;
          };
          infrastructureType: {
            description: string;
            type: string;
          };
          dependsOn: {
            description: string;
            type: string;
            items: {
              type: string;
            };
          };
        };
      }>;
    };
    components: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        inputPorts: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
        outputPorts: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
        discoveryPorts: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
        observabilityPorts: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
        controlPorts: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
        applicationComponents: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
        infrastructuralComponents: {
          description: string;
          type: string;
          additionalProperties: {
            $ref: string;
          };
        };
      };
      patternProperties: {
        "^x-": boolean;
      };
    };
    reference: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        $ref: {
          description: string;
          type: string;
          format: string;
        };
        mediaType: {
          description: string;
          type: string;
        };
        description: {
          description: string;
          type: string;
        };
      };
      required: Array<string>;
    };
    externalResource: {
      $comment: string;
      title: string;
      description: string;
      type: string;
      properties: {
        description: {
          description: string;
          type: string;
        };
        mediaType: {
          description: string;
          type: string;
        };
        $href: {
          description: string;
          type: string;
          format: string;
        };
      };
      required: Array<string>;
    };
    objectOrReference: {
      oneOf: Array<{
        title?: string;
        description?: string;
        type?: string;
        $ref?: string;
      }>;
    };
    objectOrStringOrReference: {
      oneOf: Array<{
        title: string;
        description: string;
        type: string;
      }>;
    };
    entity: {
      properties: {
        id: {
          description: string;
          type: string;
          format: string;
          readOnly: boolean;
        };
        fullyQualifiedName: {
          description: string;
          type: string;
          format: string;
        };
        entityType: {
          description: string;
          type: string;
          format: string;
        };
        name: {
          description: string;
          type: string;
          format: string;
        };
        version: {
          description: string;
          type: string;
          format: string;
        };
        displayName: {
          description: string;
          type: string;
        };
        description: {
          description: string;
          type: string;
        };
        componentGroup: {
          description: string;
          type: string;
          format: string;
        };
        tags: {
          description: string;
          type: string;
          items: {
            type: string;
          };
        };
        externalDocs: {
          $ref: string;
        };
      };
      required: Array<string>;
    };
  };
};
